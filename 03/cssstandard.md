# CSS 规则

1. 目录规则&文件
    1. 目录结构 css images
    2. 文件名编码规范文件名：小写字母、数字、点、中划线中的一种或几种组成
    3. 引入方式外联
       1. CSS 文件一律在<head>区域通过 link 方式引入，并且需要省略类型声明type=“text/css”
       2. 禁止在 CSS 内部采用 @import 方式引入其它 CSS 文件
       3. 原则上，禁止在 HTML 标签上写行内样式
       4. 已经发布过生产的页面，如需修改背景图，必须在 CSS 中对相应 url 添加图片版本号
2. 注释规范
   1. 单行注释，可以写成单独的一行，也可以写在行尾，例如：/* 首屏 */
   2. 多行注释，又叫块注释，必须写在单独的几行内。
   3. 注释中的每一行代码不超过 40 个汉字，或者 80 个英文字符；
   4. 为避免极端情况下出现乱码字符导致注释范围意外扩大，注释的星号“*”与内容之间必须要有一个空格
   5. 当代码被更改，注释也应该做相应修改
3. 命名规范 
   1. 命名采用小写加中划线的方式，不允许使用大写字母或下划线；
   2. 命名推荐采用简单有语义的英文单词或英文单词组合
   3.  DOM 一律不准使用 id 挂载 CSS，且要避免 id 与 class 重名
   4.  命名中不应该包含颜色、方向、大小等与具体显示效果相关的信息，应该使用其意义或功能命名，而不是样式显示结果。
   5.  禁止直接为 HTML 标签添加 CSS 样式（全局的 reset 除外）
   6.  具体命名规则规定如下：
       1.  全局（global）级别的模块/组件，如头、尾、迷你购物车、主导航、侧边栏等，类名以“g-”或“ng-”（new global）开头
       2.  低耦合的通用模块 / 组件（ module ）， 类 名 以 “ m- ”开头 ，如：.m-dialog，.m-floatbar，.m-page 等；
       3.  其它 CSS 命名按照功能划分，可采用一级或多级加中划线方式表示，如：.zone-share 表示社区分享模块，.first-screen-banner 表示首屏 banner模块
4. 排版规范
   1. 代码缩进统一使用 tab 缩进，一个 tab 设置为 4 个空格。
   2. CSS 排版规则可以写成单行，或者多行，但是整个文件内的排版规则必须统一
5. 其他约定
   1. 在可以不使用引号的情况下，尽量不使用引号，如背景图片路径；
   2.  需要使用引号的时候，尽量使用单引号；
   3.  前端开发阶段的 CSS 文件不要求合并和压缩，但是交付开发和发布生产，外联 CSS文件或内联 CSS 片段必须合并与压缩   
