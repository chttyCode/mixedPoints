/*
 * @Author: kongds
 * @Date: 2019-08-15 16:37:52
 */
let thousands=(number)=>{
    //依据小数点切割数据
    let [int,dec] = (number+'').split('.')
    int+=''
    //匹配位置
    //int先行断言，即断言位置前面
    console.log(int,dec)
    int=int.replace(/(?!^)(?=(\d{3})+$)/g,(...arg)=>{
        console.log(arg)
        return ','
    })
    dec=dec.replace(/(?<=^(\d{3})+)(?!$)/g,(...arg)=>{
        console.log(arg)
        return ','
    })
    console.log(dec)
    //dec位置匹配先行断言
}

// thousands(213541231.43523)


// let str='123456789'.replace(/(?!^)(?=(\d{3})+(?!\d))/g,',')

// console.log(str)

///密码长度6-12位，由数字、小写字符和大写字母组成，但必须至少包括2种字符。
let reg = /(?=.*[0-9])^\d{6-12}$/
let str='123456789'.replace( /(?=.*[0-9])/g,'#')

console.log(str)
