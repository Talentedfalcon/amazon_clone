import { deliveryOptions } from "./deliveryOptions.js";

export class Cart{  
    cartItems;
    #localStorageKey;

    constructor(localStorageKey){
        this.#localStorageKey=localStorageKey;
        this.#loadFromStorage();
    }

    #loadFromStorage(){
        this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey)) || [];
    };

    saveToStorage(){
        localStorage.setItem(this.#localStorageKey,JSON.stringify(this.cartItems));
    };

    addToCart(productId,productCount=1){
        let flag=1;
        this.cartItems.forEach(
            (product)=>{
                if (product.id === productId)
                {
                    product.quantity+=Number(productCount);
                    flag = 0;
                    return;
                }
            }
        )
        if(flag)
        {
            this.cartItems.push({
                id: productId,
                quantity: Number(productCount),
                deliveryOptionId: '1'
            });
        }

        this.saveToStorage();
    };

    removeFromCart(productId){
        const newCart=[];
        this.cartItems.forEach((item)=>{
            if (item.id!==productId){
                newCart.push(item);
            }
        });
        this.cartItems=newCart;
        this.saveToStorage();
    };

    getQuantity(){
        let total=0;
        this.cartItems.forEach((item)=>{
            total+=item.quantity;
        });
        return total;
    };

    updateItemQuantity(productId,quantity){
        this.cartItems.forEach((item)=>{
            if(item.id===productId){
                item.quantity=quantity;
                return;
            }
        })
        this.saveToStorage();
    };

    updateDeliveryOptionId(productId,deliveryOptionId){
        let isUpdated=false;
        let isValidOption=false;
    
        deliveryOptions.forEach((option)=>{
            if(option.id===deliveryOptionId){
                isValidOption=true;
            }
        });
    
        if(isValidOption){
            this.cartItems.forEach((item)=>{
                if(item.id === productId){
                    item.deliveryOptionId=deliveryOptionId;
                    isUpdated=true;
                }
            });
            if(isUpdated){
                this.saveToStorage();
            }
        }
    };
};