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
                if (product.productId === productId)
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
                productId: productId,
                quantity: Number(productCount),
                deliveryOptionId: '1'
            });
        }

        this.saveToStorage();
    };

    removeFromCart(productId){
        const newCart=[];
        this.cartItems.forEach((item)=>{
            if (item.productId!==productId){
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
            if(item.productId===productId){
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
                if(item.productId === productId){
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

export async function loadCartFetch(){
    const response = await fetch('https://supersimplebackend.dev/cart');
    console.log(await response.text());
}

/*export function test_loadCart(fun){
    const xhr = new XMLHttpRequest();
  
    xhr.addEventListener('load',()=>{
      console.log(xhr.response);
      fun();
    })

    xhr.addEventListener('error',(error)=>{
        console.log('Unexpected error. Please try again later');
        console.log(error);
    });
  
    xhr.open('GET','https://supersimplebackend.dev/cart');
    xhr.send();
}*/