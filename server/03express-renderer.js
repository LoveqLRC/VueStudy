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
        template:'<div @click="onClick">{{msg}}</div>',
        data() {
            return {
                msg: 'hello vue ssr'
            }
        },
        methods: {
            onClick(){
                console.log('onClick')
            }
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