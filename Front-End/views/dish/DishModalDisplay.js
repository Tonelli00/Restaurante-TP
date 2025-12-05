import { new_Element } from '../shoppingcart/shopcart.js';



export function dishmodal(dish)
{
const dishDisplay = document.getElementById('dish-display');
dishDisplay.innerHTML = ''; // limpiar contenido previo

const closebtn =document.createElement('button');

closebtn.id='close-btn';
closebtn.textContent='X';

dishDisplay.classList.add('show');
document.body.classList.add('displaytrue');
 
  closebtn.onclick=()=>
    {
    dishDisplay.classList.remove('show');
    document.body.classList.remove('displaytrue');
    }

  const card = document.createElement('div');
  card.className="card_";
  
  const img = document.createElement('img');
  img.className="imagen_";
  img.src=dish.image;
  img.alt=dish.name;

  
                
  const contenedor = document.createElement('div');
  contenedor.className='contenedor_';

  const  quantity_Control = document.createElement('div');
  quantity_Control.className='QuantityControl';
 
  const plusBtn= document.createElement('button');
  plusBtn.textContent='+';
  plusBtn.type='button';

  const minBtn = document.createElement('button');
  minBtn.textContent='-';
  minBtn.type='button';

  const quantityDisplay = document.createElement('span');
  quantityDisplay.textContent=1;

  plusBtn.onclick=()=>
    {
      let actualValue = parseInt(quantityDisplay.textContent);
      actualValue=actualValue+1;
      quantityDisplay.textContent=actualValue;
    }
  minBtn.onclick=()=>
    {
      let actualValue = parseInt(quantityDisplay.textContent);
      if(actualValue>1)
        {
          actualValue=actualValue-1;
          quantityDisplay.textContent=actualValue;
        }
      else{toast_Error("No se permiten cantidades menores a 1");}
    }  
  quantity_Control.appendChild(minBtn);

  quantity_Control.appendChild(quantityDisplay);
  
  quantity_Control.appendChild(plusBtn);
 
  const name = document.createElement('h3');
  name.textContent=dish.name;
  const price = document.createElement('h3');
  price.textContent="$"+dish.price;
  const description = document.createElement('p');
  description.textContent=dish.description;
  const notes = document.createElement('input');
  notes.id='notes';
  notes.type='text';
  notes.placeholder="Escribí tus notas del pedido acá";
  notes.addEventListener('input',()=>
    {
    dish.notes=notes.value;
    });

   contenedor.appendChild(name);
   contenedor.appendChild(price);
   contenedor.appendChild(description);
   
   card.appendChild(img);
   card.appendChild(contenedor);
   card.appendChild(notes);
   card.appendChild(quantity_Control);
  

   dishDisplay.appendChild(card);
   dishDisplay.appendChild(closebtn);
   
  
   //creo el boton para agregar el plato
   const orderbtn = button(dish,()=>parseInt(quantityDisplay.textContent));
   dishDisplay.appendChild(orderbtn);
   return card;
}

function button(dish,dishquantity)
{
  const btn = document.createElement('button');
  btn.className="order-button";
  btn.textContent="Agregar a la orden";
    btn.onclick=()=>
    {
    dish.quantity=dishquantity(); //Porque definí como funcion el quantitydisplay.
    new_Element(dish); //Agrego el elemento al carrito.
    toast();// Muestro el mensaje
    const dishDisplay=document.getElementById('dish-display');
    dishDisplay.classList.remove('show');
    document.body.classList.remove('displaytrue');

      }
     
     return btn;
}

function toast()
{
  const toast =document.getElementById('mensaje');//Toast (Tostadora) es una analogía de lo que hace el mensaje.
  toast.textContent="Plato agregado correctamente";                          
  toast.classList.add('mostrar');
  //Le agreo la clase mostrar a toast
  setTimeout(() => toast.classList.remove('mostrar'), 1000);
  //Especifico cuanto tiempo se va a mostrar el mensaje.
  //y le saco la clase que le agregue.

}
function toast_Error(msj)
{
  const toast =document.getElementById('mensaje_Error');//Toast (Tostadora) es una analogía de lo que hace el mensaje.
  toast.textContent=msj;                          
  toast.classList.add('mostrar');
  toast.style.backgroundColor="red";
  //Le agreo la clase mostrar a toast
  setTimeout(() => toast.classList.remove('mostrar'), 1000);
  //Especifico cuanto tiempo se va a mostrar el mensaje.
  //y le saco la clase que le agregue.


}
