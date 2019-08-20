# http-server

- 编写可执行文件，package.json中bin目录index.js
- commander 解析命令行参数
- 编写server
    1. mz/fs 转promise ejs提供模版渲染 mime 判断文件类型 url解析请求参数 string_decode
    2. 创建server
    3. 处理响应