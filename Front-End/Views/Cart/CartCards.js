import {IncElement,DecElement,deleteDish } from "./CartBehaviour.js";
 async function CartCards()
{
    const dishesSection = document.querySelector(".DishList");
    
    const Selecteddishes = JSON.parse(localStorage.getItem('CartContent'));

    Selecteddishes.forEach(dish => {

        const DishDiv = document.createElement('div');
        DishDiv.classList='DishDiv';

        const imgdiv = document.createElement('div');
    
        const img = document.createElement('img');
        img.src=dish.dish.image
        img.alt="Imagen del plato";
        
        
        const infodiv = document.createElement('div');
        infodiv.className='infodiv';

        const dishCategory = document.createElement('p');
        dishCategory.textContent=dish.dish.category.name;
        dishCategory.style.color = "var(--thirdText-color)";
        dishCategory.style.fontFamily = "var(--text-font)";

        
        const priceandName = document.createElement('div');
        priceandName.className='PriceAndName';
        const dishname = document.createElement('h1');
        dishname.textContent=dish.dish.name;
        const dishprice = document.createElement('h1');
        dishprice.textContent="$"+parseInt(dish.dish.price*dish.quantity);
        dishprice.style.color="var( --principal-color)";

        const buttonsDiv = document.createElement('div');
        buttonsDiv.className="buttonsDiv";
        const addBtn = document.createElement('button');
        addBtn.textContent="+";
        const decBtn = document.createElement('button');
        decBtn.textContent="-";
        const dishQuantity=document.createElement('p');
        dishQuantity.textContent=dish.quantity;


        const trashDiv = document.createElement('div');
        trashDiv.className='TrashDiv';
        const trashIcon = document.createElement('img');
        trashIcon.className="trashIcon";
        trashIcon.src="Components/Images/trash-2.png";
        trashDiv.appendChild(trashIcon);
        
        trashDiv.addEventListener('click',()=>
            {
                deleteDish(dish);
                location.reload();
            });

        addBtn.addEventListener('click',()=>
            {
                IncElement(dish,dishprice,dishQuantity);
            });
        decBtn.addEventListener('click',()=>
            {
                DecElement(dish,dishprice,dishQuantity);
            });

       
       
        buttonsDiv.appendChild(decBtn);
        buttonsDiv.appendChild(dishQuantity);
        buttonsDiv.appendChild(addBtn);

        priceandName.appendChild(dishname);
        priceandName.appendChild(dishprice);
         

        infodiv.appendChild(priceandName);
        infodiv.appendChild(dishCategory);
        infodiv.appendChild(buttonsDiv);
        infodiv.appendChild(trashDiv);

        imgdiv.appendChild(img);

        trashDiv.appendChild(trashIcon);

        DishDiv.appendChild(imgdiv);
        DishDiv.appendChild(infodiv);

        dishesSection.appendChild(DishDiv);
        
    });

}
CartCards();