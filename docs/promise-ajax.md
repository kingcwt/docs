#  Promise-ajax
![logo](./_media/logo.svg ':size=50x100')
![logo](./_media/logo.svg ':size=100')
- Promise(用法) 就是为了解决回调问题  三个状态 成功 失败 等待

```javascript
let a='';
function buy(callback){
   setTimeout(()=>{
     a='蘑菇';
     callback(a);   
   },2000)
}
buy(function cookie(val){
 console.log(val)
})
```
```javascript
let el=new Promise((resolve,reject)=>{
  setTimeout(()=>{
    let a='蘑菇';
    resolve(a);
  },2000)
});

el.then((res)=>{
console.log(res)
},()=>{

})
 
 
```
```javascript
function ajax({url='',type='get',dataType='json'}){
    return new Promise((resolve,reject)=>{
        let xhr=new XMLHttpRequest();
        xhr.open(type,url,true);
        xhr.onload=function() {
          if(xhr.status===200){
          resolve(xhr.response);              
          }else{
              reject('not found')
          }  
        };
        xhr.onerror=function(err) {
          reject(err);
        };
        xhr.send();
    })
}


```
- 实例调用Promise-ajax[function]

```html
<div id="app">
<ul>
<li v-for="item in arr">{{item}}</li>
</ul>
</div>
<script src="../一/vue/node_modules/vue/dist/vue.js"></script>
<script src="Promise-ajax.js"></script>
```

```vue

let vm=new Vue({
  el:"#app",
  created(){
    ajax({url:'./cart.json'}).then((res)=>{ 
      this.arr=res;
      },()={})  
  }
  data:{arr:[]}
})

```