function DoublyLinkedList() {
    var Node = function(ele) {
        this.ele = ele;
        this.prev = null; // 新增的
        this.next = null;
    }
    var length = 0
    var head = null;  // 用来存储第一个元素的引用
    var tail = null;  // 用来存储最后一个元素的引用  新增的

    // 对外暴露的方法
    this.append = (ele) => {};  //添加元素
    this.insert = (pos, ele) => {};  // 向固定位置插入元素
    this.removeAt = (pos) => {};  // 移除固定位置的元素
    this.remove = () => {};    // 移除结尾元素
    this.indexOf = (ele) => {};  // 返回元素所在位置
    this.isEmpty = () => {};  // 链表是否为空
    this.size = () => {};  // 返回链表的长度
    this.toString = () => {}; // 返回
    this.print = () => {};  // 打印链表数据

    this.insert = (pos, ele)=>{
        // 检查边界条件
        if (pos > -1 && pos <= length) {
            let node = new Node(ele);
            let current = head; // 链表第一个节点
            let previous = null;
            let index = 0;
            // 链表首部新增
            if (pos === 0) {
                if(!head) {
                   head = node;
                   tail = node;
                } else {
                    node.next = current;
                    current.prev = node;
                    head = node;
                }
            } else if(pos === length) {  // 最后一项
                current = tail;
                current.next = node;
                node.pre = current;
    
                tail = node; // 更新最后一项
            } else {
                // 中间位置
                while (index++ < pos) {
                    previous = current;
                    current = current.next;
                } 
                previous.next = node;
                node.next = current;
    
                current.prev = node; // 新增
                node.prev = previous;  // 新增
            }
            length++;   // 更新链表长度
            return true;
        } else {
            return false;
        }
    }

    this.removeAt = (pos) => {
        // 检查边界值
        if (pos > -1 && pos <= length) {
            let current = head;
            let previous = null;
            let index = 0;
    
            // 移除第一个元素
            if (pos === 0) {
                head = current.next;
                if(!head){ // 只有一个元素
                    tail = null;
                } else {
                    head.prev = null;
                }
            } else if (pos === length) {
                // 移除最后一个元素
                current = tail;
                tail = current.prev;
                tail.next = null;
            } else {
                // 中间位置
                while (index++<pos) {
                    previous = current;
                    current = current.next; 
                }
                previous.next = current.next;
                current.next.prev = previous;
            }
            length--;   // 更新链表长度
            return true;
        } else {
            return false;
        }
    }
}