const express = require('express')

// 获取express实例
const server = express()

// 编写路由处理不同url请求
server.get('/',(req,res)=>{
    res.send('hello world')
    // res.json()
})



//监听端口
server.listen(80,()=>{
    //回调函数
    console.log('server start success')
})