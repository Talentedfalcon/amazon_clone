import { cart,removeFromCart,getQuantity,updateItemQuantity } from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utils/money.js';

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
        cartSummaryHTML+=`
                <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
                    <div class="delivery-date">
                        Delivery date: Tuesday, June 21
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
                        <div class="delivery-option">
                            <input type="radio" checked
                            class="delivery-option-input"
                            name="delivery-option-${matchingProduct.id}">
                            <div>
                            <div class="delivery-option-date">
                                Tuesday, June 21
                            </div>
                            <div class="delivery-option-price">
                                FREE Shipping
                            </div>
                            </div>
                        </div>
                        <div class="delivery-option">
                            <input type="radio"
                            class="delivery-option-input"
                            name="delivery-option-${matchingProduct.id}">
                            <div>
                            <div class="delivery-option-date">
                                Wednesday, June 15
                            </div>
                            <div class="delivery-option-price">
                                $4.99 - Shipping
                            </div>
                            </div>
                        </div>
                        <div class="delivery-option">
                            <input type="radio"
                            class="delivery-option-input"
                            name="delivery-option-${matchingProduct.id}">
                            <div>
                            <div class="delivery-option-date">
                                Monday, June 13
                            </div>
                            <div class="delivery-option-price">
                                $9.99 - Shipping
                            </div>
                            </div>
                        </div>
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
            removeFromCart(productId);
            const container=document.querySelector(`.js-cart-item-container-${productId}`);
            container.remove();
            updateCartQuantity();
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