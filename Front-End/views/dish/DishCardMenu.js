import { createCard } from "./createCard.js";

export function filterDish(categoryId)
{
    const container = document.getElementById('cartas');
    container.innerHTML='';//Limpio lo que tenga el contenedor.
    
    fetch(`https://localhost:7105/api/v1/Dish?category=${categoryId}&onlyActive=true`)
    .then(result => result.json())
    .then(dishes =>
        {
            if(dishes.length==0)
                {
                    const h2 = document.createElement('h2');
                    h2.textContent="Ups... Aún no contamos con platos para esta categoría";
                    container.appendChild(h2);
                    return;
                }

                dishes.forEach(dish => {
                const card = createCard(dish);
                container.appendChild(card);
                });


        })
        
}