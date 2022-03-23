const Order = require("./Order");

const OrderState = Object.freeze({
    WELCOMING:   Symbol("welcoming"),
    SIZE:   Symbol("size"),
    TOPPINGS:   Symbol("toppings"),
    APPLES: Symbol("apple slices"),
    DRINKS:  Symbol("drinks")
});

module.exports = class FoodieOrder extends Order{
    constructor(){
        super();
        this.stateCur = OrderState.WELCOMING;
        this.sSize = "";
        this.sToppings = "";
        this.sApples = "",
        this.sDrinks = "";
        this.sItem = "poutine";
        this.sPrice = 0;
    }
    handleInput(sInput){
        let aReturn = [];
        switch(this.stateCur){
            case OrderState.WELCOMING:
                this.stateCur = OrderState.SIZE;
                aReturn.push("Welcome to Foodie Booth.");
                aReturn.push("What size would you like? SMALL-$6, MEDIUM-$8, LARGE-$10");
                break;
            case OrderState.SIZE:
                this.stateCur = OrderState.TOPPINGS
                this.sSize = sInput;
                switch(this.sSize.toLowerCase()){
                    case 'small':
                        this.sPrice += 6;
                        break;
                    case 'medium':
                        this.sPrice += 8;
                        break;
                    case 'large':
                        this.sPrice += 10;
                        break;  
                }
                aReturn.push("What toppings would you like? One topping-$2. Please use comma to seperate.");
                break;
            case OrderState.TOPPINGS:
                this.stateCur = OrderState.APPLES
                this.sToppings = sInput;
                this.sPrice += this.sToppings.split(",").length * 2;
                aReturn.push("How many Apple Slices would you like? One Apple Slice-$1.5");
                break;
            case OrderState.APPLES:
                this.stateCur = OrderState.DRINKS
                if(sInput != 0){
                    this.sApples = sInput;
                    this.sPrice += this.sApples * 1.5;
                }
                aReturn.push("Would you like drinks with that? One drink-$1");
                break;
            case OrderState.DRINKS:
                this.isDone(true);
                if(sInput.toLowerCase() != "no"){
                    this.sDrinks = sInput;
                    this.sPrice += 1;
                }
                aReturn.push("Thank-you for your order of");
                aReturn.push(`${this.sSize} ${this.sItem} with ${this.sToppings}`);
                if(this.sApples){
                    aReturn.push(`${this.sApples} Apple Slices`);
                }
                if(this.sDrinks){
                    aReturn.push(this.sDrinks);
                }
                aReturn.push(`The total price(with 13% tax):$${(this.sPrice * 1.13).toFixed(2)}`);
                let d = new Date(); 
                d.setMinutes(d.getMinutes() + 20);
                aReturn.push(`Please pick it up at ${d.toTimeString()}`);
                break;
        }
        return aReturn;
    }
}