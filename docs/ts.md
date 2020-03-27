## TypeScript

`本文章只是为了加深本人对TS的理解/如果想学TS请跳转到官方文档=>`
<a href="https://ts.xcatliu.com">官方文档</a>
> TypeScript 是 JavaScript 的类型的超集，它可以编译成纯 JavaScript。编译出来的 JavaScript 可以运行在任何浏览器上。TypeScript 编译工具可以运行在任何服务器和任何系统上。TypeScript 是开源的。

###  为什么选择TS
#### 1）TypeScript 增加了代码的可读性和可维护性
- 类型系统实际上是最好的文档，大部分的函数看看类型的定义就可以知道如何使用了
- 可以在编译阶段就发现大部分错误，这总比在运行时候出错好
- 增强了编辑器和 IDE 的功能，包括代码补全、接口提示、跳转到定义、重构等
##### 2）TypeScript 非常包容
- TypeScript 是 JavaScript 的超集，.js 文件可以直接重命名为 .ts 即可
- 即使不显式的定义类型，也能够自动做出类型推论
- 可以定义从简单到复杂的几乎一切类型
- 即使 TypeScript 编译报错，也可以生成 JavaScript 文件
- 兼容第三方库，即使第三方库不是用 TypeScript 写的，也可以编写单独的类型文件供 TypeScript 读取
#### 3）TypeScript 拥有活跃的社区
- 大部分第三方库都有提供给 TypeScript 的类型定义文件
- Google 开发的 Angular2 就是使用 TypeScript 编写的
- TypeScript 拥抱了 ES6 规范，也支持部分 ESNext 草案的规范
#### 4）TypeScript 的缺点
- 有一定的学习成本，需要理解接口（Interfaces）、泛型（Generics）、类（Classes）、枚举类型（Enums）等前端工程师可能不是很熟悉的概念
- 短期可能会增加一些开发成本，毕竟要多写一些类型的定义，不过对于一个需要长期维护的项目，TypeScript 能够减少其维护成本
- 集成到构建流程需要一些工作量
- 可能和一些库结合的不是很完美

 `原文官方文档地址：https://ts.xcatliu.com/introduction/what-is-typescript`
 
-------------------------
### 安装TS
> yarn add install typescript
### 原始数据类型
- JavaScript 的类型分为两种：原始数据类型（Primitive data types）和对象类型（Object types）。
- 原始数据类型包括：布尔值、数值、字符串、null、undefined 以及 ES6 中的新类型 Symbol。
#### 布尔值
```typescript
let isTrue:boolean=true;
console.log(isTrue) // true
```

- 使用构造函数 Boolean 创造的对象不是布尔值：

```typescript
let createByNewBoolean:boolean=new Boolean(1);
//事实上 new Boolean() 返回的是一个 Boolean 对象
console.log(createByNewBoolean) //编译报错=>[Boolean: true]
```
- 直接调用 Boolean 也可以返回一个 boolean 类型
```typescript
let createByNewBoolean:boolean= Boolean(1);
console.log(createByNewBoolean);//true
```
#### 数值

```typescript

let decLiteral:number=6;
console.log(decLiteral);// 6
let hexLiteral: number = 0xf00d;
console.log(hexLiteral);//61453
// ES6 中的二进制表示  
let binaryLiteral: number = 0b1010;
console.log(binaryLiteral);
//=>编译后：
// var binaryLiteral = 10;
// console.log(binaryLiteral);
//结果：10

// ES6 中的八进制表示法
let octalLiteral: number = 0o744;
console.log(octalLiteral)
//=>编译后：
//var octalLiteral = 484;
//console.log(octalLiteral);
//结果：484

let notANumber: number = NaN;
console.log(notANumber) //NaN

let infinityNumber: number = Infinity;
console.log(infinityNumber);//Infinity
```
- 其中 0b1010 和 0o744 是 ES6 中的二进制和八进制表示法，它们会被编译为十进制数字。

#### 字符串
```typescript

let myName: string = 'Tom';
let myAge: number = 25;

// 模板字符串
let sentence: string = `Hello, my name is ${myName}.
I'll be ${myAge + 1} years old next month.`;

