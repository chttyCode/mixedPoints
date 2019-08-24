# 开发规范

- 项目创建规范
    1. 目录规范化 src build 文件名使用中划线 模块文件使用下划线
    2. 文件模块化 相同模块只能有一个
- 编码规范
    1. html规范
       1. h5页头只能有一个 <!DOCTYPE html>
       2. HTML 预留 title、keywords、description 等 SEO meta 位置
       3. CSS 文件采用 link 方式在 head 区域引入，CSS 引入须省略 type 属性，且尽可能少的使用行内 style 样式。所有的 CSS 文件需保存为 utf-8 编码格式，并且在 CSS文件内的第一行强制设置 charset 为 utf8
       4. 外联 javascript 文件需放在页面底部、body 结束标签之前，文件引入须省略 type属性；
    2. 注释
       1.  <!-- -->
    3. 缩进 4
    4. 缩进
       1.  HTML 标签语义化
       2.  合理嵌套
           1. 块级元素（block elements 常用的块级元素有：div、h1-h6、p、table、tr、td、ul、ol、li、dl、dt、dd、fieldset、legend 等（实际上，table、tr、td、li 跟一般的块级元素有所区别）
           2. 行内元素（inline 常用的行内元素有：img、a、span、b、em、strong、i、label 等。
           3. 行内块元素（inline 常用的行内块元素有：input、select、button 等。
           4.  <a>标签里不可以嵌套<a>、<button>、<select>等；
           5.  <dt>标签里不可以嵌套块元素
           6.  <p>、<h1>-<h6>标签里不可以嵌套<div>、<h1>-<h6>、<p>、<ul>/<ol>/<li>、<dl>/<dt>/<dd>、<form>等。
           7.  尽量少用<br/>元素来控制换行；
           8.  尽量少用<hr/>元素来控制水平线。
       3. 属性
          1. 所有图片必须添加 alt 属性
          2. 所有<a>标签，根据实际情况判断是否需要添加 title 属性；
          3. 需要使用非标签自身属性的，尽量使用 data-xxx 的命名。例如图片懒加载属性：
       4. 价格
           1. 人民币符号需要写成&yen;
       5. 前景图
          1. <img />标签必须闭合
          2. 必须指定图片的显示为 display: block；
          3. 图片宽高确定时，必须显示的设置图片的宽度和高度
       6. ID 和 class
       7. HTML 字符实体
          1. 空格 &nbsp; 
          2. 小于号 &lt; 
          3. 大于号 &gt;
          4. 人民币 &yen;
          5. 版权 &copy;
          6. 商标 &reg;
          7. 乘号 &times;
          8. 和号 &amp;   


