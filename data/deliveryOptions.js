import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

export const deliveryOptions=[{
    id:'1',
    deliveryDays:7,
    priceCents: 0
},{
    id:'2',
    deliveryDays:3,
    priceCents: 499
},{
    id:'3',
    deliveryDays:1,
    priceCents: 999
}];

export function dateCalculate(option){
    let today=dayjs();
    let deliveryDate=today.add(option.deliveryDays,'day');
    if(deliveryDate.format('ddd')==='Sat'){
        deliveryDate=deliveryDate.add(2,'day');
    }
    else if(deliveryDate.format('ddd')==='Sun'){
        deliveryDate=deliveryDate.add(1,'day');
    }
    const dateString=deliveryDate.format('dddd, MMMM D');
    return dateString;
}