//编译结果：
var myName = 'Tom';
var myAge = 25;
// 模板字符串
var sentence = "Hello, my name is " + myName + ".\nI'll be " + (myAge + 1) + " years old next month.";
```

#### 空值
- JavaScript 没有空值（Void）的概念，在 TypeScript 中，可以用 void 表示没有任何返回值的函数：

```typescript
function alertName():void {
    console.log('my name is ln')
}
alertName();//my name is ln
```
- 声明一个 void 类型的变量没有什么用，因为你只能将它赋值为 undefined 和 null

```typescript
let unusable:void=undefined;
console.log(unusable);//undefined
```

#### null和undefined
- 在 TypeScript 中，可以使用 null 和 undefined 来定义这两个原始数据类型

```typescript
let u: undefined = undefined;
let n: null = null;
```
- 与 void 的区别是，undefined 和 null 是所有类型的子类型。也就是说 undefined 类型的变量，可以赋值给 number 类型的变量：

```typescript
//这样不会报错
let num: number = undefined;
console.log(num)//undefined

let u: undefined;
let num: number = u;

```
- 而 void 类型的变量不能赋值给 number 类型的变量：

```typescript
let u: void;
let num: number = u;
console.log(num);
//会报错

```
----------------
### 任意值
- 任意值（Any）用来表示允许赋值为任意类型。
#### 什么是任意值类型
- 如果是一个普通类型，在赋值过程中改变类型是不被允许的：
```typescript
let myFavoriteNumber: string = 'seven';
myFavoriteNumber = 7;
//报错
```
- 但如果是 any 类型，则允许被赋值为任意类型
```typescript
let myFavoriteNumber: any = 'seven';
myFavoriteNumber = 7;
```
- 可以认为，声明一个变量为任意值之后，对它的任何操作，返回的内容的类型都是任意值。
#### 未声明类型的变量
- 变量如果在声明的时候，未指定其类型，那么它会被识别为任意值类型：

----------------------
### 类型推论
- 如果没有明确的指定类型，那么 TypeScript 会依照类型推论（Type Inference）的规则推断出一个类型
#### 什么是类型推论
- 以下代码虽然没有指定类型，但是会在编译的时候报错
```typescript
let myFavoriteNumber = 'seven';
myFavoriteNumber = 7;
```
- 事实上，它等价于
```typescript
let myFavoriteNumber: string = 'seven';
myFavoriteNumber = 7;
```
- TypeScript 会在没有明确的指定类型的时候推测出一个类型，这就是类型推论。
-*如果定义的时候没有赋值，不管之后有没有赋值，都会被推断成 any 类型而完全不被类型检查*
```typescript
let myFavoriteNumber;
myFavoriteNumber = 'seven';
myFavoriteNumber = 7;
```
--------------------
### 联合类型
- 联合类型（Union Types）表示取值可以为多种类型中的一种

```typescript
let myFavoriteNumber: string | number;
myFavoriteNumber = 'seven';
myFavoriteNumber = 7;
console.log(myFavoriteNumber);
```
> 这里的 let myFavoriteNumber: string | number 的含义是，允许 myFavoriteNumber 的类型是 string 或者 number，但是不能是其他类型。
#### 访问联合类型的属性或方法
- 当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，我们只能访问此联合类型的所有类型里共有的属性或方法：
```typescript
function getLength(something: string | number): number {
    return something.length;
}
```
- 上例中，length 不是 string 和 number 的共有属性，所以会报错。
- 访问 string 和 number 的共有属性是没问题的：
```typescript
function getString(something: string | number): string {
    return something.toString();
}
```
- 联合类型的变量在被赋值的时候，会根据类型推论的规则推断出一个类型：

```typescript
let myFavoriteNumber: string | number;
myFavoriteNumber = 'seven';
console.log(myFavoriteNumber.length);


