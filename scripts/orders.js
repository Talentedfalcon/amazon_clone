import { orders } from "../data/orders.js";
import { formatCurrency } from "./utils/money.js";
import { Cart } from "../data/cart-class.js"
import { products,loadProductsFetch } from "../data/products.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

const cart=new Cart('cart')

loadProductsFetch().then(()=>{
    renderOrders();
    renderCartQuantity();
})

function renderCartQuantity(){
    document.querySelector('.cart-quantity').innerText=cart.getQuantity();
}

function renderOrders(){
    const orderGridElement=document.querySelector('.orders-grid');
    let orderContainerHTML=``;
    orders.forEach((order) => {
        orderContainerHTML+=`
            <div class="order-container">
                <div class="order-header">
                    <div class="order-header-left-section">
                        <div class="order-date">
                            <div class="order-header-label">Order Placed:</div>
                            <div>${dayjs(order.orderTime).format('MMMM D')}</div>
                        </div>
                        <div class="order-total">
                            <div class="order-header-label">Total:</div>
                            <div>$${formatCurrency(order.totalCostCents)}</div>
                        </div>
                    </div>
                    <div class="order-header-right-section">
                        <div class="order-header-label">Order ID:</div>
                        <div>${order.id}</div>
                    </div>
                </div>

                <div class="order-details-grid">
        `;
        order.products.forEach((product)=>{
            let matchingProduct;
            products.forEach((item)=>{
                if(product.productId === item.id){
                    matchingProduct=item
                }
            })

            orderContainerHTML+=`
                <div class="product-image-container">
                    <img src="${matchingProduct.image}">
                </div>

                <div class="product-details">
                    <div class="product-name">
                        ${matchingProduct.name}
                    </div>
                    <div class="product-delivery-date">
                        Arriving on: ${dayjs(product.estimatedDeliveryTime).format('MMMM D')}
                    </div>
                    <div class="product-quantity">
                        Quantity: ${product.quantity}
                    </div>
                        <button class="buy-again-button button-primary"
                            data-product-id="${product.productId}"
                        >
                            <img class="buy-again-icon" src="images/icons/buy-again.png">
                            <span class="buy-again-message">Buy it again</span>
                        </button>
                </div>

                <div class="product-actions">
                    <a href="tracking.html?orderId=${order.id}&productId=${product.productId}">
                        <button class="track-package-button button-secondary">
                        Track package
                        </button>
                    </a>
                </div>
            `;
        });
        orderContainerHTML+=`
                </div>
            </div>
        `;
    });
    orderGridElement.innerHTML=orderContainerHTML;

    document.querySelectorAll('.buy-again-button').forEach((button)=>{
        button.addEventListener('click',()=>{
            cart.addToCart(button.dataset.productId);
            renderCartQuantity();
        });
    });
}