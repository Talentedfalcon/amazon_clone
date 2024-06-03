import renderOrderSummary from "./checkout/orderSummary.js";
import renderPaymentSummary from "./checkout/paymentSummary.js";
import renderCheckoutHeader from "./checkout/checkoutHeader.js";

renderCheckoutHeader('cart');
renderOrderSummary('cart');
renderPaymentSummary('cart');