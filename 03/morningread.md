# 20190623

1. Chrome 76 版本特性
    * 新增特性
      - 转换动画的回放速度: Animation.updatePlaybackRate()
      - 异步剪贴板：读取和写入图像 navigator.clipboard.read() 和 navigator.clipboard.write() 的功能
      - 获取元数据 引入一个新的 HTTP request header
      - form.requestSubmit ()
      - ImageCapture 支持对焦距离约束
      - 实现 Animation.pending
      - IndexedDB 事务显式提交 API 调用向IDBTransaction 对象添加了一个 commit() 函数，
      - 日期格式、日期样式和时间样式
      - Worker 的媒体能力（Media Capabilities）
      - Promise.allSettled
      - dark 模式、轻松安装 PWA、隐身模式难检测
    * 删除特性
      - 删除特性策略：lazyload该策略被删除，取而代之的是用于加载的新特性策略，叫 loading-frame-default-eager，这更符合 loading 属性的使用方式。该删除同时适用于 Feature-Policy header 和<iframe> allow 属性。
