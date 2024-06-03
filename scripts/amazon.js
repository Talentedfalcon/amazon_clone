import { Cart } from '../data/cart-class.js'
import { products } from '../data/products.js';

const cart=new Cart('cart');
let productsHTML='';

products.forEach((product)=>{
    productsHTML+=`
        <div class="product-container">
            <div class="product-image-container">
                <img class="product-image"
                src="${product.image}">
            </div>

            <div class="product-name limit-text-to-2-lines">
                ${product.name}
            </div>

            <div class="product-rating-container">
                <img class="product-rating-stars"
                src="${product.getStarsUrl()}">
                <div class="product-rating-count link-primary">
                    ${product.rating.count}
                </div>
            </div>

            <div class="product-price">
                ${product.getPrice()}
            </div>

            <div class="product-quantity-container">
                <select class="js-quantity-selector-${product.id}">
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                </select>
            </div>

            ${product.extraInfoHTML()}

            <div class="product-spacer"></div>

            <div class="added-to-cart invisible js-added-to-cart-${product.id}">
                <img src="images/icons/checkmark.png">
                Added
            </div>

            <button class="add-to-cart-button button-primary" data-product-id="${product.id}">
                Add to Cart
            </button>
        </div>
    `
})

const productGrid=document.querySelector('.products-grid');
productGrid.innerHTML=productsHTML;

const cartQuantityElement=document.querySelector('.cart-quantity');
let cartQuantity=cart.getQuantity();
cartQuantityElement.innerHTML=`${cartQuantity}`;

function updateQuantity(productCount)
{
    cartQuantity+=Number(productCount);
}

function addedToCartElementAnimation(productId)
{
    let addedtoCartElement=document.querySelector(`.js-added-to-cart-${productId}`);
    addedtoCartElement.classList.remove('invisible');
    return setTimeout(()=>{
        addedtoCartElement.classList.add('invisible');
    },2000);
}

let timeoutId;
document.querySelectorAll('.add-to-cart-button').forEach(
    (button)=>{
        button.addEventListener('click',()=>{
            clearTimeout(timeoutId);
            let productCount=document.querySelector(`.js-quantity-selector-${button.dataset.productId}`).value; 
            timeoutId=addedToCartElementAnimation(button.dataset.productId)
            cart.addToCart(button.dataset.productId,productCount);
            updateQuantity(productCount);
            console.log(cart);
            cartQuantityElement.innerHTML=`${cartQuantity}`;
        })
    }
)