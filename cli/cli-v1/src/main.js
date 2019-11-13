const program = require('commander')
const {version} = require('./constants')
const path = require('path')
const mapActions = {
    create:{
        alias:'c',
        description:'create a project',
        examples:[
            'chtty-cli create <project-name>'
        ]
    },
    config:{
        alias:'conf',
        description:'config project varibale',
        examples:[
            'chtty-cli config set <key> <value>'
        ]
    },
    '*':{
        alias:'',
        description:'command not found',
        examples:[]
    }
}


//command
// program.command('create')//命令名称
// .alias('c')//命令别名
// .description('create a project') //命令描述
// .action(...args=>{ //命令动作
//     console.log(args)
// })


Reflect.ownKeys(mapActions).forEach(actionKey=>{
    let {alias,description} = mapActions[actionKey]
    program.command(actionKey)//命令名称
    .alias(alias)//命令别名
    .description(description) //命令描述
    .action(()=>{ //命令动作
        if(actionKey  === '*'){
            console.log(description)
        }else{
            //create/config 
            console.log(description)
            require(path.resolve(__dirname,actionKey))(...process.argv.slice(3))
        }
    }) 
})

//example

program.on('--help',()=>{
    console.log('\nExample')
    Reflect.ownKeys(mapActions).forEach(actionKey=>{
        let {examples} = mapActions[actionKey]
        examples.forEach(example=>{
            console.log(`  ${example}`)
        })
    })
})


program.version(version,'-v,--version').parse(process.argv)