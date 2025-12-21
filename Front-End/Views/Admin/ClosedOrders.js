
import { StatusTranslate } from "../Status/StatusTranslater.js";
export function createClosedCards(orders)
{
      const cartSection = document.querySelector(".OrderCards");
         
      cartSection.innerHTML='';
      orders.forEach(order => {
             if(order.status.id ==5)
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
     
            const dishStatus = document.createElement('p');
            dishStatus.textContent=StatusTranslate(item.status.name);

            bodyInfo.appendChild(dishText);
            bodyInfo.appendChild(dishStatus);
        
             cartBody.appendChild(bodyInfo);
             });
     
             const priceandaddButton = document.createElement('div');
             priceandaddButton.className='totalAndBtn';
             
             const totalPrice = document.createElement('p');
             totalPrice.style.fontSize='1.2rem';
             totalPrice.textContent='Total:$'+order.totalAmount;
             
             priceandaddButton.appendChild(totalPrice);
             priceandaddButton.style.justifyContent='center';
             priceandaddButton.style.marginLeft='0';
             priceandaddButton.style.marginTop='1rem';  

             cartHeader.appendChild(orderTittle);
             cartHeader.appendChild(orderStatus);
             
             
             
             orderCard.appendChild(cartHeader);
             orderCard.appendChild(cartBody);
             orderCard.appendChild(priceandaddButton);
     
             cartSection.appendChild(orderCard);        
             }
           
             
         });
     

}