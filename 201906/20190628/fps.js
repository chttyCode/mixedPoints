var then = Date.now()
var count = 0

function nextFrame(){
  requestAnimationFrame(function(){
    count ++
    if(count % 20 === 0){
      var time = (Date.now() - then) / count
      var ms = Math.round(time*1000) / 1000
      var fps = Math.round(100000/ms) / 100
      console.log(`count: ${count}\t${ms}ms/frame\t${fps}fps`)
    }
    nextFrame()
  })
}
nextFrame()