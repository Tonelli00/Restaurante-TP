
import { dishmodal } from "./DishModalDisplay.js";

export function createCard(dish)
{
    const card = document.createElement('div');
    card.className="card";
    
    const img = document.createElement('img');
    img.className="imagen";
    img.src=dish.image;
    img.alt=dish.name;

  
                
   const contenedor = document.createElement('div');
   contenedor.className='contenedor';
   const name = document.createElement('h3');
   name.textContent=dish.name;
   const price = document.createElement('h3');
   price.textContent="$"+dish.price;
   const description = document.createElement('p');
   description.textContent=dish.description;
             
   
   //En caso de que no se pueda traer la imagen
    
   img.onerror = () => {
    img.style.display = "none";
    const errorh2 = document.createElement('h2');
    errorh2.textContent = "Error al cargar imagen";
    card.appendChild(errorh2);
      };

                
   contenedor.appendChild(name);
   contenedor.appendChild(price);
   contenedor.appendChild(description);
   card.appendChild(img);

   const btn = VmButton(dish); 

   card.appendChild(contenedor);
   card.appendChild(btn);
   
   return card;

}


//Funciones aux.

function VmButton(dish)
{
 const Vmbtn= document.createElement('button');
  Vmbtn.className="boton-vermas";
  Vmbtn.textContent="Ver más";
 Vmbtn.addEventListener('click',()=>
  {
   dishmodal(dish);
     });
return Vmbtn;
}



