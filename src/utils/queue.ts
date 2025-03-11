export interface QueueItem<T> {
    item: T;
    retries: number;
}

export type QueueWorker<T> = (item: QueueItem<T>['item'], ...args: any[]) => Promise<any>;

export interface QueueResults<T> {
    success: [QueueItem<T>, any][];
    error: [QueueItem<T>, any][];
}

export type QueueEventListener<T> = (item: QueueItem<T>['item'], ...args: any[]) => void;
export type QueueDoneEventListener<T> = (results: QueueResults<T>) => void;

export interface QueueListeners<T> {
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
    public bindings: any[] | Function | undefined;

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
     * Create a new PRocessing Queue
     * @param items
     * @param worker
     * @param concurrency
     * @param maxRetries
     */
    constructor(
        items: QueueItem<T>['item'][],
        worker: QueueWorker<T>,
        concurrency: number = 2,
        maxRetries: number = 2
    ) {
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
     * Attach an event listener
     * @param event
     * @param callback
     */
    on(
        event: keyof QueueListeners<T>,
        callback: QueueEventListener<T> | QueueDoneEventListener<T>
    ) {
        this.listeners[event].push(callback as any);
    }

    /**
     * Dispatch an event
     * @param event
     * @param item
     * @param args
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
     * Bind additional parameters, or a callback function, to the worker
     */
    bindTo(callee: Function): void;
    bindTo(...args: any[]): void;
    bindTo() {
        if (arguments.length === 1 && typeof arguments[0] === 'function') {
            this.bindings = arguments[0];
        } else {
            this.bindings = [...arguments];
        }
    }

    /**
     * Prepare worker arguments
     * @param item
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
     * Process next item
     * @returns
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
     * Queue-Task ended successfully
     * @param task
     * @param response
     */
    async onSuccess(task: QueueItem<T>, response: any) {
        this.processes--;
        this.dispatch('success', task['item'], response);

        this.results.success.push([task, response]);
        this.processNext();
    }

    /**
     * Queue-Task ended not successfully
     * @param task
     * @param response
     */
    async onError(task: QueueItem<T>, error: any) {
        this.processes--;
        this.dispatch('success', task['item'], error);

        // Handle Error
        if (task.retries < this.maxRetries) {
            task.retries++;
            this.queue.push(task);
            console.warn(`Retry ${task.retries}/${this.maxRetries} for`, task.item, error);
        } else {
            this.results.error.push([task, error]);
            console.error(`Failed after ${this.maxRetries} retries:`, task.item, error);
        }

        // Process next item
        this.results.error.push([task, error]);
        this.processNext();
    }

    /**
     * Start Queue
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

// Export Module
export default Queue;
export { Queue };
