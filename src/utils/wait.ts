
/**
 * Wait Handler
 * @param {number} time The number of ms to wait.
 * @returns {Promise}
 */
function wait(time: number): Promise<null> {
    return new Promise(resolve => {
        setTimeout(resolve.bind(null ,null), time);
    });
}

// Export Module
export default wait;
export { wait };
