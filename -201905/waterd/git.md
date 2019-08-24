# git
- ssh-keygen
- ssh-keygen -t rsa -C "youremail@example.com"
- cat ~/.ssh/id_rsa.pub

- push passsword setting

    git config credential.helper store:密码一明文方式保存在本地

- git branch name&&git checkout name

- git checkout -b name :创建并切换至name分支

- git branch -d name ：删除name分支

- git push origin -d brand_name:删除远程分支

- push origin branch_name 如果当前分支是一个本地创建的分支，需要指定远程仓库名和分支名

- git branch -a :查看所有分支

- git merge brand_name

- git merge --abort 放弃冲突，取消merge

- git checkout -b books

- git push origin books

- git pull :review代码
- git chekcout books :review代码

- git checkout master
- git pull # merge 之前 pull 一下，让 master 更新到和远程仓库同步
- git merge books
- git push
- git branch -d books
- git push origin -d books # 用 -d 参数把远程仓库的 branch 也删了

- git log 查看历史记录

- git log -p 可以看到每一个 commit 的每一行改动，所以很适合用于代码 review

- git log --stat 查看简要统计

- git show 查看当前commit具体信息

- git show id 查看任意commit具体信息

- git diff --staged 比对暂存区和上一条提交

- git diff 比对工作目录和暂存区

- git diff HEAD|[commitId] 比对工作目录和上一条提交

- git rebase 目标基础点

- 需要说明的是，rebase 是站在需要被 rebase 的 commit 上进行操作，这点和 merge 是不同的

- 注意不要在master上进行rebase这样会造成本地和远程的commits丢失，最终导致push失败

- git commit --amend

- git rebase -i HEAD^^ ：有两个「偏移符号」： ^ 和 ~  pick 修改成 edit 进入要修改的commit

- git commit --amend 修改本次的commit

- git rebase --continue 继续 rebase 过程

- git reset --hard 目标commit ：内容是撤销最新的提交

-  git rebase -i HEAD^^ ：不是最新的提交，就不能用 reset --hard 来撤销了

- git push origin branch1 -f

- git revert HEAD^

- git stash 

- git stash pop

- git stash list

- git stash apply stash@{0}

- git stash drop stash@{0}

