import {IncElement,DecElement,deleteDish, emptyCart } from "./CartBehaviour.js";
async function CartCards()
{
    const params= new URLSearchParams(window.location.search);
    const act = params.get("act");
    const dishesSection = document.querySelector(".DishList");
    

    if(act!=='agg')
    {
        const Selecteddishes = JSON.parse(localStorage.getItem('CartContent')) || [];
    if(Selecteddishes.length>0)
        {
        Selecteddishes.forEach(dish => {

        const DishDiv = document.createElement('div');
        DishDiv.classList='DishDiv';

        const imgdiv = document.createElement('div');
    
        const img = document.createElement('img');
        img.src=dish.dish.image
        img.alt="Imagen del plato";
        
        img.onerror=()=>imageNotFound(img);
        
        
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
        const notesInput = document.createElement('input');
        notesInput.className="DishNotes";
        notesInput.type='text';
        notesInput.placeholder='Aclaraciones para el plato';

        notesInput.addEventListener('input',()=>
            {
                dish.notes = notesInput.value || "No se indico una nota al plato";
                const cart = JSON.parse(localStorage.getItem('CartContent'));
                const index = cart.findIndex(item=> item.dish.id == dish.dish.id);
                cart[index]=dish;
                localStorage.setItem('CartContent',JSON.stringify(cart));
            });

        const trashDiv = document.createElement('div');
        trashDiv.className='TrashDiv';
        const trashIcon = document.createElement('img');
        trashIcon.className="trashIcon";
        trashIcon.src="Components/Images/trash-2.png";
        trashDiv.appendChild(trashIcon);
        
        trashDiv.addEventListener('click',()=>
            {
                deleteDish(dish);
                const cart = JSON.parse(localStorage.getItem('CartContent')) || [];
                DishDiv.remove(); //Borro el div que toque.

                if(cart.length === 0)
                {
                    emptyCart();
                }
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
        buttonsDiv.appendChild(notesInput);

        priceandName.appendChild(dishname);
        priceandName.appendChild(dishprice);
         

        infodiv.appendChild(priceandName);
        infodiv.appendChild(dishCategory);
        infodiv.appendChild(buttonsDiv);
        infodiv.appendChild(trashDiv);

        imgdiv.appendChild(img);
        
        DishDiv.appendChild(imgdiv);
        DishDiv.appendChild(infodiv);

        dishesSection.appendChild(DishDiv);
        
    });

    }
    else
    {
        emptyCart();
    }
    }
    else
        {
        const Selecteddishes = JSON.parse(localStorage.getItem('UpdateOrder')) || [];
        if(Selecteddishes.length>0)
            {
            Selecteddishes.forEach(dish => {

            const DishDiv = document.createElement('div');
            DishDiv.classList='DishDiv';

            const imgdiv = document.createElement('div');
        
            const img = document.createElement('img');
            img.src=dish.dish.image
            img.alt="Imagen del plato";
            
            img.onerror=()=>imageNotFound(img);
            
            
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
            const notesInput = document.createElement('input');
            notesInput.className="DishNotes";
            notesInput.type='text';
            notesInput.placeholder='Aclaraciones para el plato';

            notesInput.addEventListener('input',()=>
                {
                    dish.notes = notesInput.value || "No se indico una nota al plato";
                    const cart = JSON.parse(localStorage.getItem('UpdateOrder'));
                    const index = cart.findIndex(item=> item.dish.id == dish.dish.id);
                    cart[index]=dish;
                    localStorage.setItem('UpdateOrder',JSON.stringify(cart));
                });

            const trashDiv = document.createElement('div');
            trashDiv.className='TrashDiv';
            const trashIcon = document.createElement('img');
            trashIcon.className="trashIcon";
            trashIcon.src="Components/Images/trash-2.png";
            trashDiv.appendChild(trashIcon);
            
            trashDiv.addEventListener('click',()=>
                {
                    deleteDish(dish);
                    const cart = JSON.parse(localStorage.getItem('UpdateOrder')) || [];
                    DishDiv.remove(); //Borro el div que toque.

                    if(cart.length === 0)
                    {
                        emptyCart();
                    }
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
            buttonsDiv.appendChild(notesInput);

            priceandName.appendChild(dishname);
            priceandName.appendChild(dishprice);
            

            infodiv.appendChild(priceandName);
            infodiv.appendChild(dishCategory);
            infodiv.appendChild(buttonsDiv);
            infodiv.appendChild(trashDiv);

            imgdiv.appendChild(img);
            
            DishDiv.appendChild(imgdiv);
            DishDiv.appendChild(infodiv);

            dishesSection.appendChild(DishDiv);
            
        });

        }
        else
        {
            emptyCart();
        }


        }
    
   function imageNotFound(img)
    {
    img.src ='Components/Images/imageNotFound.jpg';
    }

}
CartCards();