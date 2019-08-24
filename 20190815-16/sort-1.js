/*
 * @Author: kongds
 * @Date: 2019-08-16 19:56:54
 */
// 冒泡
function bubble(arr){
    for(let i = 0 ; i < arr.length ;i++){
        for(let j= 0; j<arr.length-i;j++){
            if(arr[j+1]>arr[j]){
                [arr[j],arr[j+1]] = [arr[j+1],arr[j]]
            }
        }
    }
}
// 选择

function select(arr){
    for(let i=0;i<arr.length;i++){
        let minIndex = i
        for(let j=i+1;j<arr.length;j++){
            if(arr[j] < arr[i] ){
                minIndex = j
            }
        }
        [arr[minIndex],arr[i]]=[arr[i],arr[minIndex]]
    }
}

//插入排序

function insert(arr){
    for(let i = 1 ;i < arr.length ;i++){
        let j=i-1,value=arr[i]
        while(j>=0&&value<arr[i]){
            arr[j+1]=arr[j]
            j--
        }
        arr[j+1]=value
    }
}

//快排

function quick(arr){
    if(arr.length<=1)return arr
    let pivotIndex = Math.floor(arr.length/2)
    let left=[]
    let right = []
    for(let i=0;i<arr.length;i++){
        if(arr[i]>arr[pivotIndex]){
            right.push(arr[i])
        }else{
            left.push(arr[i])
        }
    }
    　return quickSort(left).concat([pivot], quickSort(right));
}
