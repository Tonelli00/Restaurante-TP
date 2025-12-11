import { getAllDishes } from "./GetDishes.js";

async function homecard() {
    const dishesSection = document.querySelector('.FeaturedDishes');
   

    const dishes = await getAllDishes();
    const selectedDishes = dishes.slice(3,6);

    console.log(selectedDishes);

    selectedDishes.forEach(dish => {
        

    const card = document.createElement('div');
    card.className='card';

    const imgdiv = document.createElement('div');
    imgdiv.className='imgdiv';
    const img = document.createElement('img');
    img.src=dish.image
    img.alt="Imagen del plato";
    
    
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
        

    const btn = document.createElement("button");
    btn.classList.add('btn');
    btn.textContent="VER MENÚ →";

    


    priceandName.appendChild(dishname);
    priceandName.appendChild(dishprice);

    infodiv.appendChild(priceandName);
    infodiv.appendChild(dishdescription);
  
    
    imgdiv.appendChild(img);
    
    card.appendChild(imgdiv);
    card.appendChild(infodiv);
    card.appendChild(btn);

    dishesSection.appendChild(card);


});

}        



homecard();









   

