import { createActiveCards } from "./ActiveOrders.js";
import {createClosedCards} from "./ClosedOrders.js"
import {GetAllOrders} from "../Order/GetAllOrders.js";

async function createCards()
{
    const orders = await GetAllOrders(); 
    const OrderCards = document.querySelector('.OrderCards');

    const OptionSelect = document.getElementById('OrderOptions'); 
    const ActiveOption = document.createElement('option');
    ActiveOption.textContent='Activas';
    ActiveOption.value = "Activas";
    const ClosedOption = document.createElement('option');
    ClosedOption.textContent='Cerradas';
    ClosedOption.value = "Cerradas";

    OptionSelect.appendChild(ActiveOption);
    OptionSelect.appendChild(ClosedOption);

    OptionSelect.addEventListener('change',()=>
        {
            if(OptionSelect.value =='Activas')
                {
                    createActiveCards(orders);
                }
            else if(OptionSelect.value=='Cerradas')
                    {
                        createClosedCards(orders);
                    }
                    
                else{OrderCards.innerHTML='';}
        });
}
createCards();