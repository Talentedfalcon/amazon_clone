export let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveToStorage(){
    localStorage.setItem('cart',JSON.stringify(cart));
}

export function addToCart(productId,productCount)
{
    let flag=1;
    cart.forEach(
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
        cart.push({
            id: productId,
            quantity: Number(productCount),
            deliveryOptionId: '1'
        });
    }

    saveToStorage();
}

export function removeFromCart(productId){
    const newCart=[];
    cart.forEach((item)=>{
        if (item.id!==productId){
            newCart.push(item);
        }
    });
    cart=newCart;
    saveToStorage();
}

export function getQuantity(){
    let total=0;
    cart.forEach((item)=>{
        total+=item.quantity;
    });
    return total;
}

export function updateItemQuantity(productId,quantity){
    cart.forEach((item)=>{
        if(item.id===productId){
            item.quantity=quantity;
            return;
        }
    })
    saveToStorage();
}