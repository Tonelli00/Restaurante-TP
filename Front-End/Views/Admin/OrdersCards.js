import { createActiveCards } from "./ActiveOrders.js";
import {createClosedCards} from "./ClosedOrders.js"
import {GetAllOrders} from "../Order/GetAllOrders.js";

document.addEventListener("DOMContentLoaded", () => {
    const OrderCards = document.querySelector('.OrderCards');
     const NoOrderSelected = document.createElement('div');
            NoOrderSelected.className = 'NoOrderSelected'; 
            const img = document.createElement('img');
            img.src='Components/Images/Filter.png';

            const textContent = document.createElement('div');
            textContent.className='NoOrderSelectedText';
            const tittle = document.createElement('h1');
            tittle.textContent='Selecciona un filtro';
            const text = document.createElement('p');
            text.textContent='Elige ver órdenes activas o cerradas para continuar';

            textContent.append(tittle,text);
            NoOrderSelected.append(img,textContent)


            OrderCards.appendChild(NoOrderSelected);
    
});

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
                    
            else
            {
            OrderCards.innerHTML='';
            const NoOrderSelected = document.createElement('div');
            NoOrderSelected.className = 'NoOrderSelected'; 
            const img = document.createElement('img');
            img.src='Components/Images/Filter.png';

            const textContent = document.createElement('div');
            textContent.className='NoOrderSelectedText';
            const tittle = document.createElement('h1');
            tittle.textContent='Selecciona un filtro';
            const text = document.createElement('p');
            text.textContent='Elige ver órdenes activas o cerradas para continuar';

            textContent.append(tittle,text);
            NoOrderSelected.append(img,textContent)


            OrderCards.appendChild(NoOrderSelected);
            }
        });
}
createCards();