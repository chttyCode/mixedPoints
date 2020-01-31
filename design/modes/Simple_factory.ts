export {}
abstract class Coffee {
    constructor(public name: string) {

    }
}
class AmericanoCoffee extends Coffee {
    constructor(public name: string) {
        super(name);
    }
}
class LatteCoffee extends Coffee {
    constructor(public name: string) {
        super(name);
    }
}
class CappuccinoCoffee extends Coffee {
    constructor(public name: string) {
        super(name);
    }
}
//工厂产出实例=>如果产品的种类非常多switch case的判断会变得非常多=>违反开闭原则
class Cafe {
    static order(name: string) {
        switch (name) {
            case 'Americano':
                return new AmericanoCoffee('美式咖啡');
            case 'Latte':
                return new LatteCoffee('拿铁咖啡');
            case 'Cappuccino':
                return new CappuccinoCoffee('卡布奇诺');
            default:
                return null;
        }
    }
}
console.log(Cafe.order('Americano'));
console.log(Cafe.order('Latte'));
console.log(Cafe.order('Cappuccino'));