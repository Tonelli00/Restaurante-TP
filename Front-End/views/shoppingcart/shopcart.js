import { createOrder } from "../Order/createOrder.js";
import { deliverys } from "../delivery/getDeliveryType.js";
import { updateDishes,loadOrders } from "../Order/WatchOrders.js";

document.addEventListener('DOMContentLoaded',()=>
    {
const cartIcon=document.getElementById("cart-icon");
const closebtn=document.getElementById("close-btn_");   
const updatedOrdernumber = localStorage.getItem('orderUpdated');
 if(updatedOrdernumber) //Si hubo una actualizacion, borro todo.
    {
        loadOrders();
        toast(updatedOrdernumber);
        localStorage.removeItem('orderUpdated');
        localStorage.removeItem("orderToEdit");

        
    }


const orderBtn = document.querySelectorAll('.orderBtn');
const page = window.location.pathname.split("/").pop();        
orderBtn.forEach(btn=>
    {
    if(page==="menu.html")
        {
        btn.addEventListener('click',(event)=>
        {
        event.preventDefault();//Evita el comportamiento default
        opencart();
        });

        }
    if(page==="AddDish.html")
        {
            btn.addEventListener('click',(event)=>
            {
                event.preventDefault();
                window.location.href='menu.html';

            });

        }    
    
    });


    

cartIcon.addEventListener('click',(event)=>
    {
        event.preventDefault();//Evita el comportamiento default
        opencart();
    });

closebtn.addEventListener('click',()=>
    {
        closeCart();
    });  
        
    });

function opencart()
{
    const cartDisplay=document.getElementById("cart-display");  
    cartDisplay.classList.add('show');
    document.body.classList.add('displaytrue');
}
function closeCart()
{
    const cartDisplay=document.getElementById("cart-display");  
    cartDisplay.classList.remove('show');
    document.body.classList.remove('displaytrue');

}

//Logica del carrito...

let count = 0; //Defino una variable global que va a contener la cantidad de elemtnso que tenga 
//el carrito
let dishes=[];




export function new_Element(dish)
{
console.log(dish.id);
const copyDish={...dish,quantity:Number(dish.quantity)}; //Esto copia todas las propiedades del plato. y es ind
//Lo hago porque sino se sobreescribia con los que tenia. Ya que el primer objeto es el concreto y los demas son referencias. 
console.log(copyDish.id);
dish.quantity =Number(copyDish.quantity);
const existDish = dishes.find(d=>d.id==copyDish.id );
if(existDish)
    {
        existDish.quantity=Number(existDish.quantity)+Number(copyDish.quantity);

    }
    else
        {
            dishes.push(copyDish); 
        }


count=dishes.reduce((acc, d) => acc + (Number(d.quantity)), 0);
createDishes();
updateCart();

}

function updateCart()
{

const counter = document.getElementById("car-counter");

count=dishes.reduce((acc, d) => acc + (Number(d.quantity)), 0);

counter.textContent=count;

}               

document.addEventListener("DOMContentLoaded", createDishes);

export function createDishes() 
{ 
       
         
    const content = document.getElementById('cart-content');
    const notes = document.querySelector('.orderNotes');
    notes.innerHTML='';
    const Dishcard = renderDishes();
    const existOrderBTN = content.querySelector('.orderBtn');
    if(dishes.length==0)
        {
            if(notes)
            {
                 notes.classList.remove('show');
            }
            if(existOrderBTN)
                {   
                  
                   existOrderBTN.remove();
     
                }   
        }
    else
        {
            
            if(notes)
            {
                 notes.classList.add('show');
            }
            if(!existOrderBTN)
                {
                    
                    content.appendChild(doOrderbtn(dishes));
                }
            
            
        }
    
    
    const totalPrice = content.querySelector(".price") || document.createElement('h2');
    totalPrice.className='price';
    totalPrice.textContent="Total=$"+priceCalculate();
    
    
    content.appendChild(totalPrice);
   

    
   
    return Dishcard;
        

}

function renderDishes()// Logica para crear los elementos adentro del carrito
{
    const card = document.getElementById('cart-items');
    card.innerHTML='';
  
    if(dishes.length==0)
    {
     const mensaje = document.createElement("h2");
     mensaje.className="empty-cart";
     mensaje.textContent="El carrito está vacío...";
    

     card.appendChild(mensaje);  
    }
    else
        {
        dishes.forEach(dish=>
        {
            const dishCard = document.createElement('div');
            dishCard.className="Dish-Card";
            const conteiner= document.createElement('div');
            conteiner.className="conteiner";
            const dishName = document.createElement('h2');
            dishName.className="Dish-Name";
            dishName.textContent=dish.name;

            const dishPrice = document.createElement('h2');
            dishPrice.className="Dish-Price";
            dishPrice.textContent="$"+dish.price;    
            
            const dishQuantity = document.createElement('h2');
            dishQuantity.textContent=dish.quantity;

            const dishImage=document.createElement('img');
            dishImage.src=dish.image;
            dishImage.alt=dish.Name;
            dishImage.className="Dish-Image";

            const removeDishbtn = document.createElement('button');

            removeDishbtn.textContent="Eliminar plato";
            removeDishbtn.style.borderRadius="8px";
            removeDishbtn.style.padding="0.2rem";
            removeDishbtn.style.backgroundColor="red";
            removeDishbtn.style.cursor='pointer';
             
            const removeOneDishbtn = document.createElement('button');

            removeOneDishbtn.textContent="Eliminar un plato ";
            removeOneDishbtn.style.borderRadius="8px";
            removeOneDishbtn.style.padding="0.2rem";
            removeOneDishbtn.style.backgroundColor="red";
            removeOneDishbtn.style.cursor='pointer';

            removeDishbtn.onclick=()=>
                {
                    removeDish(dish,2);
                    
                    createDishes();
                    
                    updateCart();

                }
            removeOneDishbtn.onclick=()=>
                {
                    removeDish(dish,1);
                    
                    createDishes();
                    
                    updateCart();

                }
           

            conteiner.appendChild(dishName);
            conteiner.appendChild(dishPrice);
            conteiner.appendChild(dishQuantity);
            conteiner.appendChild(removeDishbtn);
            conteiner.appendChild(removeOneDishbtn);
            dishCard.appendChild(dishImage);
            dishCard.appendChild(conteiner);
            card.appendChild(dishCard);
        });
      

        }  
            return card;

}




