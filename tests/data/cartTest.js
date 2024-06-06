import { Cart } from '../../data/cart-class.js'
import { deliveryOptions } from '../../data/deliveryOptions.js';

describe('test suite: addToCart',()=>{
    const cart=new Cart('test-cart');
    beforeEach(()=>{              
        spyOn(localStorage,'setItem');   //Mocks localStorage.setItem and doesn't initiate the actual function
    })
    it('adds an existing product to the cart',()=>{
        cart.cartItems=[{
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 1,
            deliveryOptionId: '1'
        }];
        cart.addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6',1);
        expect(cart.cartItems.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);      //Check if .setItem is called once
        expect(cart.cartItems[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.cartItems[0].quantity).toEqual(2);
        expect(localStorage.setItem).toHaveBeenCalledWith(
            'test-cart',
            JSON.stringify([{
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 2,
                deliveryOptionId: '1'
            }]));
    });
    it('adds a new product to the cart',()=>{
        cart.cartItems=[];
        cart.addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6',1);
        expect(cart.cartItems.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);      //Check if .setItem is called once
        expect(cart.cartItems[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.cartItems[0].quantity).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledWith(
            'test-cart',
            JSON.stringify([{
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 1,
                deliveryOptionId: '1'
            }])
        );
    });
})

describe('test suite: removeFromCart',()=>{
    const productId='e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    const cart=new Cart('test-cart');
    beforeEach(()=>{              
        spyOn(localStorage,'setItem');   //Mocks localStorage.setItem and doesn't initiate the actual function
        cart.cartItems=[{
            productId: productId,
            quantity: 1,
            deliveryOptionId: '1'
        }];
    })
    it('item to be removed present in the cart',()=>{
        cart.removeFromCart(productId);
        expect(cart.cartItems.length).toEqual(0);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith(
            'test-cart',
            JSON.stringify([])
        );
    });
    it('item to be removed not in the cart',()=>{
        cart.removeFromCart('01');
        expect(cart.cartItems.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith(
            'test-cart',
            JSON.stringify([{
                productId: productId,
                quantity: 1,
                deliveryOptionId: '1'
            }])
        );
    });
});

describe('test suite: updateDeliveryOption',()=>{
    const productId='e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    const cart=new Cart('test-cart');
    beforeEach(()=>{
        spyOn(localStorage,'setItem');   //Mocks localStorage.setItem and doesn't initiate the actual function
        cart.cartItems=[{
            productId: productId,
            quantity: 1,
            deliveryOptionId: '1'
        }];
    });
    
    it('update delivery option of existing product',()=>{
        cart.updateDeliveryOptionId(productId,'3');
        expect(cart.cartItems.length).toEqual(1);
        expect(cart.cartItems[0].deliveryOptionId).toEqual('3');
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    });
    it('product to be update not found in the cart',()=>{
        cart.updateDeliveryOptionId(productId+'1','2');
        expect(cart.cartItems.length).toEqual(1);
        expect(cart.cartItems[0].deliveryOptionId).toEqual('1');
        expect(localStorage.setItem).toHaveBeenCalledTimes(0);
    });
    it('valid delivery option id',()=>{
        cart.updateDeliveryOptionId(productId,'50');
        expect(cart.cartItems.length).toEqual(1);
        expect(cart.cartItems[0].deliveryOptionId).toEqual('1');
        expect(localStorage.setItem).toHaveBeenCalledTimes(0);
    });
});