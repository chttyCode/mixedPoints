//1-1
// class Product {
//     constructor(public name: string, public price: number) {

//     }
//     cost(customer: string) {
//         switch (customer) {
//             case 'member':
//                 return this.price * .8;
//             case 'vip':
//                 return this.price * .6;
//             default:
//                 return this.price;
//         }
//     }
// }
// let p1 = new Product('笔记本电脑', 1000);
// console.log(p1.cost('member'));
// console.log(p1.cost('vip'));
// console.log(p1.cost('guest'));

//扩展性=>对不同的人群，活动进行折扣

class Customer {
    constructor(public rank: string, public discount: number = 1) { }
    getDiscount(){
        return this.discount;
    }
}
class Product {
    constructor(public name: string, public price: number) {

    }
    cost(customer: Customer) {
        return `${this.name}:${this.price * customer.getDiscount()}`
    }
}
let p1 = new Product('笔记本电脑', 1000);

let member = new Customer('member',0.8);
let vip = new Customer('vip',0.6);
let guest = new Customer('guest');
console.log(p1.cost(member));
console.log(p1.cost(vip));
console.log(p1.cost(guest));