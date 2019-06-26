class Node{
    constructor(ele){
        this.ele=ele
        this.next=null
    }
}
class LinkList {
    constructor(){
        this.length=0
        this.head=null
    }
    append(ele){
        let node = new Node(ele),current
        if(this.head === null){
            this.head=node
        }else{
            current=head
            while(current.next){
                current=current.next
            }
            current.next=node
        }
        this.length++
    }
    remove(ops){
        if(ops>-1&&ops<this.length){
            let current = this.head
            ,pre=null
            ,index=0
            if(ops === 0){
                this.head = current.next 
            }else{
                while(index++<ops){
                    pre=current
                    current=current.next
                }
                pre.next=current.next
            }
            return current.ele
        }else{
            return null
        }
    }
    insert(ops,ele){
        if(ops>-1&&ops<=this.length){
            let node = new Node(ele)
            ,pre=null
            ,current=this.head
            ,index=0
            if(ops===0){
                nodex.next=current
                this.head=node
            }else{
                while(index++<ops){
                    pre=current
                    current=current.next
                }
                node.next=current
                pre.next=node
            }
            this.length++
            return true
        }else{
            return false
        }
    }
    toString(){
        let current = this.head
        ,result= ''  
        ,index = 0
        while(current){
            result+=current.ele
            current=current.next
        }
        return result
    }
    indexOf(ele){
        let current=this.head
        ,index=-1
        while(current){
            if(current.ele === ele){
                return index++
            }
            index++
            current=current.next
        }
        return index
    }
    isEmpty(){
        return this.length === 0
    }
    size(){
        return this.length
    }
}