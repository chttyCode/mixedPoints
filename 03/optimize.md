# 前端性能优化

1. 缩短首字节
2. 减少网络请求 文件合并 css-sprite iconfont base64 合并请求
3. 减少请求字节数 文件压缩 开启Gzip
4. 减少Dom数
5. 减少重排重绘 合并css规则 动画&canvas开启独立图层 不在循环中操作获取有关Dom的操作 大量文档操作要离线
6. 合理安排资源加载时机
7. 合理使用缓存 网络选择中使用CDN设置s-age缓存策略 设置cache-control expries last-modify e-tag
8. 合理使用客户端缓存 cookie localstorage sessionstorage indexDB PWA 
9. 