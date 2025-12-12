export function menuCards(dishes)
{
    const cardsDiv = document.querySelector('.Dishescards');
    cardsDiv.innerHTML='';  

    dishes.forEach(dish => {
        

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
            event.preventDefault();
             
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