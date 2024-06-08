import { orders } from "../data/orders.js"
import { products,loadProductsFetch } from "../data/products.js"
import { Cart } from "../data/cart-class.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js"

const cart = new Cart('cart');

loadProductsFetch().then(()=>{
    renderTracking();
    renderCartQuantity();
});

function renderCartQuantity(){
    document.querySelector('.cart-quantity').innerText=cart.getQuantity();
}

function renderTracking(){
    const url=new URL(window.location);
    const orderId=url.searchParams.get('orderId');
    const productId=url.searchParams.get('productId');
    let matchingProduct;
    let matchingOrder;
    let matchingProductOrderDetails;

    products.forEach((product)=>{
        if(product.id===productId){
            matchingProduct=product
        }
    })
    orders.forEach((order)=>{
        if(order.id===orderId){
            matchingOrder=order
            order.products.forEach((product)=>{
                if(product.productId===matchingProduct.id){
                    matchingProductOrderDetails=product;
                }
            });
        }
    })

    let trackingHTML=`
        <a class="back-to-orders-link link-primary" href="orders.html">
            View all orders
        </a>

        <div class="delivery-date">
            Arriving on ${dayjs(matchingProductOrderDetails.estimatedDeliveryTime).format('dddd, MMMM DD')}
        </div>

        <div class="product-info">
            ${matchingProduct.name}
        </div>

        <div class="product-info">
            Quantity: ${matchingProductOrderDetails.quantity}
        </div>

        <img class="product-image" src="${matchingProduct.image}">

        <div class="progress-labels-container">
            <div class="progress-label">
            Preparing
            </div>
            <div class="progress-label">
            Shipped
            </div>
            <div class="progress-label">
            Delivered
            </div>
        </div>

        <div class="progress-bar-container">
            <div class="progress-bar"></div>
        </div>
    `
    document.querySelector('.order-tracking').innerHTML=trackingHTML;

    const orderPercentage=calculateOrderPercentage(matchingOrder.orderTime,matchingProductOrderDetails.estimatedDeliveryTime)
    document.querySelector('.progress-bar').style.width=`${orderPercentage}%`;

    const progressLabelsList=document.querySelector('.progress-labels-container').children;
    if(orderPercentage<50){
        progressLabelsList[0].classList.add('current-status');
    }
    else if(orderPercentage>=50 && orderPercentage<100){
        progressLabelsList[1].classList.add('current-status');
    }
    else if(orderPercentage>=100){
        progressLabelsList[2].classList.add('current-status');
    }
}


function calculateOrderPercentage(orderTime,deliveryTime){
    const currentTime=dayjs();
    const orderPercentage=((currentTime.diff(dayjs(orderTime)))/(dayjs(deliveryTime).diff(dayjs(orderTime))))*100;
    return orderPercentage;
}