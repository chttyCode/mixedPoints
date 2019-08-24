/*
 * @Author: kongds
 * @Date: 2019-08-15 09:10:16
 */
let arr = new Array(1000000).fill(100).map(t=>t*Math.random())
function bubble(arr){
    console.time('冒泡')
    for(let i=0;i<arr.length;i++){
        for(let j=0;j<arr.length-i;j++){
            if(arr[j]>arr[j+1]){
                [arr[j+1],arr[j]]=[arr[j],arr[j+1]]
            }
        }
    }
    console.timeEnd('冒泡')
    return arr
}
function insert(arr){
    console.time('插入排序')
    for(let i=1;i<arr.length;i++){
        let key = arr[i],j=i-1
        while(j>=0&arr[j]>key){
            arr[j+1]=arr[j]
            j--
        }
        arr[j+1]=key
    }
    console.timeEnd('插入排序')
    return arr
}

function select (arr){
    console.time('选择排序')
    for(let i=0;i<arr.length;i++){
        let minIndex=i
        for(let j=i+1;j<arr.length;j++){
            if(arr[j]<arr[minIndex]){
                minIndex=j
            }
        }
        [arr[minIndex],arr[i]]=[arr[i],arr[minIndex]]
    }
    console.timeEnd('选择排序')
    return arr
}

function middleInsert(arr){//改进插入排序： 查找插入位置时使用二分查找的方式
    console.time('二分法排序')
    for (var i = 1; i < arr.length; i++) {
        let value=arr[i],left=0,right=i-1
        while(left<=right){
            let middle=parseInt((left+right)/2)
            if(value>arr[middle]){
                left = middle+1
            }else{
                right = middle-1
            }
        }
        let y=i-1
        while(y>=left){
            arr[y+1]=arr[y]
            y--
        }
        arr[y+1]=value
    }
    console.timeEnd('二分法排序')
    return arr
}

function quickSort(arr,left,right){
    if (arr.length <= 1) { return arr; }

    　　var pivotIndex = Math.floor(arr.length / 2);
    
    　　var pivot = arr.splice(pivotIndex, 1)[0];
    
    　　var left = [];
    
    　　var right = [];
    
    　　for (var i = 0; i < arr.length; i++){
    
    　　　　if (arr[i] < pivot) {
    
    　　　　　　left.push(arr[i]);
    
    　　　　} else {
    
    　　　　　　right.push(arr[i]);
    
    　　　　}
    
    　　}
    　　return quickSort(left).concat([pivot], quickSort(right));
}
// bubble(arr)
// select([...arr])
// insert([...arr])
// middleInsert(arr)
console.time('快排')
quickSort([...arr])
console.timeEnd('快排')