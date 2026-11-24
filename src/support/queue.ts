interface QueueItem<T> {
    item: T;
    retries: number;
}

type QueueWorker<T> = (item: QueueItem<T>['item'], ...args: any[]) => Promise<any>;

interface QueueResults<T> {
    success: [QueueItem<T>, any][];
    error: [QueueItem<T>, any][];
}

type QueueEventListener<T> = (item: QueueItem<T>['item'], ...args: any[]) => void;
type QueueDoneEventListener<T> = (results: QueueResults<T>) => void;

interface QueueListeners<T> {
    processing: QueueEventListener<T>[];
    success: QueueEventListener<T>[];
    error: QueueEventListener<T>[];
    done: QueueDoneEventListener<T>[];
}

class Queue<T = any> {
    /**
     * Custom Event Listeners.
     */
    public listeners: QueueListeners<T> = {
        processing: [],
        success: [],
        error: [],
        done: [],
    };

    /**
     * The item queue to process.
     */
    public queue: QueueItem<T>[] = [];

    /**
     * The callback worker function to handle each item.
     */
    public worker: QueueWorker<T>;

    /**
     * Additional worker bindings.
     */
    public bindings: any[] | ((...args: any[]) => any) | undefined;

    /**
     * The number or concurrent processes.
     */
    public concurrency: number;

    /**
     * The max number of retries / item.
     */
    public maxRetries: number;

    /**
     * The number of active processes
     */
    public processes: number;

    /**
     * Collect the process results.
     */
    public results: QueueResults<T>;

    /**
     * Queue resolver.
     */
    private resolver?: (results: QueueResults<T>) => void;

    /**
     * Create a processing queue with bounded concurrency and retries.
     * @param items Items to process.
     * @param worker Asynchronous worker handling each item.
     * @param concurrency Maximum number of simultaneous workers.
     * @param maxRetries Maximum retries after an item fails.
     * @returns A new queue instance.
     */
    constructor(
        items: QueueItem<T>['item'][],
        worker: QueueWorker<T>,
        concurrency: number = 2,
        maxRetries: number = 2,
    ) {
        if (!Number.isInteger(concurrency) || concurrency < 1) {
            throw new RangeError('concurrency must be a positive integer.');
        }

        if (!Number.isInteger(maxRetries) || maxRetries < 0) {
            throw new RangeError('maxRetries must be a non-negative integer.');
        }

        this.queue = items.map((item) => ({ item, retries: 0 }));
        this.worker = worker;
        this.concurrency = concurrency;
        this.maxRetries = maxRetries;
        this.processes = 0;
        this.results = {
            success: [],
            error: [],
        };
    }

    /**
     * Subscribe to a queue lifecycle event.
     * @param event Queue event to observe.
     * @param callback Listener to invoke when the event is dispatched.
     * @returns Nothing.
     */
    on(
        event: keyof QueueListeners<T>,
        callback: QueueEventListener<T> | QueueDoneEventListener<T>,
    ) {
        this.listeners[event].push(callback as any);
    }

    /**
     * Notify listeners of a queue lifecycle event.
     * @param event Event to dispatch.
     * @param args Arguments forwarded to the event listeners.
     * @returns Nothing.
     */
    dispatch(event: keyof QueueListeners<T>, ...args: any[]) {
        for (const listener of this.listeners[event]) {
            if (event === 'done') {
                listener(args[0]);
            } else {
                listener(args[0], ...args.slice(1));
            }
        }
    }

    /**
     * Configure additional worker arguments or an argument factory.
     * @param callee Factory that supplies worker arguments.
     * @returns Nothing.
     */
    bindTo(callee: (...args: any[]) => any): void;

    /**
     * Configure additional worker arguments or an argument factory.
     * @param args Arguments to bind, or a single argument factory.
     * @returns Nothing.
     */
    bindTo(...args: any[]): void {
        if (arguments.length === 1 && typeof args[0] === 'function') {
            this.bindings = args[0];
        } else {
            this.bindings = [...args];
        }
    }

    /**
     * Build the worker argument list for an item.
     * @param item Queue item being prepared.
     * @returns The arguments passed to the worker.
     */
    prepare(item: QueueItem<T>['item']): [QueueItem<T>['item'], ...any[]] {
        if (typeof this.bindings === 'function') {
            return this.bindings(item, this);
        } else if (this.bindings && Array.isArray(this.bindings)) {
            return [item, ...this.bindings];
        } else {
            return [item];
        }
    }

    /**
     * Dispatch the next task when capacity is available or finish an empty queue.
     * @returns Nothing.
     */
    processNext() {
        if (this.queue.length === 0 && this.processes === 0) {
            this.resolver?.(this.results);

            return;
        }

        if (this.queue.length === 0 || this.processes >= this.concurrency) {
            return;
        }

        // Receive Task
        const task = this.queue.shift();

        if (!task) {
            return;
        }

        this.processes++;

        // Execute Worker
        try {
            const args = this.prepare(task.item);
            this.dispatch('processing', ...args);

            this.worker(...args)
                .then((res: any) => this.onSuccess(task, res))
                .catch((err: any) => this.onError(task, err));
        } catch (error) {
            this.onError(task, error);
        }
    }

    /**
     * Collect a successful task result and continue processing.
     * @param task Completed queue task.
     * @param response Value returned by the worker.
     * @returns A promise that resolves after recording the result.
     */
    async onSuccess(task: QueueItem<T>, response: any) {
        this.processes--;
        this.dispatch('success', task['item'], response);

        this.results.success.push([task, response]);
        this.processNext();
    }

    /**
     * Retry a failed task or collect its exhausted failure, then continue.
     * @param task Failed queue task.
     * @param error Failure reported by the worker.
     * @returns A promise that resolves after handling the failure.
     */
    async onError(task: QueueItem<T>, error: any) {
        this.processes--;
        this.dispatch('error', task['item'], error);

        // Handle Error
        if (task.retries < this.maxRetries) {
            task.retries++;
            this.queue.push(task);
        } else {
            this.results.error.push([task, error]);
        }

        // Continue after collecting exhausted failures only.
        this.processNext();
    }

    /**
     * Start processing the queue and collect its final results.
     * @returns A promise containing successful and exhausted failed tasks.
     */
    start(): Promise<QueueResults<T>> {
        return new Promise((resolve) => {
            this.results = { success: [], error: [] };
            this.resolver = () => {
                this.dispatch('done', this.results);
                resolve(this.results);
            };

            for (let i = 0; i < this.concurrency; i++) {
                this.processNext();
            }
        });
    }
}

// Export module
export { Queue };
export type {
    QueueItem,
    QueueWorker,
    QueueResults,
    QueueEventListener,
    QueueDoneEventListener,
    QueueListeners,
};
