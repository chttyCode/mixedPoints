# gitflow

1. git 概念
    - HEAD
    - master
    - branch
2.  pull/push本质
    本质就是commit的合并，pull的本质是fetch&merge
3. merge操作,两种方式，不同在于基点不同
    - git megre
    - git rebase
4. add操作:添加到暂存区
    - add file_name
    - add .
5. commit: 添加到本地仓库

6. 查看
    - git log
    - git log -p
    - git log -state
    - git reflog
    - git show commitId
    - git diff 查看工作目录和暂存区的区别
    - git diff --staged 查看暂存区和上一条commit的区别
    - git diff HEAD 查看工作去和上一条commit的区别
7. 对已提交的操作
    - git commit --amend 重新修改最近一次的commit提交
    - git rebase i HEAD^^ 对很早以前的本地提交做修改
        1. git rebase i HEAD^^进入人机交互界面更改pick=>edit
        2. git commit --amend 对刚edit的commit进行覆盖
        3. git rebase --continue 
8. 直接丢弃的操作
    - git reset HEAD^^:丢弃最新的commit
        1. --hard:重置工作区,不清空暂存区
        2. --soft:保留工作区和暂存区
        3. --mixed(默认) 保留工作区但清空暂存区
    - git rebase  丢弃不是最新的commit
        1. git rebase i HEAD^^ 进入人机交互直接删除
        2. git rebase --onto 目标commit 起点commit 终点commit
9. 对于push上去的错误:还原
    - git revert HEAD^
    - 覆盖式commit
10. 分支切换:原理改变HEAD的指向，不带branch的移动HEAD,reset是带branch的移动
    - git checkout commitId
11. 临时存储工作目录的改动，切换分支切记要临时存储
    - git stash 只存暂存区的内容
    - git stash -u 存暂存和工作区的内容
12. 找回刚删除的branch
    - git reflog
    - git checkout -b branch1
13. 对暂存区的操作
    - git rm --cached file_name
14. 对工作区的撤销
    - git checkout -- file_name
13. 常用命令
    - git branch -a
15. checkout 分支
    - checkout -b 远程分支 ：新建与远程同名分支=>push origin 本地分支名：远程分支名 
    - # 本地分支代码提交到远端库
        git push origin master
        git push origin HEAD:refs/for/远端分支名

        git push origin 本地分支名:refs/for/远端分支名

        eg:
        git push origin test:refs/for/master #本地test分支代码提交到远端master库
    - 在远端服务器新建分支：

        方法1：
        git checkout -b dev
        #建立本地到上游（远端）仓的链接 --这样代码才能提交上去
        git branch --set-upstream-to=origin/dev 
        git branch --set-upstream debug origin/debug //其中debug为创建的分支
        git push origin dev

        #取消对master的跟踪
        git branch --unset-upstream master

        方法2：

        git branch -b stage2
        git push origin 本地分支名:远端分支名xx  // 在服務器新建新分支名xxx

        对比：

        git branch -b stag2
        git push origin stage2:refs/for/stage2 // 代码入庫命令，不会新建新分支在远端
16. 设置GitHub的user name和email
    - 查看设置 git config -l
    - git config --global user.name "Git账号" git config            --global user.email "Git邮箱"
17. 生成一个新的SSH密钥
    - ssh-keygen -t rsa -C "your_email@example.com"
    - eval $(ssh-agent -s)启动后台管理
    - ssh-add /c/Users/17100283/.ssh/id_rsa 将SSH私钥添加到 ssh-agent
    - clip < /c/Users/17100283/.ssh/id_rsa.pub 将公钥添加至git仓库
18. 本地分支建立，与远程分支同步之后，就可以直接使用git pull命令了
    - $ git branch --set-upstream-to=origin/<远端branch_name> <本地branch_name>
    - 将本地dev分支关联到远程dev分支--举例说明
    $ git branch --set-upstream-to=origin/dev dev  
