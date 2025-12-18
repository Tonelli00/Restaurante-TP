import { getAllDishes } from "./GetDishes.js";

async function homecard() {
    const dishesSection = document.querySelector('.Dishescards');
   

    const dishes = await getAllDishes();
    const selectedDishes = dishes.slice(0,3);


    selectedDishes.forEach(dish => {
        

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
    btn.textContent="VER MENÚ →";
    btn.addEventListener('click',(event)=>
        {
            event.preventDefault();
            location.href='Menu.html';    
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

    dishesSection.appendChild(card);


});

function imageNotFound(img)
{
    img.src ='Components/Images/imageNotFound.jpg';
}

}        



homecard();









   

