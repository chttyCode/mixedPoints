function linkedList() {
    var Node = function(ele) {
        this.ele = ele;
        this.next = null;
    }
    var length = 0
    var head = null;  // 用来存储第一个元素的引用

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

    this.append = function(element){
        var node = new Node(element), //{1}
                   current; //{2}
        if (head === null){ // 列表中的第一个节点 //{3}
            head = node;
        } else {
            current = head; //{4}
            //  循环列表直到找到链表的最后一项，        
            while(current.next){
                 current = current.next;
            }
             //   找到链表的最后一项，将其next赋为node，建立连接    
            current.next = node; //{5}
        }
        length++; // 更新链表的长度   //{6}
     };

     // 移除特定位置的元素
    this.removeAt = (pos) => {
        // 检查边界条件
        if (pos > -1 && pos < length) {
            let current = head;  // head指向第一个元素
            let previous = null;  // 存储前一个节点
            let index = 0;  // 计数

            // 移除第一项
            if (pos === 0) {
                head = current.next; // 第二个元素
            } else {
                while (index++ < pos) {
                    previous = current;
                    current = current.next;
                }
                previous.next = current.next; // 将目标删除元素的前一个元素的next指向目标删除元素的后一个元素
            }
            return current.ele;  // 返回要删除节点的值
        } else {
            return null;  // 输入不合法
        }
    }
    this.insert = (pos, ele) => {
        // 首先检测边界值
        if (pos >=0 && pos <= length) {
            const node = new Node(ele);  // 创建节点
            let previous = null;  // 存储前一个节点
            let current = head; // 目标位置节点
            let index = 0;
    
            // 链表的起点插入一个值
            if (pos === 0) {
                node.next = current;
                head = node;
            } else {
                while (index++ < pos) {
                    previous = current;
                    current = current.next;
                }
                node.next = current;
                previous.next = node;
            }
            length++; // 更新链表的长度
            return true; // 插入成功
        } else {
            return false;
        }
    }
    this.toString = () => {
        let current = head;
        let rets = '';
        let index = 0;
        while (current) {
            rets += current.ele;
            current = current.next;
        }
        return rets;
    }
    this.indexOf = (ele) => {
        let current = head;
        let index = -1;
        while (current) {
            if (current.ele === ele) {
                return index++;
            }
            index++;
            current = current.next;
        }
        return index;
    }
    this.remove = (ele) => {
        var pos = this.indexOf(ele); // 返回元素所在的位置
        this.removeAt(pos);
    }
    this.isEmpty = () => {
        return length === 0;
    }
    this.size = () => {
        return length;
    }
}