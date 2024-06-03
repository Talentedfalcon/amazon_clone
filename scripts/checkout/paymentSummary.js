import { Cart } from "../../data/cart-class.js";
import { products } from "../../data/products.js";
import { deliveryOptions } from "../../data/deliveryOptions.js";
import formatCurrency from "../utils/money.js";

function renderPaymentSummary(localStorageKey){
    const cart=new Cart(localStorageKey);
    
    let totalItems=0;
    let totalPrice=0;
    let shippingCost=0;
    let estimatedTax=0;
    let orderTotal=0;

    cart.cartItems.forEach((item) => {
        let matchingProduct;
        totalItems+=item.quantity;
        products.forEach((product)=>{
            if (item.id===product.id){
                matchingProduct=product;
            }
        });
        totalPrice+=item.quantity*matchingProduct.priceCents
        deliveryOptions.forEach((option)=>{
            if (item.deliveryOptionId===option.id){
                shippingCost+=option.priceCents;
            }
        });
    });
    estimatedTax=(totalPrice+shippingCost)/10;
    orderTotal=estimatedTax+totalPrice+shippingCost;

    const paymentSummaryHTML=`
            <div class="payment-summary-title">
                Order Summary
            </div>

            <div class="payment-summary-row">
                <div>Items (${totalItems}):</div>
                <div class="payment-summary-money">$${formatCurrency(totalPrice)}</div>
            </div>

            <div class="payment-summary-row">
                <div>Shipping &amp; handling:</div>
                <div class="payment-summary-money js-shipping-cost"
                >$${formatCurrency(shippingCost)}</div>
            </div>

            <div class="payment-summary-row subtotal-row">
                <div>Total before tax:</div>
                <div class="payment-summary-money">$${formatCurrency(totalPrice + shippingCost)}</div>
            </div>

            <div class="payment-summary-row">
                <div>Estimated tax (10%):</div>
                <div class="payment-summary-money">$${formatCurrency(estimatedTax)}</div>
            </div>

            <div class="payment-summary-row total-row">
                <div>Order total:</div>
                <div class="payment-summary-money js-order-total">$${formatCurrency(orderTotal)}</div>
            </div>

            <button class="place-order-button button-primary">
                Place your order
            </button>`

    document.querySelector('.payment-summary').innerHTML=paymentSummaryHTML;
}

export default renderPaymentSummary;