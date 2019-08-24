# headers之多语言设置

- request
  - accept-language: zh-CN,zh;q=0.9
- response
  - location: map(lan)

- redirect
  - browers
    - no-cors
  - xhr=>302
    - cors
    - xhr=>browers=>xhr.onreadystatechange
    - get不到任何从定向的状态
  - fetch=>302
    - cors
    - redirect mod 
      - "follow" 允许发生从定向
      - "error" 从定向报错
      - "manual" 过滤从定向，返回type  opaqueredirect status=0
- abort
  - xhr=>abort
    - timeout 设置超时 ontimeout/upload.ontimeout 设置超时回调
    - xhr.abort() 终止 onabort/upload.ontimeout 设置终止回调
  - fetch=>abort
    - aborted sign终止信号 AbortController实例对象{sign,abort}  type DOMException 
    - timeout settimeout reject