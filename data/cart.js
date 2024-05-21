export const cart = [
    {
        id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 3
    },
    {
        id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 2
    }
];

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
            quantity: Number(productCount)
        });
    }

    // localStorage.setItem('cart',JSON.stringify(cart));
}