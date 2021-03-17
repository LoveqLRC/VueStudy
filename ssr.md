# SSR

## 概念 

服务端渲染：将`vue`实例渲染为`html`字符串直接返回，在前端激活为交换程序

## 优点

- seo
- 首屏内容到达时间

##  服务端知识


### express
安装

```
npm i express -s
```

>express-demo.js

```
const express = require('express')

// 获取express实例
const server = express()

// 编写路由处理不同url请求
server.get('/',(req,res)=>{
    res.send('hello world')
})



//监听端口
server.listen(80,()=>{
    //回调函数
    console.log('server start success')
})
```

启动服务器
```
node express-demo.js
```

> 每次修改文件必须重新启动服务器，如果不想那么麻烦可以用`nodemon`实现热更新，全局安装 `npm i nodemon -g` 然后`nodemon express-demo.js`


## renderer

使用渲染器将`vue`实例成`html` 字符串并返回

安装`npm i vue-server-renderer -S`

```
// 创建vue实例
const Vue = require('vue')
const app = new Vue({
    template:"<div>Hello World</div>"
})

//获取渲染器实例
const {createRenderer} = require('vue-server-renderer')
const renderer = createRenderer()


//用渲染器渲染vue实例
renderer.renderToString(app).then(html =>{
    console.log(html);
}).catch(error =>{
    console.log(error)
})
```

执行
```
node vuerenderer.js
```
输出结果
```
<div data-server-rendered="true">Hello World</div>
```

## express + renderer


```
const express = require('express')
const Vue = require('vue')
//获取渲染器实例
const {createRenderer} = require('vue-server-renderer')
const renderer = createRenderer()

// 获取express实例
const server = express()

// 编写路由处理不同url请求
server.get('/',(req,res)=>{
    // res.send('hello world')
    // res.json()

    const app = new Vue({
        template:"<div >{{msg}}</div>",
        data() {
            return {
                msg: 'hello vue ssr'
            }
        },
        methods: {
    
        },
    })

    //用渲染器渲染vue实例
    renderer.renderToString(app).then(html =>{
        res.send(html)
    }).catch(error =>{
        res.status(500)
        res.send('Internal Server Error ,500 !')
    })
})



//监听端口
server.listen(80,()=>{
    //回调函数
    console.log('server start success')
})
```