6. 规则书写规范
    1. 属性顺序
        1. 显示属性 display/visibility，position，left，top，z-index，float，clear，list-style
        2. 自身属性（盒模型）width，height，margin，padding，border
        3. 背景 background
        4. 行高 line-height
        5. 文本属性 color，font，text-decoration，text-align，text-indent，vertical-align，white-space，content
        6. 其它 cursor，zoom，opacity，filter 等 
        7. CSS3 transform，transition，animation，box-shadow，border-radius 等
        8. overflow
        9. hack
        10. 链接样式必须严格按照 a:link -> a:visited -> a:hover -> a:active 
    2. 属性值
        1.  属性值采用小写形式，以下情况除外 16 进制色值，必须大写 滤镜等必须使用驼峰式写法的值。
        2.  属性值可缩写的必须缩写
            1. 如果可以，颜色尽量用三位字符表示，例如：#FF0000 写成#F00；
            2. 0 后面不需要单位，例如：0px 可以缩写成 0
            3. 0.X 这样的小数，可以去掉小数点前面的 0，例如：opacity: 0.6 可以缩写成opacity: .6
            4. 如果没有边框，不要写成 border: 0，应该写成 border: 0 none
            5. border、background 和 font 等可以缩写的属性，尽量使用缩写形式，但一定要遵循 W3C 的顺序规范transition CSS 属性是 transition-property，transition-duration，transition-timing-function 和 transition-delay 的一个简写属性。CSStransform属性允许你旋转，缩放，倾斜或平移给定元素,padding,list-style属性是一个简写对属性集合，包括list-style-type, list-style-image, 和 list-style-position。, border-radius 属性是一个简写对属性集合，包括border-top-left-radius、border-top-right-radius、border-bottom-right-radius，和 border-bottom-left-radius 简写为
            ``` html    
                <style>
                    body{
                        background-color: #000;
                        background-image: url(images/bg.gif);
                        background-repeat: no-repeat;
                        background-position: top right;
                    }
                    <!-- body{
                        background: #000 url(images/bg.gif) no-repeat top right;
                    } -->
                    body{
                        font-style: italic;
                        font-weight: bold;
                        font-size: .8em;
                        line-height: 1.2;
                        font-family: Arial, sans-serif;
                    }
                    <!-- body{
                        font: italic bold .8em/1.2 Arial, sans-serif;
                    } -->
                    body{
                        border-width: 1px;
                        border-style: solid;
                        border-color: #000;
                    }
                    <!-- body{border: 1px solid #000;} -->
                    body{
                        margin-top: 10px;
                        margin-right: 5px;
                        margin-bottom: 10px;
                        margin-left: 5px;
                    }
                    <!-- body{margin: 10px 5px 10px 5px;} -->
                </style>
            ```
        3. 性能
            1. 选择器应该在满足功能的基础上尽量简短，减少嵌套选择器的查询消耗。
            2. 禁止在 CSS 中使用 * 选择符
            3. 除非必须，一般有 class 或者 id 的，不需要再写上元素对应的 tag，
            4. 合并 margin、padding、border 的-top/-right/-bottom/-left 设置，尽量使用缩写
            5. CSS 背景图要使用 sprite 技术。可按照相关度（是否首屏、模块、页面等）合并，并存储为 web 所用格式。图片优先使用 png8 格式存储，并适当压缩体积。在存在透明通道的情况下，可使用 png24 格式图片。在色值较多且不需要透明的情况下，可使用 jpg 格式保存
        4. 
    3. 取值规范
        1. font-size 必须以 px 或 pt 为单位，推荐用 px
        2. 中文字体大小不允许出现基数的像素值，如 13px。
        3. 使用 text-indent 时，要避免使用一个很大的值来达到隐藏文字的效果，
        4. z-index
        5. hack 是一把双刃剑，我们的原则是：最大程度减少 hack 的使用。区分规则&区分属性
            1. IE6 * html selector { … }
            2. IE7 *+ html selector { …}
            3. 非 IE6 html>body selector { … }
            4. IE6 _property: value;
            5. IE6/7 +property: value;
            6. IE6+ property: value\9;
            7. IE8+ property: value\0;
            8. IE9+ property: value\9\0;
            9. 非 IE6 property : value !important;
            10. Safari/Chrome [;property : value;]
7. 其它约定
    1. 注意 common.css 中 reset 及一些小样式的复用，不过度依赖头尾样式，也勿轻易覆盖头尾
    2.  要合理使用表达式，必须使用表达式时，可使用单次计算的表达式；
    3.  图片列表，建议在 css 文件中设置图片块状展示（display: block;），宽高确定时需显式设置宽高；
    4.  尽量少使用!important；
    5.  提高样式复用性，充分利用 html 标签自身属性及继承原理，以减少代码量；
    6.  禁止用 id 添加样式规则；
    7.  禁止用 css 控制单行文字用省略号截断；
    8.  css 命名中，禁止出现 ad(s)等字样，防止被浏览器屏蔽；
    9.  css 文件必须合并压缩后，才能发布生产。