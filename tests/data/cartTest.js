import {cart,addToCart,loadFromStorage,removeFromCart, updateDeliveryOptionId} from '../../data/cart.js'
import { deliveryOptions } from '../../data/deliveryOptions.js';

describe('test suite: addToCart',()=>{
    beforeEach(()=>{              
        spyOn(localStorage,'setItem');   //Mocks localStorage.setItem and doesn't initiate the actual function
    })
    it('adds an existing product to the cart',()=>{
        spyOn(localStorage,'getItem').and.callFake(()=>{
            return JSON.stringify([{
                id: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 1,
                deliveryOptionId: '1'
            }]);
        });
        loadFromStorage();
        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6',1);
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);      //Check if .setItem is called once
        expect(cart[0].id).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(2);
        expect(localStorage.setItem).toHaveBeenCalledWith(
            'cart',
            JSON.stringify([{
                id: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 2,
                deliveryOptionId: '1'
            }]));
    });
    it('adds a new product to the cart',()=>{
        spyOn(localStorage,'getItem').and.callFake(()=>{    //Mocks localStorage.getItem and said function is called use the function defined after callFake
            return JSON.stringify([]);
        });
        loadFromStorage();              //Refresh the cart
        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6',1);
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);      //Check if .setItem is called once
        expect(cart[0].id).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledWith(
            'cart',
            JSON.stringify([{
                id: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 1,
                deliveryOptionId: '1'
            }])
        );
    });
})

describe('test suite: removeFromCart',()=>{
    const productId='e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    beforeEach(()=>{              
        spyOn(localStorage,'setItem');   //Mocks localStorage.setItem and doesn't initiate the actual function
        spyOn(localStorage,'getItem').and.callFake(()=>{
            return JSON.stringify([{
                id: productId,
                quantity: 1,
                deliveryOptionId: '1'
            }]);
        });
        loadFromStorage();
    })
    it('item to be removed present in the cart',()=>{
        removeFromCart(productId);
        expect(cart.length).toEqual(0);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith(
            'cart',
            JSON.stringify([])
        );
    });
    it('item to be removed not in the cart',()=>{
        removeFromCart('01');
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith(
            'cart',
            JSON.stringify([{
                id: productId,
                quantity: 1,
                deliveryOptionId: '1'
            }])
        );
    });
});

describe('test suite: updateDeliveryOption',()=>{
    const productId='e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    beforeEach(()=>{
        spyOn(localStorage,'setItem');   //Mocks localStorage.setItem and doesn't initiate the actual function
        spyOn(localStorage,'getItem').and.callFake(()=>{
            return JSON.stringify([{
                id: productId,
                quantity: 1,
                deliveryOptionId: '1'
            }]);
        });
        loadFromStorage();
    });
    
    it('update delivery option of existing product',()=>{
        updateDeliveryOptionId(productId,'3');
        expect(cart.length).toEqual(1);
        expect(cart[0].deliveryOptionId).toEqual('3');
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    });
    it('product to be update not found in the cart',()=>{
        updateDeliveryOptionId(productId+'1','2');
        expect(cart.length).toEqual(1);
        expect(cart[0].deliveryOptionId).toEqual('1');
        expect(localStorage.setItem).toHaveBeenCalledTimes(0);
    });
    it('valid delivery option id',()=>{
        updateDeliveryOptionId(productId,'50');
        expect(cart.length).toEqual(1);
        expect(cart[0].deliveryOptionId).toEqual('1');
        expect(localStorage.setItem).toHaveBeenCalledTimes(0);
    });
});