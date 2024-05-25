import {loadFromStorage,cart} from '../../data/cart.js'
import renderOrderSummary from "../../scripts/checkout/orderSummary.js";

describe('test suite: renderOrderSummary',()=>{
    const productId1='e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    const productId2='15b6fc6f-327a-4ec4-896f-486349e85a3d';
    beforeEach(()=>{
        document.querySelector('.js-test-container').innerHTML=`
            <div class="checkout-header-middle-section"></div>
            <div class="order-summary"></div>
            <div class="payment-summary"></div>
        `;
        spyOn(localStorage,'setItem');
        spyOn(localStorage,'getItem').and.callFake(()=>{
            return JSON.stringify([{
                id: productId1,
                quantity: 2,
                deliveryOptionId: '2'
            },{
                id: productId2,
                quantity: 1,
                deliveryOptionId: '1'
            }]);
        });
        loadFromStorage();
        renderOrderSummary();
    })

    it('displays the cart',()=>{
        expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(2);
        expect(document.querySelector(`.js-product-quantity-${productId1}`).innerText).toContain('Quantity: 2'); //Checks if the string 'Quantity: 2' is present in the innerText of the element
        expect(document.querySelector(`.js-product-quantity-${productId2}`).innerText).toContain('Quantity: 1');
    })
    it('removes a product',()=>{
        document.querySelector(`.js-delete-quantity-link-${productId1}`).click();
        expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(1);
        expect(document.querySelector(`.js-cart-item-container-${productId1}`)).toEqual(null);
        expect(document.querySelector(`.js-cart-item-container-${productId2}`)).not.toEqual(null);
        expect(cart.length).toEqual(1);
        expect(cart[0].id).toEqual(productId2);
    })
    
    afterAll(()=>{
        document.querySelector('.js-test-container').innerHTML=``;
    })
});