 //create 
const axios = require('axios')
const path = require('path')
const fs = require('fs')
const ora = require('ora')
const Inquirer = require('inquirer');
const {dowmLoadTemplate} = require('./constants')
//download-git-repo 不是promise
const {promisify} = require('util')
let downLoadGitRepo = require('download-git-repo')
downLoadGitRepo = promisify(downLoadGitRepo)

let ncp = require('ncp');

ncp = promisify(ncp)

//遍历文件夹
const metalSmith = require('metalsmith')


//统一了所有模版引擎
let {render} = require('consolidate').ejs;

render = promisify(render)


 //拉取项目资源列表  GET /orgs/:org/repos
 const fetchReposList=async ()=>{
    const {data} = await axios.get('https://api.github.com/orgs/chtty-cli/repos')
    return data
}

//封装loading

const waitLoadingFn = (fn,message)=>async(...args)=>{
    const spinner = ora(message)
    spinner.start()
    const result = await fn(...args)
    spinner.succeed()
    return result
}

// GET /repos/:owner/:repo/tags  
//https://api.github.com/repos/chtty-cli/react/tags


const fetchTageList = async (repo)=>{
    const {data} = await axios.get(`https://api.github.com/repos/chtty-cli/${repo}/tags`)
    return data
}

//downLoad

const downLoad = async(repo,tag)=>{
    let api = `chtty-cli/${repo}/`
    if(tag){
        api+=`#${tag}`
    }
    let dest = `${dowmLoadTemplate}/${repo}`
    downLoadGitRepo(api,dest)
    return dest
}

module.exports=async(projectName)=>{
    
    //获取项目所有的项目
    let repos = await waitLoadingFn(fetchReposList,'fetch template ......')()

    repos = repos.map(item=>item.name)

    console.log(repos)
    
    //选择模版
    const {repo} = await Inquirer.prompt({
        name:'repo',
        type:'list',
        message:'please choise a tempalte to create a project',
        choices:repos
    })
    console.log(repo)
    //选择模版
    let tags = await waitLoadingFn(fetchTageList,'fetch tags ......')(repo)
    tags=tags.map(t=>t.name)
    console.log(tags)

    const {tag} = await Inquirer.prompt({
        name:'tag',
        type:'list',
        message:'please choise a tag to create a project',
        choices:tags
    })
    console.log(repo,tag)
    //下载模版
    //下载模版后 放到一个临时目录 以备后期使用
    let resultPath = await waitLoadingFn(downLoad,'download ......')(repo,tag)
    console.log(resultPath)

    //如果有ask.js就是复杂的项目
    console.log(  !fs.existsSync(path.join(resultPath,'ask.js')) )
    if( !fs.existsSync(path.join(resultPath,'ask.js'))){
    //简单的拿到下载目录，直接copy
            //判断这个项目名字是否已经存在
            await ncp(resultPath,path.resolve(projectName))
    }else{
    //复杂的拿到模版之后 渲染到目录
        //模版剖析
        //把git项目下载下来，判断是否有ask.js,如果有则为复杂模版
        //1.让用户填信息
       return  await new Promise((resolve,reject)=>{
            metalSmith(__dirname)//如果传入路径，他会默认遍历当前文件路径下的src文件
            .source(resultPath)
            .destination(path.resolve(projectName))
            .use(async(files,metal,done)=>{
                let args = require(path.resolve(resultPath,'ask.js'))
                let  result = await Inquirer.prompt(args)
                let meta = metal.metadata();
                Object.assign(meta,result)
                delete files['ask.js']
                done()
            })
            .use((files,metal,done)=>{
                //根据用户的输入 下载模版
                //循环
                let data=metal.metadata()
                Reflect.ownKeys(files).forEach(async file=>{
                    if( file.includes('js') || file.includes('json') ){
                        let content = files[file].contents.toString()
                        if(content.includes('<%') ){
                            content = await render(content,data)
                            console.log(content)
                            files[file].contents = Buffer.from(content)
                        }
                    }
                })
                done()
            })
            .build((err)=>{
                if(err){
                    reject()
                }else{
                    resolve()
                }
            })
            //2.用用户信息编译模版
        })
    }
}