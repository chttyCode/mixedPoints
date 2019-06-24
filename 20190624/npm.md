# npm

##  1. npm 处理node_module

1. npm 2.x - 嵌套结构
   1. 每个包都会把自己的依赖down到自己目录下维护
       - 优点：结构清晰，兼容性好，好维护
       - 缺点：代码冗余，结构嵌套太深
2. npm 3.x - 扁平结构
    1. 将所有的包安装以node_module为根目录的下方，遇到新的包就把它安装在第一级目录，后续安装如果遇到一级目录已经存在的包，会先按照约定版本判断版本，如果符合版本约定则忽略，否则会按照npm 2.x的方式依次挂在依赖包目录下。
3. npm 5.x - package-lock.json
    1. 依然采用扁平结构
    2. npm中的package.json只锁定大版本，所以协同开发时可能会存在包不一致的问题，所以新增精确描述文件package-lock.json
        - version:包唯一的版本号
        - resolved:安装源
        - integrity:表明包的完整性hash值
        - dev：如果为true，则此依赖关系仅是顶级模块的开发依赖关系或者是一个的传递依赖关系
        - requires：依赖包所需要的所有依赖项，对应依赖包package.json里dependencies中的依赖项
        - dependencies：依赖包node_modules中依赖的包

##  2. npm 中包的依赖

1. 依赖包分类
   1. dependencies
   2. devDependencies 
2. 版本号
   1. npm采用了semver规范作为依赖版本管理方案。主版本号.次版本号.修订号（x.y.z）
   2. 常见的几个版本格式如下
      1. "1.2.3" 精确版本
      2. "^1.2.3"表示兼容补丁和小版本更新
      3. "~1.2.3"表示只兼容补丁更新
      4. alpha(α)：预览版
      5. beta(β)：测试版
      6. rc(release candidate)：最终测试版本 
3. 包管理
   1. 在大版本相同的前提下package.json与package-lock.json中的版本号以高版本为主
   2. 大版本不相同时以package.json为主，更新package-lock.json
   3. package.json有package-lock.json无，则依据package.json更新package-lock.json，package.json无package-lock.json有，则依据package.json删除package-lock.json
##  3. npm script脚本

1.  scripts 字段可以用来自定义脚本命令，它的每一个属性，对应一段脚本
    1. package.json 中的 bin 字段  