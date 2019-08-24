const fs = require('fs');

const path = require('path')

function someAsyncOperation(callback) {
  // Assume this takes 95ms to complete
  fs.readFile(path.join(__dirname,'pool.txt'), () => {
    const startCallback = Date.now();
  
    // do something that will take 10ms...
    while (Date.now() - startCallback < 10) {
      console.log('do nothing one')
      // do nothing
    }
    process.nextTick(()=>{
        console.log('nexttick')
    })
    Promise.resolve().then(()=>{
        console.log('Promise')
    })
  });
  fs.readFile(path.join(__dirname,'pool.txt'), () => {
    const startCallback = Date.now();
  
    while (Date.now() - startCallback < 10) {
      console.log('do nothing two')
    }
  });
  fs.readFile(path.join(__dirname,'pool.txt'), () => {
    const startCallback = Date.now();
  
    while (Date.now() - startCallback < 10) {
      console.log('do nothing three')
    }
  });
  fs.readFile(path.join(__dirname,'pool.txt'), () => {
    const startCallback = Date.now();
  
    while (Date.now() - startCallback < 10) {
      console.log('do nothing 4')
    }
  });
  fs.readFile(path.join(__dirname,'pool.txt'), () => {
    const startCallback = Date.now();
  
    while (Date.now() - startCallback < 10) {
      console.log('do nothing 5')
    }
  });
  fs.readFile(path.join(__dirname,'pool.txt'), () => {
    const startCallback = Date.now();
  
    while (Date.now() - startCallback < 10) {
      console.log('do nothing 6')
    }
  });
}

const timeoutScheduled = Date.now();

setTimeout(() => {
  const delay = Date.now() - timeoutScheduled;
  console.log(`${delay}ms have passed since I was scheduled`);
}, 100);


// do someAsyncOperation which takes 95 ms to complete
someAsyncOperation();
setImmediate(()=>{
    console.log('setImmediate')
})