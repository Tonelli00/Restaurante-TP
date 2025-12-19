import { toast } from "../Menu/Toast.js";
import {AddElement} from "../Cart/CartBehaviour.js";
import { UpdateOrder} from "../Order/UpdateOrder.js";
export function menuCards(dishes)
{
    const cardsDiv = document.querySelector('.Dishescards');
    cardsDiv.innerHTML='';  

    if(dishes.length>0)
    { 
        cardsDiv.classList.remove('EmptyCategory');
        dishes.forEach(dish => {

    const card = document.createElement('div');
    card.className='card';

    const imgdiv = document.createElement('div');
    imgdiv.className='imgdiv';
    const img = document.createElement('img');
    img.src=dish.image
    img.alt="Imagen del plato";
    
    img.onerror=()=>imageNotFound(img);


    const infodiv = document.createElement('div');
    infodiv.className='infodiv';
    
    const priceandName = document.createElement('div');
    priceandName.className='PriceAndName';
    const dishname = document.createElement('h1');
    dishname.textContent=dish.name;
    const dishprice = document.createElement('h1');
    dishprice.textContent="$"+dish.price;
    
    const dishdescription = document.createElement('p');
    dishdescription.textContent=dish.description;
        
    const categoryNameDiv = document.createElement('div');
    categoryNameDiv.classList='CategoryNameDiv';
    const categoryName = document.createElement('p');
    categoryName.textContent=dish.category.name;

    categoryNameDiv.appendChild(categoryName);

    const btn = document.createElement("button");
    btn.classList.add('btn');
    btn.textContent="+ AGREGAR";
    btn.addEventListener('click',(event)=>
        {
            const params= new URLSearchParams(window.location.search);
            const act = params.get("act");
            if(act === 'agg')
            {
                toast(dish.name);
                const orderId = localStorage.getItem('OrderID');
                AddElement(dish);
            }
            else
                {
                event.preventDefault();
                toast(dish.name); 
                AddElement(dish);
                }
        })
      
    priceandName.appendChild(dishname);
    priceandName.appendChild(dishprice);

    infodiv.appendChild(priceandName);
    infodiv.appendChild(dishdescription);
  
    
    imgdiv.appendChild(img);
    
    card.appendChild(categoryNameDiv);
    card.appendChild(imgdiv);
    card.appendChild(infodiv);
    card.appendChild(btn);

    cardsDiv.appendChild(card);


});
}
else
    {
        cardsDiv.classList.add('EmptyCategory');
        const emptyMensage = document.createElement('div');
        const message = document.createElement('h1');
        message.textContent='Lo sentimos, no contamos con platos para esta categoria...';
        emptyMensage.appendChild(message);

        cardsDiv.appendChild(emptyMensage);
        
    }
   
            


function imageNotFound(img)
{
    img.src ='Components/Images/imageNotFound.jpg';
}

}