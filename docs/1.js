// function wait() {
//     return new Promise(resolve =>
//         setTimeout(resolve, 10 * 1000)
//     )
// }
//
// async function main() {
//     console.time();
//     const x = wait();
//     const y = wait();
//     const z = wait();
//     await x;
//     await y;
//     await z;
//     console.timeEnd();
// }
// main();

// function wait () {
//     return new Promise(resolve => setTimeout(resolve, 10 * 1000))
// }
//
// async function main () {
//     console.time()
//     const x = await wait()
//     const y = await wait()
//     const z = await wait()
// // await x
// // await y
// // await z
//     console.timeEnd()
// }
//
// main()

// var i;
// console.time("for 循环测试");
// for (i = 0; i < 100000; i++) {
//     // 代码部分
// }
// console.timeEnd("for 循环测试");
//
// i = 0;
// console.time("while 循环测试");
// while (i < 1000000) {
//     i++
// }
// console.timeEnd("while 循环测试")

// function Foo(name) {
//     this.name = name;
//     console.log(this.name,'es5');
// }
//
// class Bar {
//     constructor(name){
//         this.name = name;
//         console.log(this.name,'es6');
//     }
// }
// f = new Foo('xhs');
// b = new Bar('xhs');
class PersonClass {

    // equivalent of the PersonType constructor
    constructor(name) {
        this.name = name;
    }

    // equivalent of PersonType.prototype.sayName
    sayName() {
        console.log(this.name);
    }
}
let b=new PersonClass('names');
// b.sayName();
// let PersonType2 = (function() {
//
//     "use strict";
//
//     const PersonType2 = function(name) {
//         console.log(new.target,'333',name)
//         // make sure the function was called with new
//         if (typeof new.target === "undefined") {
//             throw new Error("Constructor must be called with new.");
//         }
//
//         this.name = name;
//     }
//
//     Object.defineProperty(PersonType2.prototype, "sayName", {
//         value: function() {
//
//             // make sure the method wasn't called with new
//             if (typeof new.target !== "undefined") {
//                 throw new Error("Method cannot be called with new.");
//             }
//
//             console.log(this.name);
//         },
//         enumerable: false,
//         writable: true,
//         configurable: true
//     });
//
//     return PersonType2;
// }());
// console.log(PersonType2('a'));


// let Arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10];
// console.dir(Arr.flat());

// let obj={0:'0',1:'1'};
// console.log(Array.from(obj));

function rangeDay (day1, day2) {
    const result = []
    const dayTimes = 24*60*60*1000
    const startTime = day1.getTime()
    const range = day2.getTime() - startTime
    let total = 0

    while (total <= range && range > 0) {
        result.push(new Date(startTime + total).toLocaleDateString().replace(/\//g, '-'))
        total += dayTimes
    }
    return result
};
console.log(rangeDay(new Date("2015-02-08"), new Date("2015-03-03")));
console.log(new Date("2015-03-03").getTime()-new Date("2015-02-08").getTime())