/*
 * @Author: kongds
 * @Date: 2019-08-13 14:51:58
 */


//bubble sort
function bubbleSort(arr){
    for(let i=0;i<arr.length-1;i++){
        for(let j=0;j<arr.length-i;j++){
            if(arr[j]>arr[j+1]){
                [arr[j+1],arr[j]]=[arr[j],arr[j+1]]
            }
        }
    }
    return arr
}

/**
 * n个记录的直接选择排序可经过n-1趟直接选择排序得到有序结果。具体算法描述如下：
    <1>.初始状态：无序区为R[1..n]，有序区为空；
    <2>.第i趟排序(i=1,2,3...n-1)开始时，当前有序区和无序区分别为R[1..i-1]和R(i..n）。该趟排序从当前无序区中-选出关键字最小的记录 R[k]，将它与无序区的第1个记录R交换，使R[1..i]和R[i+1..n)分别变为记录个数增加1个的新有序区和记录个数减少1个的新无序区；
    <3>.n-1趟结束，数组有序化了。
 */

function selectionSort(arr) {
    var len = arr.length;//无序区长度
    var minIndex, temp;
    console.time('选择排序耗时');
    for (var i = 0; i < len; i++) {
        minIndex = i;
        for (var j = i + 1; j < len; j++) {
            if (arr[j] < arr[minIndex]) {     //寻找最小的数
                minIndex = j;                 //将最小数的索引保存
            }
        }
        temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;
    }
    console.log(arr)
    console.timeEnd('选择排序耗时');
    return arr;
}
selectionSort(arr)

/**
 * 一般来说，插入排序都采用in-place在数组上实现。具体算法描述如下：

    <1>.从第一个元素开始，该元素可以认为已经被排序；
    <2>.取出下一个元素，在已经排序的元素序列中从后向前扫描；
    <3>.如果该元素（已排序）大于新元素，将该元素移到下一位置；
    <4>.重复步骤3，直到找到已排序的元素小于或者等于新元素的位置；
    <5>.将新元素插入到该位置后；
    <6>.重复步骤2~5。
 */

let arr = [20,3,5,4]
// 20 20 5 4 y=0-1
// 3 20 5 4 y=-1

//  i=2 y=1 3 20 20 4 =>y-1 3 5 20 4
// i =3 y=2   3 5 5 20
function insertionSort(array) {
    if (Object.prototype.toString.call(array).slice(8, -1) === 'Array') {
        console.time('插入排序耗时：');
        for (var i = 1; i < array.length; i++) {
            var key = array[i];
            var j = i - 1;  // j ==  0
            while (j >= 0 && array[j] > key) {
                array[j + 1] = array[j];
                j--;
            }
            array[j + 1] = key;
        }
        console.timeEnd('插入排序耗时：');
        return array;
    } else {
        return 'array is not an Array!';
    }
}