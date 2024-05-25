import {cart,addToCart,loadFromStorage} from '../../data/cart.js'

describe('test suite: addToCart',()=>{
    it('adds an existing product to the cart',()=>{
        spyOn(localStorage,'setItem');
        spyOn(localStorage,'getItem').and.callFake(()=>{
            return JSON.stringify([{
                id: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 1,
                deliveryOptionId: 1
            }]);
        });
        loadFromStorage();

        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6',1);
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);      //Check if .setItem is called once
        expect(cart[0].id).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(2);
    });
    it('adds a new product to the cart',()=>{
        spyOn(localStorage,'setItem');          //Mocks localStorage.setItem and doesn't initiate the actual function              
        spyOn(localStorage,'getItem').and.callFake(()=>{    //Mocks localStorage.getItem and said function is called use the function defined after callFake
            return JSON.stringify([]);
        });
        loadFromStorage();              //Refresh the cart
        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6',1);
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);      //Check if .setItem is called once
        expect(cart[0].id).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(1);
    });
})