myFavoriteNumber = 7;
console.log(myFavoriteNumber.length
//报错
```
- 上例中，第二行的 myFavoriteNumber 被推断成了 string，访问它的 length 属性不会报错
- 而第四行的 myFavoriteNumber 被推断成了 number，访问它的 length 属性时就报错了。

--------------
### 对象的类型——接口
- 对「对象的形状（Shape）」进行描述 

```typescript
interface Person{
    name:string,
    age:number
}
let tom: Person={
    name:'ln',
    age:18
};
```
- 上面的例子中，我们定义了一个接口 Person，接着定义了一个变量 tom，它的类型是 Person。这样，我们就约束了 tom 的形状必须和接口 Person 一致。
> 🐧 定义的变量类型必须和接口一致，多啦或者少定义属性啦 都会报错

```typescript
interface Person {
    name: string;
    age: number;
}

let tom: Person = {
    name: 'Tom',
    age: 25,
    gender: 'male'
};
/////////////////////////
interface Person {
    name: string;
    age: number;
}

let tom: Person = {
    name: 'Tom'
};
//error
```
- 可见，赋值的时候，变量的形状必须和接口的形状保持一致。

#### 可选属性

- 有时我们希望不要完全匹配一个形状，那么可以用可选属性：

```typescript
interface Person {
    name: string;
    age?: number;
}
let tom:Person={
  name:'ln'  
};

```
- 可选属性的含义是该属性可以不存在。
- 但是不允许添加未定义的属性

````typescript
interface Person {
    name: string;
    age?: number;
}

let tom: Person = {
    name: 'Tom',
    age: 25,
    gender: 'male'
};
//error
````
#### 任意属性

```typescript
interface Person {
    name:string,
    age?:number,
    [propName:string]:any
}
let tom:Person={
  name:'ln',
  cwt:2,
  age:18
};
//这样写是没有问题的 
```
- 如果定义的不是any 是一个string 那么可选属性必须是它的子集或相同类型

```typescript
interface Person {
    name:string,
    age?:number,
    [propName:string]:string
}
let tom:Person={
  name:'ln',
  cwt:2,
  age:18
};
// error =>cwt no string  age=> no string
```

#### 只读属性

- 有时候我们希望对象中的一些字段只能在创建的时候被赋值，那么可以用 readonly 定义只读属性：

```typescript
interface Person {
    readonly id: number;
    name: string;
    age?: number;
    [propName: string]: any;
}

let tom: Person = {
    id: 89757,
    name: 'Tom',
    gender: 'male'
};

tom.id=989;
//error  id=>readonly
```
- 不加readonly

```typescript
interface Person {
     id: number;
    name: string;
    age?: number;
    [propName: string]: any;
}

let tom: Person = {
    id: 89757,
    name: 'Tom',
    gender: 'male'
};

tom.id=989;
//success
```
- *注意，只读的约束存在于第一次给对象赋值的时候，而不是第一次给只读属性赋值的时候：*

```typescript
interface Person {
    readonly id: number;
    name: string;
    age?: number;
    [propName: string]: any;
}

let tom: Person = {
    name: 'Tom',
    gender: 'male'
};

tom.id = 89757;
// error 1=> 第一次在对象中没有赋值
// error 2=> 只读属性不能再次赋值
```
--------------
### 数组的类型

#### 类型 + 方括号」表示法

```typescript
let fibonacci: number[] = [1, 1, 2, 3, 5];
let fibonacci: number[] = [1, NaN, undefined, null, 5];
//=>
let fibonacci: number[] = [1, '1', 2, 3, 5];
//error=> '1'
fibonacci.push('8')// error=> string

```
#### 数组泛型

- 我们也可以使用数组泛型（Array Generic） Array<elemType> 来表示数组：

```typescript
let finln:Array<number>=[1,2,3,4,5,6];
finln.push(9);
console.log(finln);
```
#### 用接口表示数组

```typescript
interface Ary {
    [age:number]:number
}
let ln:Ary=[1,2,3,45,5];
console.log(ln);
```
#### 类数组

- 类数组（Array-like Object）不是数组类型，比如 arguments：

```typescript
function f() {
  let args:number[]=arguments;
}

//=>接口方式：
function sum() {
    let args:{
        [index:number] :number,
        length:number,
        callee:Function,
    }=arguments;
}
```
- 上例中，arguments 实际上是一个类数组，不能用普通的数组的方式来描述，而应该用接口

- 事实上常用的类数组都有自己的接口定义，如 IArguments, NodeList, HTMLCollection 等：

```typescript
function sum() {
    let args: IArguments = arguments;
}
```

- 其中 IArguments 是 TypeScript 中定义好了的类型，它实际上就是：

```typescript
interface IArguments {
    [index: number]: any;
    length: number;
    callee: Function;
}
```

- any 在数组中的应用

```typescript
let list: any[] = ['ln', 25, { website: 'https://kingcwt.io' }];
```
---------------

### 函数的类型

<a href='https://llh911001.gitbooks.io/mostly-adequate-guide-chinese/content/'>函数是 JavaScript 中的一等公民</a>

#### 函数声明

- 在 JavaScript 中，有两种常见的定义函数的方式——函数声明（Function Declaration）和函数表达式（Function Expression）：

```typescript
// 函数声明（Function Declaration）
function sum(x, y) {
    return x + y;
}

// 函数表达式（Function Expression）
let mySum = function (x, y) {
    return x + y;
};
```

- 注意，输入多余的（或者少于要求的）参数，是不被允许的：

```typescript
function sum(x: number, y: number): number {
    return x + y;
}
sum(1, 2, 3);
//===
function sum(x: number, y: number): number {
    return x + y;
}
sum(1);

//=> 少传和多传都会报错
```
#### 函数表达式

```typescript
let myLn:(x:number,y:number)=>number=function (x:number,y:number) :number {
    return x+y;
};
console.log(myLn(9, 10));
//=>在 TypeScript 的类型定义中，=> 用来表示函数的定义，左边是输入类型，需要用括号括起来，右边是输出类型

```

#### 用接口定义函数的形状

```typescript
interface SearchFunc {
  (source:string,substring:string):boolean;
}

let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
    return source.search(subString)!== -1;
}

