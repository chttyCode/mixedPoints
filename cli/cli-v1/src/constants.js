const { version } = require('../package.json')

//存储模版的位置


const dowmLoadTemplate = `${process.env[process.platform  === 'darwin'?'HOME':'USERPROFILE']}/.template`
console.log(dowmLoadTemplate)
module.exports={
    version,
    dowmLoadTemplate
}