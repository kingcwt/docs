# Interview Questions Abstracted from the Internet

- 1 react/vue项目中为什么在列表组件中写key,作用是什么

解析：vue和react都采用diff算法来对比新旧虚拟节点，从而更新节点；在交叉对比过程中，当新节点和旧节点`头尾交叉对比`没有结果时，
会根据新节点的key去旧节点数组中找对应的key，从而找到相应旧节点(这里对应的是一个key=>index的map映射)，如果没有找到就认为是新增的节点。而如果没有key，那么就会采用
遍历的查找方式去找对应的旧节点。一种是map映射，另一种则是遍历查找，相比map映射的速度更快。
那么写key的作用就是：`更准确，更快`
```vue
// vue项目  src/core/vdom/patch.js  -488行
// 以下是为了阅读性进行格式化后的代码

// oldCh 是一个旧虚拟节点数组
if (isUndef(oldKeyToIdx)) {
  oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx)
}
if(isDef(newStartVnode.key)) {
  // map 方式获取
  idxInOld = oldKeyToIdx[newStartVnode.key]
} else {
  // 遍历方式获取
  idxInOld = findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx)
}

```
答案：key的作用就是更新组件时判断两个节点是否相同。相同就复用，不相同就删除旧的创建新的。(key是起不到提速效果的)

最终答案：key就是一个标识，有key的情况下 会通过key对应的去查找 有的复用 没有的删除旧的创建新的 

- 2 数组扁平化并去除其中重复数据，最终得到一个升序且不重复的数组


```html
 已知如下数组：
var arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10];

Array.from(new Set(Arr.flat(Infinity))).sort((a,b)=>a-b)
//(14) [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
```