```

#### 可选参数

```typescript
interface eleType{
    (x:number,y?:number) :number;
}
let sum:eleType;
sum=function (x:number,y?:number){
    if(y){
        return x+y;
    }else{
        return x;
    }
};

let val=sum(1);
console.log(val);

```

- 需要注意的是，可选参数必须接在必需参数后面。换句话说，可选参数后面不允许再出现必需参数了

#### 默认参数

```typescript
interface personType{
    (x:number,y?:number):number;
}
let lovLn:personType;
lovLn=function (x:number,y:number=4):number {
    if(y){
        return x+y;
    }else{
        return x+y;
    }
};

let val=lovLn(1);
console.log(val);
```

#### 剩余参数

```typescript
interface SurplusTy{
    (x:any[],...y:any[]):any;
}
let surplus:SurplusTy;
surplus=function (x:any[],...y:any[]) {
    y.forEach(i=>{
        x.push(i);
    })
};
let arr=[];
surplus(arr,1,2,3,4,5,6,7);
console.log(arr);

```

#### 重载

- 重载允许一个函数接受不同数量或类型的参数时，作出不同的处理。

> 比如，我们需要实现一个函数 reverse，输入数字 123 的时候，输出反转的数字 321，输入字符串 'hello' 的时候，输出反转的字符串 'olleh'

```typescript
interface typeHeavy{
    (x:number|string):number|string;
}
let heavy:typeHeavy;
heavy=function (x:number|string) :number|string {
    if(typeof x=='number'){
        return Number(x.toString().split('').reverse().join(''));
    }else if(typeof x=='string'){
        return x.split('').reverse().join('');
    }else{
        return x;
    }
};

let val=heavy('123456789');
console.log(val);
```
-----------------------------------

### 类型断言

- 类型断言不是类型转换，断言成一个联合类型中不存在的类型是不允许的：


````typescript
interface lovLnType{
    (x:number|string):number;
}
let lovLn:lovLnType;
 lovLn=function (x:number|string):number {
    if((<string>x).length){
        return (<string>x).length;
    }else{
        return x.toString().length;
    }
};
 let val=lovLn(123);
console.log(val);
````
- 类型断言的用法如上，在需要断言的变量前加上 <Type> 即可

----------------

### 声明文件

- 当使用第三方库时，我们需要引用它的声明文件，才能获得对应的代码补全、接口提示等功能


------------------------进阶

### 类型别名

- 类型别名用来给一个类型起个新名字。

```typescript

type name=string;
type NameResolver=()=>string;
type NameOrResolver=name|NameResolver;
function getName(n:NameOrResolver) {
    if(typeof n=='string' ){
        return n;
    }else{
        n();
    }
}
let ln=function(){
    return 'loveLn';
};

let val=getName('ln');
let val2=getName(ln());
console.log(val2);
```

#### 字符串字面量类型

- 类型别名与字符串字面量类型都是使用 type 进行定义。

```typescript

type EventNames='click'|'scroll'|'mousemove';
function handleEvent(ele:Element,event:EventNames) {
   //do someThing
}
handleEvent(document.getElementById('root'),'click');
```

### 元组

- 数组合并了相同类型的对象，而元组（Tuple）合并了不同类型的对象。

```typescript
let tom:[string,number]=['ln',23];
console.log(tom[1]);

