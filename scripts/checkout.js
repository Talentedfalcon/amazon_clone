import renderOrderSummary from "./checkout/orderSummary.js";
import renderPaymentSummary from "./checkout/paymentSummary.js";
import renderCheckoutHeader from "./checkout/checkoutHeader.js";
import { loadProductsFetch } from "../data/products.js";
import { test_loadCart } from "../data/cart-class.js";

Promise.all([
    loadProductsFetch(),
    new Promise((resolve)=>{
        test_loadCart(()=>{
            resolve();
        });
    })
]).then(()=>{
    renderCheckoutHeader('cart');
    renderOrderSummary('cart');
    renderPaymentSummary('cart');
});

/*new Promise((resolve)=>{
    loadProducts(()=>{
        resolve('value1');
    });
}).then((value)=>{
    console.log(value);
    return new Promise((resolve)=>{
        loadCart(()=>{
            resolve('value2');
        });
    });
}).then((value)=>{
    console.log(value);
    renderCheckoutHeader('cart');
    renderOrderSummary('cart');
    renderPaymentSummary('cart');
})*/

/*loadProducts(()=>{
    loadCart(()=>{    
        renderCheckoutHeader();
        renderOrderSummary();
        renderPaymentSummary();
    });
})*/