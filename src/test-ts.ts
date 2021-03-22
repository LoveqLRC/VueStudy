function say(){

}

function fn2(o:{prop:number}){

}

// 类型别名
type Prop = {prop:number}

function fn3(o:Prop) {//等于fn2

}

//type和接口interface的区别，基本完全相同

// interface Prop2{
//     prop:number
// }


//类型断言
const someValue :any = "this is a string"
const stringlength = (someValue as string).length

// 联合类型
let union: String | number
union = "1"
union = 1

// 交叉类型
type First = {first:number}
type Second = {second:number}
// 扩展新的type
type FirstAndSecond = First & Second
function fn4():FirstAndSecond{
    return {first:1,second:2}
}

// 函数
// 1.设置了就是必填参数
// 2.默认值 msg='abc'
// 3.可选参数 option?:string
function greeting(person:string,msg='abc',option?:string): string{
    return ''
}

//函数重载


function a(){
    return "hello world"
}

console.log(a())