let Tom:[string,number];

Tom=['ln',23];
console.log(Tom);
```

#### 越界的元素

- 当添加越界的元素时，它的类型会被限制为元组中每个类型的联合类型：

```typescript
let Tom:[string,number];

Tom=['ln',23];
Tom.push('cwt');
Tom.push(true);  //error 
console.log(Tom);
```
-------------

### 枚举

````typescript
enum Days {Sun, Mon, Tue, Wed, Thu, Fri, Sat};
console.log(Days[0],'-----',Days['Sun']);
````

#### 手动赋值

```typescript
enum Days {Sun, Mon, Tue=3, Wed, Thu, Fri, Sat};

console.log(Days[3],'-----',Days['Tue']); // Tue 3
console.log(Days['Wed'],Days['Mon'],Days['Sun'],Days[2]); //4 1 0 undefined
```


```typescript
enum Days {Sun=3, Mon=1, Tue, Wed, Thu, Fri, Sat};

console.log(Days['Sun'],Days[3]);  //3 Wed
```

- 所以使用的时候需要注意，最好不要出现这种覆盖的情况。

#### 计算所得项

```typescript
enum Color {Red, Green, Blue = "blue".length,Ln};
console.log(Color.Blue);
//error =>Ln
```
- 如果紧接在计算所得项后面的是未手动赋值的项，那么它就会因为无法获得初始值而报错

--------------------------------
### 类

> 传统方法中，JavaScript 通过构造函数实现类的概念，通过原型链实现继承。而在 ES6 中，我们终于迎来了 class。
> TypeScript 除了实现了所有 ES6 中的类的功能以外，还添加了一些新的用法。

- 类(Class)：定义了一件事物的抽象特点，包含它的属性和方法
- 对象（Object）：类的实例，通过 new 生成
- 面向对象（OOP）的三大特性：封装、继承、多态
- 封装（Encapsulation）：将对数据的操作细节隐藏起来，只暴露对外的接口。外界调用端不需要（也不可能）知道细节，就能通过对外提供的接口来访问该对象，同时也保证了外界无法任意更改对象内部的数据
- 继承（Inheritance）：子类继承父类，子类除了拥有父类的所有特性外，还有一些更具体的特性
- 多态（Polymorphism）：由继承而产生了相关的不同的类，对同一个方法可以有不同的响应。比如 Cat 和 Dog 都继承自 Animal，但是分别实现了自己的 eat 方法。此时针对某一个实例，我们无需了解它是 Cat 还是 Dog，就可以直接调用 eat 方法，程序会自动判断出来应该如何执行 eat
- 存取器（getter & setter）：用以改变属性的读取和赋值行为
- 修饰符（Modifiers）：修饰符是一些关键字，用于限定成员或类型的性质。比如 public 表示公有属性或方法
- 抽象类（Abstract Class）：抽象类是供其他类继承的基类，抽象类不允许被实例化。抽象类中的抽象方法必须在子类中被实现
- 接口（Interfaces）：不同类之间公有的属性或方法，可以抽象成一个接口。接口可以被类实现（implements）。一个类只能继承自另一个类，但是可以实现多个接口

#### ES6 中类的用法

> 使用 class 定义类，使用 constructor 定义构造函数。 
> 通过 new 生成新实例的时候，会自动调用构造函数。
> 使用 extends 关键字实现继承，子类中使用 super 关键字来调用父类的构造函数和方法。

#### 存取器

```javascript
class Animal {
    constructor(name) {
        this.name = name;
    }
    get name() {
        return 'Jack';
    }
    set name(value) {
        console.log('setter: ' + value);
    }
}

let a = new Animal('Kitty'); // setter: Kitty
a.name = 'Tom'; // setter: Tom
console.log(a.name); // Jack
```

#### 静态方法

- 使用 static 修饰符修饰的方法称为静态方法，它们不需要实例化，而是直接通过类来调用：

```javascript

class jack {
    static say(a):void{
        console.log(a);
    };
}

