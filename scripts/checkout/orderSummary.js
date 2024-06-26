import { Cart } from '../../data/cart-class.js';
import { products } from '../../data/products.js';
import formatCurrency from '../utils/money.js';
import { deliveryOptions,dateCalculate } from '../../data/deliveryOptions.js';
import renderPaymentSummary from './paymentSummary.js';
import renderCheckoutHeader from './checkoutHeader.js';

function renderOrderSummary(localStorageKey){
    const cart=new Cart(localStorageKey);

    let cartSummaryHTML = '';

    cart.cartItems.forEach(
        (item)=>{
            const productId=item.productId;
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
                    <div class="cart-item-container 
                        js-cart-item-container 
                        js-cart-item-container-${matchingProduct.id}">
                        <div class="delivery-date">
                            Delivery date: ${dateCalculate(deliveryOption)}
                        </div>

                        <div class="cart-item-details-grid">
                            <img class="product-image"
                            src="${matchingProduct.image}">

                            <div class="cart-item-details">
                            <div class="product-name
                                js-product-name-${matchingProduct.id}">
                                ${matchingProduct.name}
                            </div>
                            <div class="product-price">
                                ${matchingProduct.getPrice()}
                            </div>
                            <div class="product-quantity
                                js-product-quantity-${matchingProduct.id}">
                                <span>
                                Quantity: <span class="quantity-label">${item.quantity}</span>
                                </span>
                                <span class="update-quantity-link link-primary" data-product-id="${matchingProduct.id}">
                                Update
                                </span>
                                <input class="quantity-input invisible"/>
                                <span class="save-quantity-link link-primary invisible">Save</span>
                                <span class="delete-quantity-link 
                                    link-primary
                                    js-delete-quantity-link-${matchingProduct.id}" 
                                    data-product-id="${matchingProduct.id}">
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

    document.querySelector('.order-summary').innerHTML=cartSummaryHTML;

    document.querySelectorAll('.delete-quantity-link').forEach(
        (link)=>{
            link.addEventListener('click',()=>{
                const productId = link.dataset.productId;
                cart.removeFromCart(productId);
                renderCheckoutHeader(localStorageKey);
                renderOrderSummary(localStorageKey);
                renderPaymentSummary(localStorageKey);
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
                    renderPaymentSummary(localStorageKey);
                })
                updateButton.addEventListener('click',()=>{
                    if(Number(input.value)===0){
                        document.querySelector(`.js-cart-item-container-${productId} .delete-quantity-link`).click();
                    }
                    cart.updateItemQuantity(productId,Number(input.value));
                    quantityLabel.innerHTML=Number(input.value);
                    updateButton.classList.add('invisible');
                    input.classList.add('invisible');
                    quantityLabel.classList.remove('invisible');
                    link.classList.remove('invisible');
                    renderCheckoutHeader(localStorageKey);
                    renderPaymentSummary(localStorageKey);
                });
                quantityLabel.classList.add('invisible');
                link.classList.add('invisible');
                updateButton.classList.remove('invisible');
                input.classList.remove('invisible');
            })
        }
    )

    function deliveryOptionsHTML(matchingProduct,item){
        let html = '';
        deliveryOptions.forEach((option)=>{
            const dateString=dateCalculate(option)
            const priceString=option.priceCents===0?'FREE':`$${formatCurrency(option.priceCents)} -`;
            const isChecked = option.id === item.deliveryOptionId;
            html+=`
                <div class="delivery-option 
                    js-delivery-option
                    js-delivery-option-${matchingProduct.id}-${option.id}"
                    data-product-id="${matchingProduct.id}"
                    data-delivery-option-id="${option.id}">
                    <input type="radio"
                        class="delivery-option-input
                        js-delivery-option-input-${matchingProduct.id}-${option.id}"
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
            cart.updateDeliveryOptionId(productId,deliveryOptionId);
            renderOrderSummary(localStorageKey);
            renderPaymentSummary(localStorageKey);
        });
    });
}

export default renderOrderSummary;