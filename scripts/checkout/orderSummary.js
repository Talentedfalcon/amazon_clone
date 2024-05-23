import { cart,removeFromCart,getQuantity,updateItemQuantity,updateDeliveryOptionId } from '../../data/cart.js';
import { products } from '../../data/products.js';
import formatCurrency from '../utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions } from '../../data/deliveryOptions.js';
import renderPaymentSummary from './paymentSummary.js';

function renderOrderSummary(){
    let cartSummaryHTML = '';

    cart.forEach(
        (item)=>{
            const productId=item.id;
            let matchingProduct;
            products.forEach((product)=>{
                if(product.id===productId)
                {
                    matchingProduct=product
                    return
                }
            })

            let deliveryOption;

            deliveryOptions.forEach((option)=>{
                if(option.id === item.deliveryOptionId){
                    deliveryOption=option;
                }
            })

            cartSummaryHTML+=`
                    <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
                        <div class="delivery-date">
                            Delivery date: ${dateCalculate(deliveryOption)}
                        </div>

                        <div class="cart-item-details-grid">
                            <img class="product-image"
                            src="${matchingProduct.image}">

                            <div class="cart-item-details">
                            <div class="product-name">
                                ${matchingProduct.name}
                            </div>
                            <div class="product-price">
                                $${formatCurrency(matchingProduct.priceCents)}
                            </div>
                            <div class="product-quantity">
                                <span>
                                Quantity: <span class="quantity-label">${item.quantity}</span>
                                </span>
                                <span class="update-quantity-link link-primary" data-product-id="${matchingProduct.id}">
                                Update
                                </span>
                                <input class="quantity-input invisible"/>
                                <span class="save-quantity-link link-primary invisible">Save</span>
                                <span class="delete-quantity-link link-primary" data-product-id="${matchingProduct.id}">
                                Delete
                                </span>
                            </div>
                            </div>

                            <div class="delivery-options">
                            <div class="delivery-options-title">
                                Choose a delivery option:
                            </div>
                                ${deliveryOptionsHTML(matchingProduct,item)}
                            </div>
                        </div>
                    </div>`;
        }
    );

    function dateCalculate(option){
        let today=dayjs();
        const deliveryDate=today.add(option.deliveryDays,'day');
        const dateString=deliveryDate.format('dddd, MMMM D');
        return dateString;
    }

    document.querySelector('.order-summary').innerHTML=cartSummaryHTML;

    document.querySelectorAll('.delete-quantity-link').forEach(
        (link)=>{
            link.addEventListener('click',()=>{
                const productId = link.dataset.productId;
                removeFromCart(productId);
                const container=document.querySelector(`.js-cart-item-container-${productId}`);
                container.remove();
                updateCartQuantity();
                renderPaymentSummary();
            })
        }
    )

    document.querySelectorAll('.update-quantity-link').forEach(
        (link)=>{
            link.addEventListener('click',()=>{
                const productId=link.dataset.productId;
                const input=document.querySelector(`.js-cart-item-container-${productId} .quantity-input`);
                const updateButton=document.querySelector(`.js-cart-item-container-${productId} .save-quantity-link`);
                const quantityLabel=document.querySelector(`.js-cart-item-container-${productId} .quantity-label`);
                input.value=quantityLabel.innerHTML;
                input.addEventListener('keydown',(event)=>{
                    if(event.key==='Enter'){
                        updateButton.click();
                    }
                    renderPaymentSummary();
                })
                updateButton.addEventListener('click',()=>{
                    if(Number(input.value)===0){
                        document.querySelector(`.js-cart-item-container-${productId} .delete-quantity-link`).click();
                    }
                    updateItemQuantity(productId,Number(input.value));
                    quantityLabel.innerHTML=Number(input.value);
                    updateButton.classList.add('invisible');
                    input.classList.add('invisible');
                    quantityLabel.classList.remove('invisible');
                    link.classList.remove('invisible');
                    updateCartQuantity();
                    renderPaymentSummary();
                });
                quantityLabel.classList.add('invisible');
                link.classList.add('invisible');
                updateButton.classList.remove('invisible');
                input.classList.remove('invisible');
            })
        }
    )

    function updateCartQuantity(){
        document.querySelector('.return-to-home-link').innerHTML=`${getQuantity()} items`;
    }
    updateCartQuantity();

    function deliveryOptionsHTML(matchingProduct,item){
        let html = '';
        deliveryOptions.forEach((option)=>{
            const dateString=dateCalculate(option)
            const priceString=option.priceCents===0?'FREE':`$${formatCurrency(option.priceCents)} -`;
            const isChecked = option.id === item.deliveryOptionId;
            html+=`
                <div class="delivery-option js-delivery-option"
                    data-product-id="${matchingProduct.id}"
                    data-delivery-option-id="${option.id}">
                    <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}"
                    ${isChecked ? 'checked' : ''}>
                    <div>
                        <div class="delivery-option-date">
                            ${dateString}
                        </div>
                        <div class="delivery-option-price">
                            ${priceString} Shipping
                        </div>
                    </div>
                </div>`
        });

        return html;
    }

    document.querySelectorAll('.js-delivery-option').forEach((element)=>{
        element.addEventListener('click',()=>{
            const { productId,deliveryOptionId } = element.dataset;
            updateDeliveryOptionId(productId,deliveryOptionId);
            renderOrderSummary();
            renderPaymentSummary();
        });
    });
}

export default renderOrderSummary;