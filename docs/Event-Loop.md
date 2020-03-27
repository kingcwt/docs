# EventLoop

![logo](https://docsify.js.org/_media/icon.svg ':size=50x100')
![logo](https://docsify.js.org/_media/icon.svg ':size=100')

```js
async function async1() {
    console.log('async1 start');
    await async2();
    console.log('async1 end');
}
async function async2() {
	console.log('async2');
}

console.log('script start');

setTimeout(function() {
    console.log('setTimeout');
}, 0)

async1();

new Promise(function(resolve) {
    console.log('promise1');
    resolve();
}).then(function() {
    console.log('promise2');
});
console.log('script end');



/*
/node -v >10
* script start
  async1 start
  async2
  promise1
  script end
  promise2
  async1 end
  setTimeout
* */
/*
* chrome 
*  script start
   async1 start
   async2
   promise1
   script end
   async1 end
   promise2
   setTimeout
* */
```
- 单线程
  - JavaScript 是一门单线程语言，虽然在最新的 HTML5 提出的 Web-Worker，但由于 JavaScript 是单线程的，这一核心未改变，所以一切 JavaScript 版的 "多线程" 都是单线程模拟出来的。
- 任务队列 
  - JS分为同步任务和异步任务
  - 同步任务:同步任务都在主线程上执行，形成一个执行栈
  - 异步任务:不进入主线程，而进入任务队列（task queue）,等同步任务执行完毕,系统就会读取任务队列中的异步任务
  异步任务分为 macro-task 和 micro-task 两类，不同的 API 注册的异步任务会依次进入自身对应的队列中，然后等待 Event Loop 将它们依次放入执行栈中执行
- 事件循环（Event Loop）
  - 根据规范，事件循环是通过任务队列的机制来进行协调的。一个 Event Loop 中，可以有一个或者多个任务队列(task queue)，一个任务队列便是一系列有序任务(task)的集合；每个任务都有一个任务源(task source)，源自同一个任务源的 task 必须放到同一个任务队列，从不同源来的则被添加到不同队列。
<img style='padding-top:38px;' src="https://camo.githubusercontent.com/6f617a237607ce7a71fabcab61d2952a8b412205/68747470733a2f2f692e6c6f6c692e6e65742f323031392f30322f31382f356336616435383334376135652e706e67" alt=""> 

`解析`
> 代码从上往下执行,   
> 主线程中=> 遇到两个async函数 然后遇到console.log('script start')立即执行输出      
> 往下遇到setTimeout因为是异步任务,放入任务队列中,又因为setTimeout本身就是任务源 所以放入macrotask(宏任务)中        
> 往下遇到async1()立即执行,输出console.log('async1 start')      
> 往下遇到await async2()执行,然后输出 console.log('async2')并把console.log('async1 end')放入microtack(微任务)中,跳出async1()       
> 代码向下,遇到Promise 立即输出console.log('promise1'),然后把成功后的.then中的console.log('promise2')放入microtask(微任务)中    
> 代码向下遇到console.log('script end')立即输出,到此,主线程完成一个循环  
> 接下来 会先把microtask(微任务)放入执行体中执行,依次输出console.log('promise2'),console.log('async1 end'),这时microtask完成
> 接下来去macrotask(宏任务)中 然后把setTimeout输出   
* // node>10 和node8 对于microtask的执行顺序不一样   chrome上也是不一样的


- *练习*

```js

setTimeout(function(){
    console.log('定时器开始啦') 
});

new Promise(function(resolve){
    console.log('马上执行for循环啦'); 
    for(var i = 0; i < 10000; i++){
        i == 99 && resolve();
    }
}).then(function(){
    console.log('执行then函数啦')  
});

console.log('代码执行结束');  
//输出结果 -
``` 