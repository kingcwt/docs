# Treasury  

## 粘贴复制功能

#### 1 原生JS复制粘贴(execCommand)

- html部分
```html
<span style="display:none;" id="linkCopy">复制的内容</span>
<button class="addBtn"></button>
```
- js部分

```js
//记得引入JQ
var copContent = $('#linkCopy').text();
var CopInpt = document.createElement('input');
CopInpt.value = copContent;
document.body.appendChild(CopInpt);
CopInpt.select(); //选中内容
document.execCommand('Copy'); //执行浏览器复制
CopInpt.className='copEle';
copInpt.style.display='none';
```
- - - - - -

#### 插件实现复制粘贴

- html部分

```html
<button data-clipboard-action="copy" data-clipboard-target="#foo5" class="addBtn btn" ></button>
<input type="text" id="foo5"  value="haochuangye111" style="opacity: 0">

//1 点击复制按钮加入以下属性
data-clipboard-action="copy" data-clipboard-target="#foo5"
//2 input 加入id foo5 input元素的id 要和button的属性data-clipboard-target对应

```
- js部分

```js
//1 引入clipboard.js
var clipboard = new Clipboard('.btn'); //这里的.btn 就是按钮的类名
        clipboard.on('success', function(e) {
            console.log(e);
            alert('复制成功,在微信搜索处粘贴即可')
        });

        clipboard.on('error', function(e) {
            console.log(e);
        });

```