let val=new jack('chr');  //error
jack.say('chr');  //静态方法直接调用
```

#### TS中类的用法

> ypeScript 可以使用三种访问修饰符（Access Modifiers），分别是 public、private 和 protected

- public 修饰的属性或方法是公有的，可以在任何地方被访问到，默认所有的属性和方法都是 public 的
- private 修饰的属性或方法是私有的，不能在声明它的类的外部访问
- protected 修饰的属性或方法是受保护的，它和 private 类似，区别是它在子类中也是允许被访问的

```typescript
class Animal {
    public name='chr';
    public constructor(name){
        this.name=name;
    }
}

let val=new Animal('cwt');
val.name='ln'; //共有的可以直接赋值 /如果是private 私有的 就会报错 /还有就是 只有static静态属性才可以直接用类.属性 （混淆）
console.log(val.name); 
```

- 很多时候，我们希望有的属性是无法直接存取的，这时候就可以用 private 了：

```typescript
class Animal {
    private name;
    public constructor(name) {
        this.name = name;
    }
}

let a = new Animal('Jack');
console.log(a.name); //只能在类中访问
```
- protected时 才能继承该属性 private不能被子类继承该属性 当构造函数为private是 子类不能被继承或者实例化
- 当构造函数为protected时 子类只能被继承
```typescript
class Animal {
    protected name;
    public constructor(name){
        this.name=name;
    }
}

class Cat extends Animal{
    constructor(name){
        super(name);
        this.name=name;
    }
}
```

#### readonly

- 只读属性关键字，只允许出现在属性声明或索引签名中。

```typescript
class Animal {
    readonly name;
    public constructor(name){
        this.name=name;
    }
}
```

- 注意如果 readonly 和其他访问修饰符同时存在的话，需要写在其后面。
```typescript
class Animal {
    // public readonly name;
    public constructor(public readonly name) {
        this.name = name;
    }
}
```

#### 抽象类

- abstract 用于定义抽象类和其中的抽象方法。


```typescript

abstract class Animal {
    public name;
    public constructor(name) {
        this.name = name;
    }
    public abstract sayHi();
    public abstract cs();
}

class Cats extends Animal{
    public cs() {
        console.log(`Meow, My name is ${this.name}`);
    }
    public sayHi() {
        console.log(`Meow, My name is ${this.name}`);
    }
}
// 1 子类必须继承父类  父类中的公开抽象方法 子类必须继承 
```

### 类实现接口

```typescript
interface Alarm{
    alert();
}

class Door{

}

class SecurityDoor extends Door implements Alarm{
    alert(){
        console.log('SecurityDoor alert ');
    }
}

class Car implements Alarm{
    alert(){
        console.log('Car alert');
    }
}
```
- 一个类实现多个接口

```typescript
interface Alarm {
    alert()
}

interface Light {
    lightOn();
    lightOff();
}

class Car implements Alarm,Light{
    alert(){
        console.log('car');
    }
    lightOff(){
        console.log('off');
    }
    lightOn(){
        console.log('on');
    }
}
```

### 接口继承接口

```typescript
interface Alarm {
    alert();
}

interface LightableAlarm extends Alarm {
    lightOn();
    lightOff();
}
```

#### 混合类型

- 一个函数还可以有自己的属性和方法：

```typescript

interface Counter {
    (start:number):string;
    interval:number;
    reset():void;
}

function getCounter():Counter {
    let counter=<Counter>function (start:number) {
        
    };
    counter.interval=123;
    counter.reset=function () {
        console.log('reset');
    };
    return counter;
}

let fs=getCounter();

console.log(fs.interval);
fs.reset();
```

### 泛型

````typescript
function createArray<T>(length:number,value:T):Array<T> {
    let result:T[]=[];
    for (let i=0;i<length;i++){
        result[i]=value;
    }
    return result;
}

createArray<string>(3,'x');
````

- 上例中，我们在函数名后添加了 <T>，其中 T 用来指代任意输入的类型，在后面的输入 value: T 和输出 Array<T> 中即可使用了。

```typescript
interface chr {
    length:number
}
function logging<T extends chr>(arg:T):T {
    console.log(arg.length);
    return arg;
}
```
#### 泛型接口

```typescript

interface CreateArrayFunc<T> {
   (length:number,value:T):Array<T>
}
let createArray:CreateArrayFunc<any>;
createArray=function<T> (length:number,value:T):Array<T> {
    let result:T[]=[];
    for (let i=0;i<length;i++){
        result[i]=value;
    }
    return result;
};

createArray(3,'chr');
```