function removeDish(dishToRemove,typeOfRemove)
{
    if(typeOfRemove==2)
        {
        dishes.forEach((dish,index)=>
        {
            if(dish == dishToRemove)
                {
                    dishes.splice(index,1);
                    count = dishes.reduce((acc, dish) => acc + Number(dish.quantity), 0);
                }

        });
        }
        else
            {
                 dishes.forEach((dish,index)=>
                {
                    if(dish == dishToRemove)
                        {
                            if(dish.quantity>1)
                                {
                                    dish.quantity=Number(dish.quantity)-1;
                                    count = dishes.reduce((acc, dish) => acc + Number(dish.quantity), 0);
                                }
                                else
                                    {
                                        dishes.splice(index,1);
                                        count = dishes.reduce((acc, dish) => acc + Number(dish.quantity), 0);
                                    }
                            
                        }

                });

            }
    

}

 function  doOrderbtn(dishes)
{
    const orderBtn = document.createElement('button');

    const notes = document.getElementById('orderNotes');   

    let order;

    const page = window.location.pathname.split("/").pop();


    if(page==="menu.html")
    {
        
    orderBtn.className='orderBtn';

    orderBtn.textContent="Finalizar orden";
    orderBtn.style.padding="1rem";
    orderBtn.style.marginBottom="1rem";
    orderBtn.style.justifyContent="center";
    orderBtn.style.alignItems="center";

    orderBtn.style.borderRadius="1rem";
    orderBtn.style.backgroundColor="white";
  
    
    orderBtn.addEventListener("mouseenter", () => {
    orderBtn.style.backgroundColor = "lightgreen";
    orderBtn.style.transition="ease-out 0.2s";
    });

    orderBtn.addEventListener("mouseleave", () => {
    orderBtn.style.backgroundColor = "white"; // vuelve al color original
    });
        
        orderBtn.addEventListener('click',async ()=>{
        //Logica para elegir delivery.    
        const delivery = await deliverys();
        

        order = await createOrder(dishes,delivery,notes.value);
        
        dishes.length=0;
        updateCart();
        createDishes();
    });
    }
    if(page === "AddDish.html") //Si estoy en la pagina para agg plato 
        {
        orderBtn.className='orderBtn';

        orderBtn.textContent="Agregar plato";
            
        orderBtn.style.padding="1rem";
        orderBtn.style.marginBottom="1rem";
        orderBtn.style.justifyContent="center";
        orderBtn.style.alignItems="center";

        orderBtn.style.borderRadius="1rem";
        orderBtn.style.backgroundColor="white";
    
        
        orderBtn.addEventListener("mouseenter", () => {
        orderBtn.style.backgroundColor = "lightgreen";
        orderBtn.style.transition="ease-out 0.2s";
        });

        orderBtn.addEventListener("mouseleave", () => {
        orderBtn.style.backgroundColor = "white"; // vuelve al color original
        });
        notes.style.display='none';

        orderBtn.addEventListener("click", () => {
        const orderNumber = Number(localStorage.getItem("orderToEdit"));  //Obtengo el numero de orden que guarde
        updateDishes(dishes,orderNumber); 

        
        });
   


        }    
    
    return orderBtn;

}

function toast(msj)
{
  const mensaje =document.getElementById('mensaje');;//Toast (Tostadora) es una analogía de lo que hace el mensaje.
    
  
  mensaje.textContent="Orden:"+msj+" se actualizó correctamente ";                          
  mensaje.classList.add('mostrar');
  //Le agreo la clase mostrar a toast
  setTimeout(() => mensaje.classList.remove('mostrar'), 1500);
  //Especifico cuanto tiempo se va a mostrar el mensaje.
  //y le saco la clase que le agregue.

}




function priceCalculate()
{
    let actualprice =0;
    dishes.forEach(dish=>
        {
            if(dish.quantity>1)
                {
                    actualprice+=dish.price*dish.quantity;

                }
                else{ actualprice +=dish.price;}
           
        });
    return actualprice;
}
