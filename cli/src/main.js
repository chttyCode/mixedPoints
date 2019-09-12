const {
    version
} = require('./constants')
const path = require('path')
const program = require('commander');
program
    .option('-d, --debug', 'output extra debugging')
    .option('-s, --small', 'small pizza size')
    .option('-p, --pizza-type <type>', 'flavour of pizza');

const mapActions = {
    create: {
        alias: 'c',
        description: 'create a project',
        example: [
            'cli-1 create <project-name>'
        ],
    },
    config: {
        alias: 'conf',
        description: 'config a project variable',
        example: [
            'cli-1 config set <key> <value>'
        ],
    },
    '*': {
        alias: '',
        description: 'command not found',
        example: [],
    }
}

//   program.command('create')
//   .alias('c')
//   .description('create a project')
//   .action(()=>{
//       console.log('create')
//   })
Reflect.ownKeys(mapActions).forEach(action => {
    program.command(action)
        .alias(mapActions[action].alias)
        .description(mapActions[action].description)
        .action((...args) => {
            if (action === '*') {
                console.log(mapActions[action].description)
            } else { 
                //create
                require(path.resolve(__dirname,action))(...args)
            }
        })
})

program.on('--help',() => {
    console.log('\nExamples')
    Reflect.ownKeys(mapActions).forEach(action => {
        mapActions[action].example.forEach(ex=>{
            console.log(ex)
        })
    })
})
program.version(version).parse(process.argv);