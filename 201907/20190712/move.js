// const { exec } = require('child_process');
// const path = require('path')
// // 在当前目录下的scripts文件夹里执行hexo g命令
// exec('ls -l', { cwd: path.join(process.cwd())}, (err, stdout, stderr) => {
//     if(err) {
//         console.log(err);
//         return;
//     }
//     console.log(`stdout: ${stdout}`);
// });

const { execFile } = require('child_process');
const child = execFile('yypt.sh',[],{shell :true}, (error, stdout, stderr) => {
  if (error) {
    throw error;
  }
  console.log(stdout);
});