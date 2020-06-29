const PENDING = 'PENDING';
const RESOLVE = 'RESOLVE';
const REJECT = 'REJECT';

class Promise {
    constructor(executor) {
        this.status = PENDING;
        this.value = undefined;
        this.reason = undefined;
        this.onResolveCallBacks = [];
        this.onRejectCallBacks = [];
        let resolve = (value) => {
            if (this.status === PENDING) {
                this.status = RESOLVE;
                this.value = value;
                this.onResolveCallBacks.forEach(fn => fn())
            }
        }

        let reject = (reason) => {
            this.status = REJECT;
            this.reason = reason;
            this.onRejectCallBacks.forEach(fn => fn())
        }
        try {
            executor(resolve, reject);
        } catch (e) {
            reject(e)
        }

    }
    then(onFulfilled, onReject) {
        if (this.status === PENDING) {
            // 如果是异步执行 需要先存一下 然后在执行
            this.onResolveCallBacks.push(() => {
                onFulfilled(this.value);
            })

            this.onRejectCallBacks.push(() => {
                onReject(this.reason);
            })
        }

        if (this.status === RESOLVE) {
            onFulfilled(this.value);
        }

        if (this.status === REJECT) {
            onReject(this.reason);
        }
    }
}

module.exports = Promise;