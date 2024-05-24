import { getQuantity } from "../../data/cart.js";

function renderCheckoutHeader(){
    const headerMiddle=document.querySelector('.checkout-header-middle-section');
    const headerMiddleHTML=`
            Checkout (<a class="return-to-home-link"
            href="amazon.html">${getQuantity()} items</a>)`
    headerMiddle.innerHTML=headerMiddleHTML;    
}

export default renderCheckoutHeader;