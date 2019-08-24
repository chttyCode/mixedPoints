## react hook

- 动机
  1. 状态逻辑重用
  2. 不同生命周期重复相同的代码
- hooks
  1. useState
  2. useEffect
  3. useContext
  4. useRduce

## react concurrentMode 

- 下个版本
  

## nodeJs

- http-server
    -  http-server 缓存  206 + gzip压缩 + 如果是文件 标识文件图标 文件夹 文件夹图标标  + 提交到npm包上 代码发到github上
    - http 多语言 Accepet-Language zh,en;q=1 多于语言 
    - 范围请求 206 Range="bytes=2-10" 获取某部分数据
    - 防盗链 限制用户发请求的网站 来源 referer (可以伪造的) ＋ 验证码 （影响用户体验）
    - gzip压缩 前端 accept-encoding gzip / deflate   content-encoding
    - user-agent 统计 判断用户内核
    - 缓存强制缓存    304  对比缓存 ／ 协商缓存 
    -    Cache-Control max-age Expires
    -    last-modifed （服务端） if-modified-since （客户端）
    -    Etag   if-none-match

    - content-length content-type

    - host (ecs)  多个域名 a.zhufeng.cn  b.zhufeng.cn
    - cookie+session +token
    - 
- express
    - restfulAPI
    - 请求占位符
    - 中间件
    - ejs模板
    - 静态服务
    - body-parse