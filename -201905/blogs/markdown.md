## markdown语法

> - Markdown是一种轻量级标记语言，创始人为约翰·格鲁伯（英语：John Gruber）。它允许人们“使用易读易写的纯文本格式编写文档，然后转换成有效的XHTML（或者HTML）文档

1. 标题
2. 锚点
3. 引用
4. 列表
5. 代码
6. 强调
7. 自动链接
8. 表格
9. 分割线
10. 图片
11. 流程图
12. 时序图
13. 甘特图
  
### 1.标题

```html
# 一级标题
## 二级标题
### 三级标题
#### 四级标题
##### 五级标题
###### 六级标题
```

### 2.锚点
>Coding 会针对每个标题，在解析时都会添加锚点 id，如

```html
# 锚点
```
### 3.引用

- 引用
>Markdown 标记区块引用和 email 中用 『>』的引用方式类似，只需要在整个段落的第一行最前面加上 『>』 

- 区块引用
>区块引用可以嵌套，只要根据层次加上不同数量的『>』：

```html
> 这是第一级引用。
>
> > 这是第二级引用。
>
> 现在回到第一级引用。
```

### 4.列表

- 无序列表：使用星号、加号或是减号作为列表标记
  
```html
- Red
- Green
- Blue
```

- 有序列表：使用数字接着一个英文句点
  
```html
1. Red
2. Green
3. Blue
```

- 如果要在列表项目内放进引用，那『>』就需要缩进：

```html
*  Coding.net有以下主要功能:
    > 代码托管平台
    > 在线运行环境    
    > 代码质量监控    
    > 项目管理平台
```

- 代办列表: 表示列表是否勾选状态（注意：[ ] 前后都要有空格）
  
```html
- [ ] 不勾选
- [x] 勾选
```

### 5.代码

>只要把你的代码块包裹在 “` 之间，你就不需要通过无休止的缩进来标记代码块了。 在围栏式代码块中，你可以指定一个可选的语言标识符，然后我们就可以为它启用语法着色了。 举个例子，这样可以为一段 javascript 代码着色：

```html
    ```js
    import React, { Component } from 'react';
    import { connect } from 'react-redux';
    import styled from 'styled-components';
    import moment from 'moment';
    ```
```

### 6.强调

>在Markdown中，可以使用 * 和  _  来表示斜体和加粗。

```html
*Coding，让开发更简单*
_Coding，让开发更简单_
```

### 7.自动链接

>方括号显示说明，圆括号内显示网址， Markdown 会自动把它转成链接，例如：

```html
 [超强大的云开发平台Coding](http://coding.net)
```

### 8.表格

>在 Markdown 中，可以制作表格，例如：

```html
First Header | Second Header | Third Header
------------ | ------------- | ------------
Content Cell | Content Cell  | Content Cell
Content Cell | Content Cell  | Content Cell
```
- eg:

First Header | Second Header | Third Header
------------ | ------------- | ------------
Content Cell | Content Cell  | Content Cell
Content Cell | Content Cell  | Content Cell

>或者也可以让表格两边内容对齐，中间内容居中，例如：

```html
First Header | Second Header | Third Header
:----------- | :-----------: | -----------:
Left         | Center        | Right
Left         | Center        | Right
```

- eg:

First Header | Second Header | Third Header
:----------- | :-----------: | -----------:
Left         | Center        | Right
Left         | Center        | Right

### 9.分割线

>在 Markdown 中，可以使用 3 个以上『-』符号制作分割线，例如：

```html
这是分隔线上部分内容
---
这是分隔线上部分内容
```
- eg

这是分隔线上部分内容
---
这是分隔线上部分内容

### 10.图片

>Markdown 使用了类似链接的语法来插入图片

```html
![Alt text](/path/to/img.jpg)
或
![Alt text](/path/to/img.jpg "Optional title")
```

### 11.流程图

### 12.时序图

### 13.甘特图