import {Cart} from '../../data/cart-class.js'
import { loadProducts } from '../../data/products.js';
import renderOrderSummary from "../../scripts/checkout/orderSummary.js";

describe('test suite: renderOrderSummary',()=>{
    const productId1='e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    const productId2='15b6fc6f-327a-4ec4-896f-486349e85a3d';
    let cart=new Cart('test-cart');
    function refreshCart(){
        cart=new Cart('test-cart');
    }

    beforeAll((done)=>{
        loadProducts(()=>{
            done();
        });
    });

    beforeEach(()=>{
        document.querySelector('.js-test-container').innerHTML=`
            <div class="checkout-header-middle-section"></div>
            <div class="order-summary"></div>
            <div class="payment-summary"></div>
        `;
        cart.cartItems=[{
                id: productId1,
                quantity: 2,
                deliveryOptionId: '2'
            },{
                id: productId2,
                quantity: 1,
                deliveryOptionId: '2'
            }];
        cart.saveToStorage();
        renderOrderSummary('test-cart');
    })

    it('displays the cart',()=>{
        expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(2);
        expect(document.querySelector(`.js-product-quantity-${productId1}`).innerText).toContain('Quantity: 2'); //Checks if the string 'Quantity: 2' is present in the innerText of the element
        expect(document.querySelector(`.js-product-quantity-${productId2}`).innerText).toContain('Quantity: 1');
        expect(document.querySelector(`.js-product-name-${productId1}`).innerText).toContain(' ');
        expect(document.querySelector(`.js-product-name-${productId2}`).innerText).toContain(' ');
        document.querySelectorAll('.product-price').forEach((price)=>{
            expect(price.innerText).toContain('$');
        });
    })
    it('removes a product',()=>{
        document.querySelector(`.js-delete-quantity-link-${productId1}`).click();
        refreshCart();
        expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(1);
        expect(document.querySelector(`.js-cart-item-container-${productId1}`)).toEqual(null);
        expect(document.querySelector(`.js-cart-item-container-${productId2}`)).not.toEqual(null);
        expect(cart.cartItems.length).toEqual(1);
        expect(cart.cartItems[0].id).toEqual(productId2);
        expect(document.querySelector(`.js-product-name-${productId2}`).innerText).toContain(' ');
    })
    it('update product\'s delivery option via Button',()=>{
        document.querySelector(`.js-delivery-option-${productId1}-3`).click();
        refreshCart();
        expect(cart.cartItems[0].deliveryOptionId).toEqual('3');
        expect(document.querySelector(`.js-delivery-option-input-${productId1}-3`).checked).toBe(true);
        expect(cart.cartItems.length).toEqual(2);
        expect(cart.cartItems[0].id).toEqual(productId1);
        expect(cart.cartItems[0].deliveryOptionId).toEqual('3');
        expect(document.querySelector('.js-shipping-cost').innerHTML).toEqual('$14.98');
        expect(document.querySelector('.js-order-total').innerHTML).toEqual('$63.50');
    });

    afterEach(()=>{
        document.querySelector('.js-test-container').innerHTML=``;
    })
});