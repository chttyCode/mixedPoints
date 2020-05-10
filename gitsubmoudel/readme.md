# submodule

- 配置
  - ssh
    - 个人ssh vs 项目ssh
  - 指定远程仓库 git remote add origin 远端仓库地址
  - 指定分支 git push -u origin master
- submodule理念
  - 在一个仓库引用另外一个仓库
  - 子模块
  - vs 私包
    - 频繁更新私包的代价比较高
- submodule一般操作
  - parent: <https://github.com/chttyCode/parent.git>
  - submodule: <https://github.com/chttyCode/submodule.git>
  - 增加子模块
    - git submodule add https://github.com/chttyCode/submodule.git
    - 提交点问题
      - 子模块正常更新操作父模块无法感知
      - 父模块主动pull
        - 进入子模块pull
        - 在父模块pull  git submodule foreach git pull(远端仓库还无感知，需push)
        - 命令配置
          - git config --global alias.pullall '!git pull && git submodule update --init --recursive'
          - git config --global alias.pullall '!f(){ git pull "$@" && git submodule update --init --recursive; }; f'
            - <https://www.itranslater.com/qa/details/2129219302057313280>
        - subtree
- submodule项目clone
  - 依次进入子项目进行clone
  - '-- recursive'
- submodule 删除（配置文件不过暂存区）
  - git rm --cached sumodule
  - rf -rf submodule
  - git commit 将删除信息推到本地仓库
  - git push 同步远端仓库
- submodule操作
  - 单向操作
    - 建议单向
  - 双向操作
    - 简化操作
    - submodule的修改同步到parent
    - parent修改submodule同步到远端submodule
    - git subtree -P, --prefix ...      the name of the subdir to split out
      1. git remote add subtree-origin [远端仓库地址](https://github.com/chttyCode/submodule.git) 设置subtree-origin变量指向子模块仓库
      2. git subtree add -P subtree  subtree-origin master(指定子工程对应的地址和分支)
         1. --squash  merge subtree changes as a single commit(容易冲突)
         2. git subtree pull -p subtree-origin master
         3. git subtree push -P subtree-origin master