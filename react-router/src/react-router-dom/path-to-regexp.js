let  pathToRegexp = require("path-to-regexp")

let regexp =  pathToRegexp('/home',[],{end:true})

// /^\/home(?:\/)?$/i

console.log(regexp)
