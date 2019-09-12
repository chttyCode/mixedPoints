const axios = require('axios')
const ora = require('ora')
const path = require('path')
const inquirer = require('inquirer')
const fs = require('fs')
const metalSmith = require('metalsmith')
//统一的模版引擎
let {render} = require('consolidate').ejs
const {
    promisify
} = require('util')
const {
    donwnLoadDirectory 
} = require('./constants')
//download-git-repo
let downloadGitRepo = require('download-git-repo')
let ncp = require('ncp')


ncp= promisify(ncp)

render= promisify(render)

downloadGitRepo = promisify(downloadGitRepo)
//创建项目


//获取组织项目
const fetchRepoList = async () => {
    let {
        data
    } = await axios.get('https://api.github.com/orgs/zhu-cli/repos')
    return data
}
//获取tags列表
const fetchTags = async (repo) => {
    let {
        data
    } = await axios.get(`https://api.github.com/repos/zhu-cli/${repo}/tags`)
    return data
}
//loading
const waitFnLoading = (fn, message) => async (...args) => {
    let spinner = ora(message) //loading 状态
    spinner.start()
    let repos = await fn(...args)
    spinner.succeed()
    return repos
}
const downLoad = async (repo, tag) => {
    let api = `zhu-cli/${repo}`
    if (tag) {
        api += `#${tag}`
    }
    console.log(api)
    let dest = `${donwnLoadDirectory}/${repo}`
    await downloadGitRepo(api, dest)
    return dest
}

module.exports = async (projectName) => {
    //获取项目模版
    let repos = await waitFnLoading(fetchRepoList, 'fetch template.......')()
    repos = repos.map(item => item.name)
    console.log(repos)
    const {
        repo
    } = await inquirer.prompt({ //选择模版
        name: 'repo',
        type: 'list',
        choices: repos,
        message: 'please choise a template to create project'
    })
    console.log(repo)
    //获取版本号
    //vue-simple-template
    let tags = await waitFnLoading(fetchTags, 'fetch template.......')('vue-simple-template')
    tags = tags.map(item => item.name)
    const {
        tag
    } = await inquirer.prompt({ //选择模版
        name: 'tag',
        type: 'list',
        choices: tags,
        message: 'please choise a tag to create project'
    })
    console.log(tag)

    //down
    // let result = await downLoad(repo, tag)
    let result = await waitFnLoading(downLoad, 'loading.......')(repo,tag)
    console.log(result)
    
    if(!fs.existsSync(path.join(result,'ask.js'))){
        //拿到下载的目录，直接拷贝到当前执行目录 ncp
        await ncp(result,path.resolve(projectName))
    }else{
        //模版渲染再拷贝
        new Promise((resolve,reject)=>{
            metalSmith(__dirname)  //
            .source(result)
            .destination(path.resolve(projectName))
            .use(async(files,metal,done)=>{
                const args = require(path.join(result,'ask.js'))
                const r = await inquirer.prompt(args)
                console.log(r)
                const meta = metal.metadata(r)
                Object.assign(meta,r)
                delete files['ask.js']
                done()
            })
            .use((files,metal,done)=>{
                let obj = metal.metadata()
                Object.keys(files).forEach(async file =>{
                    if(file.includes('js') || file .includes('json')){
                        let content = files[file].contents.toString()
                        if(content.includes('<%')){
                            content = await render(content,obj)
                            files[file].contents = Buffer.from(content)
                        }
                    }
                })
                done()
            })
            .build(err=>{
                if(err){
                    reject(err)
                }else{
                    resolve()
                }
            })
        })
    }

}