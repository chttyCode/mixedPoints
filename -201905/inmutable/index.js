const { List ,fromJS,Map} = require('immutable');
const data=fromJS([{"cateCd":"3","cateNm":"直接","UV":"1,887,737","UV_RATIO":"4.33%","SX_UV_RATE":"10.54%","SX_UV_RATE_RATIO":"70.86%"},{"cateCd":"1","cateNm":"站内","UV":"1,713,693","UV_RATIO":"-26.75%","SX_UV_RATE":"80.69%","SX_UV_RATE_RATIO":"41.64%"},{"cateCd":"2","cateNm":"站外","UV":"708,807","UV_RATIO":"56.31%","SX_UV_RATE":"51.69%","SX_UV_RATE_RATIO":"52.47%"}])
const result=data.update(0, val =>{
    // console.log(val)
    // val=val.set("cateCd","9")
    val=val.set("child",List(data))
    // val=val.set("expend",true)
    // val=val.set('child',val.get('child').update(0,val=>List([1,23,4])))
    // val=val.setIn(['child', '0'], List([9,0]))
    return val
})
// const result=data.setIn([0,'cateCd'],'9')
console.log(result.getIn([0,'child',0,'cateCd']))
// console.log(result)
// console.log(data)
console.log(data.get(1)===result.get(1))

