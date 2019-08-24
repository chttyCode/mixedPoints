/*
 * @Author: kongds
 * @Date: 2019-08-15 16:23:32
 */
//解析模板

let fs = require('fs')
let path = require('path')
//1. 读取模板
let source = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8')
//2. 构建函数
function render(source, data) {
    let str = 'with(data){\r\n let str = `'
    //  <%arr.forEach(item=>{%>
    let content = source.replace(/<%=([\s\S]*?)%>/g, (match, group) => {
        return '${' + group + '}';
    })
    content = content.replace(/<%(.*)%>/g, (match, g) => {
        console.log(match)
        return '`\r\n' + g + '\r\nstr+=`'
    })
    str += content + '`\r\n return str\r\n}'
    let fn = new Function('data', str)
    return fn(data)
}
// 1) 字符串替换 用对象中的数据渲染到模板上
let str = render(source, {
    arr: ['kds', 'fsk'],
    title:'ejs渲染'
});
fs.writeFile(path.join(__dirname, 'ejs23.html'), str, (err) => {
    if (err) throw err;
    console.log('完成文件渲染');
});