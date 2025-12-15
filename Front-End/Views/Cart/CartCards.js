
async function CartCards()
{
    const dishesSection = document.querySelector(".DishList");
    
    const Selecteddishes = JSON.parse(localStorage.getItem('CartContent'));

    Selecteddishes.forEach(dish => {

        const DishDiv = document.createElement('div');
        DishDiv.classList='DishDiv';

        const imgdiv = document.createElement('div');
    
        const img = document.createElement('img');
        img.src=dish.image
        img.alt="Imagen del plato";
        
        
        const infodiv = document.createElement('div');
        infodiv.className='infodiv';

        const dishCategory = document.createElement('p');
        dishCategory.textContent=dish.category.name;
        dishCategory.style.color = "var(--thirdText-color)";
        dishCategory.style.fontFamily = "var(--text-font)";

        
        const priceandName = document.createElement('div');
        priceandName.className='PriceAndName';
        const dishname = document.createElement('h1');
        dishname.textContent=dish.name;
        const dishprice = document.createElement('h1');
        dishprice.textContent="$"+dish.price;
        dishprice.style.color="var( --principal-color)";


        const buttonsDiv = document.createElement('div');
        buttonsDiv.className="buttonsDiv";
        const addBtn = document.createElement('button');
        addBtn.textContent="+";
        const decBtn = document.createElement('button');
        decBtn.textContent="-";
        const dishQuantity=document.createElement('p');
        dishQuantity.textContent=1;

       
       
        buttonsDiv.appendChild(decBtn);
        buttonsDiv.appendChild(dishQuantity);
        buttonsDiv.appendChild(addBtn);

        priceandName.appendChild(dishname);
        priceandName.appendChild(dishprice);
         

        infodiv.appendChild(priceandName);
        infodiv.appendChild(dishCategory);
        infodiv.appendChild(buttonsDiv);

        imgdiv.appendChild(img);

        DishDiv.appendChild(imgdiv);
        DishDiv.appendChild(infodiv);
        
        
       

        dishesSection.appendChild(DishDiv);
        
    });

}
CartCards();