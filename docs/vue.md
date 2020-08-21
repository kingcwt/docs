# vue 随笔

## 创建项目

> vue ui

## 事件传参

```html
<template>
  <div class="home">
    <button @click="handleClick('back')">返回上一页</button>
    <button @click="handleClick('push')">返回上一页</button>
    <button @click="handleClick('replace')">返回上一页</button>
  </div>
</template>
```
```js
handleClick(type) {
  // this.$router.go(-1)
  if (type === "back") this.$router.back();
  else if (type === "push"){
    // this.$router.push({
    //   // 1 name+params
    //   name:'argu',  
    //   // query:{
    //   //   name:'lison'
    //   // }
    //   params:{
    //     name:'listen'
    //   }
    // })
    const name = 'listen12';
    this.$router.push({
      path:`argu/${name}`
    })
  }
  else if(type ==='replace') this.$router.replace('/parent')
},
```

## 路由

```js
{
    path: '/',
    name: 'Home',
    alias:'/home_page', //别名
    component:()=>import('@/views/home.vue') //按需加载组件
},

```
- 动态路由

```js
//router.js


{
  path:'/argu/:name',
  name:'argu',
  component:()=> import('@/views/argu.vue')
},

```

- 嵌套路由

```js
<template>
  <div>
    i am parent
    <router-view />
  </div>
</template>

{
    path:"/parent",
    name:'parent',
    component:()=>import('@/views/parent.vue'),
    children:[
        {
            path:'child',
            component:()=>import('@/views/child.vue')
        }
    ]
},
```

- 命名路由

```js
<router-view/>
<router-view name='email'></router-view>
<router-view name='tel'></router-view>

{
  path:'/named_view',
  components:{
      default:()=>import('@/views/child.vue'),
      email:()=>import('@/views/email.vue'),
      tel:()=>import('@/views/tel.vue')
  }
},

```

- 重定向

```js
{
  path:'/main',
  redirect:to=> '/'
}
```
