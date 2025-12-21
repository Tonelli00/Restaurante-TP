import {GetAllOrders} from "./GetAllOrders.js";
import { GetDishPriceById } from "../Dishes/GetDishes.js";
import { StatusTranslate } from "../Status/StatusTranslater.js";

async function createCards()
{
    const orders = await GetAllOrders(); 
    const cartSection = document.querySelector(".OrderCards");
    
    orders.forEach(order => {
        if(order.status.id !=5)
        {
        const orderCard = document.createElement('div');
        orderCard.className="orderCard";
        const cartHeader = document.createElement('div');
        cartHeader.className='cartHeader';
        const orderTittle = document.createElement('p');
        orderTittle.textContent="Orden #"+order.orderNumber; 
        orderTittle.style.color='var(--text-highlighted)';
        orderTittle.style.fontSize='1.2rem';
        
        const orderStatus = document.createElement('p');
        orderStatus.textContent=StatusTranslate(order.status.name);
        orderStatus.style.fontSize='1.2rem';
  
        
        const cartBody = document.createElement('div');
        cartBody.className='cartBody';
        
       

       order.items.forEach(async item => {

        const bodyInfo = document.createElement('div');
        bodyInfo.className="cartBodyInfo";
        const dishText =document.createElement('p');
        dishText.textContent=`x${item.quantity} ${item.dish.name}`;        

        const dishPrice = document.createElement('p');
        const price = await GetDishPriceById(item.dish.id);
        dishPrice.textContent="$"+price*item.quantity;

        bodyInfo.appendChild(dishText);
        bodyInfo.appendChild(dishPrice);

        cartBody.appendChild(bodyInfo);
        });

        const priceandaddButton = document.createElement('div');
        priceandaddButton.className='totalAndBtn';
        const totalPrice = document.createElement('p');
        totalPrice.textContent='Total:$'+order.totalAmount;
        const addDishBtn = document.createElement('button');
        addDishBtn.className = 'btn';
        addDishBtn.textContent='+ Agregar Plato';
        addDishBtn.addEventListener('click',()=>
            {   
                localStorage.setItem('OrderID',order.orderNumber);
                location.href=`Menu.html?act=agg`;    
            });

        priceandaddButton.appendChild(totalPrice);
        priceandaddButton.appendChild(addDishBtn);


     

        
        cartHeader.appendChild(orderTittle);
        cartHeader.appendChild(orderStatus);
        
        
        
        orderCard.appendChild(cartHeader);
        orderCard.appendChild(cartBody);
        orderCard.appendChild(priceandaddButton);

        cartSection.appendChild(orderCard);        
        }
      
        
    });


}
createCards();