import renderOrderSummary from "./checkout/orderSummary.js";
import renderPaymentSummary from "./checkout/paymentSummary.js";
import renderCheckoutHeader from "./checkout/checkoutHeader.js";
import '../data/backend-practice.js';

renderCheckoutHeader('cart');
renderOrderSummary('cart');
renderPaymentSummary('cart');