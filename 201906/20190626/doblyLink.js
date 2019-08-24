class Node{
    constructor(ele){
       this.ele=ele
       this.next=null
       this.pre=null
    }
}
class DoublyLink{
    constructor(){
        this.length=0
        this.head=null
        this.tail=null
    }
    insert(ops,ele){
        if(ops>-1&&ops<=this.length){
            let node = new Node(ele)
            ,current=this.head
            ,pre=null
            ,index=0
            if(ops === 0){
                if(!current){
                    this.head=node
                    this.tail=node
                }else{
                    node.next=current
                    current.pre=node
                    this.head=node
                }
            }else if(ops === this.length){
                current=this.tail
                current.next=node
                node.pre=current
                this.tail=node
            }else{
                while(index++<ops){
                    pre=current
                    current=current.next
                }
                pre.next=node
                node.next=current

                current.pre=node
                node.pre=pre
            }
            this.length++
            return true
        }else{
            return false
        }
    }

    removeAt(ops){
        if(ops>-1&&ops<=this.length){
            let current=this.head
            ,pre=null
            ,index=0
            if(ops === 0){
                this.head=current.next
                if(!this.head){
                    this.tail=null
                }else{
                    this.head.pre=null
                }
            }else if(ops === this.length){
                current=this.tail
                this.tail=current.pre
                this.tail.next= null
            }else{
                while(index++<ops){
                    pre=current
                    current=current.next
                }
                pre.next=current.next
                current.next.pre=pre
            }
            this.length--
            return true
        }else{
            return false
        }
    }
}

let list = new DoublyLink(),a={name:'李四',value:1234},b={name:'张三',value:123}
list.insert(0,a)
list.insert(0,b)
console.log(list)
console.log(list.head)
console.log(list.head.next)