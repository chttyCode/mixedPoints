import test from 'tape'
import * as types from './types'
import {addAsync,delay,readAsync} from './saga'
import {readFile} from '../utils'
import {all,takeEvery,put,call,cps} from 'redux-saga/effects'
test('asynctest',function(assert){
    let it = addAsync()
    assert.deepEqual(
        it.next().value,
        call(delay,1000),
        'should return a promise which was delaid  1s'
    )
    assert.deepEqual(
        it.next().value,
        put({type:types.ADD}),
        'should return a promise which was delaid  1s'
    )
    assert.end()
})
test('readfile',function(assert){
    let it = readAsync()
    assert.deepEqual(
        it.next().value,
        cps(readFile,'Readme.md'),
        'should return readme.md'
    )
    assert.deepEqual(
        it.next(),
        {value:undefined,done:true},
        'should down'
    )
    assert.end()
})