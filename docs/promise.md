# 简易版 Promise


- promise 特点及概念
- 规范：https://promisesaplus.com/
- primise 为什么产生 解决异步问题

- 1 多个异步请求并发 （希望同步获取最终结果）
- 2 链式异步请求的问题 上一个的输出是下一个的输入 promise 链式调用可以解决   

```js
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
```
