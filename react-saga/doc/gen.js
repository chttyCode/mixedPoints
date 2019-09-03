function* gen (){
    console.log(0)
    let a = yield '1'
    console.log(a)
    let b = yield '2'
}
let it = gen()


it.next()
it.next(1)