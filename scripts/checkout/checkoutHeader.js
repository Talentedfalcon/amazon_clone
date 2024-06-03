import { Cart } from "../../data/cart-class.js";

function renderCheckoutHeader(localStorageKey){
    const cart=new Cart(localStorageKey);

    const headerMiddle=document.querySelector('.checkout-header-middle-section');
    const headerMiddleHTML=`
            Checkout (<a class="return-to-home-link"
            href="amazon.html">${cart.getQuantity()} items</a>)`
    headerMiddle.innerHTML=headerMiddleHTML;    
}

export default renderCheckoutHeader;