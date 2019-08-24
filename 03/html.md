# HTML5

1. HTML5文档标准解读-新特性
   1. 新的语义化元素：比如<header>，<footer> 和<section>
   2. 改进了HTML Web 表单，为<input> 标签引入了一些新的属性。
   3. 持久的本地存储：为了不通过第三方插件实现。
   4. WebSocket：用于Web 应用程序的下一代双向通信技术。
   5. 服务器推送事件：HTML5 引入了从Web 服务器到Web 浏览器的事件，也被称作服务器推送事件（SSE）。
   6. Canvas：支持用JavaScript 以编程的方式进行二维绘图。
   7. 音频和视频：在网页中嵌入音频或视频而无需借助第三方插件
   8. 地理定位：用户可以选择与我们的网页共享他们的地理位置。
   9. 微数据：允许我们创建HTML5 之外的自定义词汇表，以及使用自定义语义扩展网页。
   10. 拖放：把同一网页上的条目从一个位置拖放到另一个位置。
   11. HTML5 被设计为尽可能的对现有浏览器向后兼容。新特性都是建立在现有特性的基础上，并且允许我们为旧浏览器提供备用内容。
   12. 建议使用少量的JavaScript 代码检测单个HTML5 特性的支持度。
2. HTML5文档标准解读-元素
      1. Metadata 元数据元素
        > Metadata元素意指那些定义文档元数据信息的元素。包含以下元素：base, link, meta, noscript, script, style, template, title
      2. Flow 流式元素
        > Flow元素指所有可以放在body标签内，构成文档内容的元素均属于Flow元素。因此，除了base, link, meta, style, title等只能放在head标签内的元素外，剩下的所有元素均属于Flow元素。
      3. Sectioning 章节元素
        > Sectioning指定义页面结构的元素，具体包含以下四个：article, aside, nav, section。
      4. Heading标题元素
        > Heading指所有标题元素属于Heading，也即以下6个元素：h1, h2, h3, h4, h5, h6。
      5. Phrasing段落元素
        > Phrasing 所有可以放在p标签内，构成段落内容的元素均属于Phrasing元素。因此，所有Phrasing元素均属于Flow元素。
      6. Embedded嵌入元素
        > Embedded所有用于在网页中嵌入外部资源的元素均属于Embedded元素，具体包含以下9个：audio, video, img, canvas, svg, iframe, embed, object, math。
      7. Interactive交互元素
        > Interactive 所有与用户交互有关的元素均属于Interactive元素，包括a, input, textarea, select等。

3. HTML5文档标准解读-全局属性
    1. accesskey 用户自定义 定义访问元素的键盘快捷键。
    2. align right, left, center 水平对齐标签。
    3. background URL 在元素后面设置一个背景图像
    4. class 用户定义。分类一个元素，便于使用级联样式表。
    5. contenteditable true, false 定义用户是否可以编辑元素的内容。
    6. contextmenu Menu id 为元素定义上下文菜单
    7. data-XXXX 用户定义。HTML 文档的作者可以定义自己的属性。自定义属性必须以"data-" 开头。
4. 