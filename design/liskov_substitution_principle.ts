export {}
abstract class AbstractDrink {
    abstract getName(): string;
}
class CocaCola extends AbstractDrink {
    getName(): string {
        return '可乐';
    }
}
class Sprite extends AbstractDrink {
    getName(): string {
        return '雪碧';
    }
}
class Fanta extends AbstractDrink {
    getName(): string {
        return '芬达';
    }
}
class Customer {
    drink(drink: AbstractDrink) {
        console.log('喝' + drink.getName());
    }
}
let customer = new Customer();
let cocaCola = new CocaCola();
let sprite = new Sprite();
let fanta = new Fanta();
customer.drink(cocaCola);
customer.drink(sprite);
customer.drink(fanta);