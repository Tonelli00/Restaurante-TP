import { toast } from "../Global/GlobalToast.js";
import { CreateOrder } from "../Order/CreateOrder.js";
import { UpdateOrder } from "../Order/UpdateOrder.js";
import { resumeInfo } from "./CartResumeInfo.js";

document.addEventListener("DOMContentLoaded", () => {
    resumeInfo();
    DoOrder();  
    const params= new URLSearchParams(window.location.search);
    const act = params.get("act");
    
    const btn = document.querySelector(".btn");
    if (btn && act!=='agg') btn.disabled = true;
});

export function AddElement(dish)
{
 const params= new URLSearchParams(window.location.search);
 const act = params.get("act");
 if(act!=='agg')
    {
        const cartCounter = document.querySelector('.cart-counter');
        let cartContent = JSON.parse(localStorage.getItem("CartContent")) || [];

        const item = cartContent.find(i=>i.dish.id==dish.id);

        if(item)
            {
                item.quantity++;
            } 
            else
                {
                    cartContent.push(
                        {
                            dish:dish,
                            quantity:1,
                            notes:null
                        });
                }
        const totalItems = cartContent.reduce((sum, i) => sum + i.quantity, 0)    
        cartCounter.textContent=totalItems;

        localStorage.setItem("CartContent",JSON.stringify(cartContent));
        resumeInfo();
    }
    else
        {
        const cartCounter = document.querySelector('.cart-counter');
        let cartContent = JSON.parse(localStorage.getItem("UpdateOrder")) || [];

        const item = cartContent.find(i=>i.dish.id==dish.id);

        if(item)
            {
                item.quantity++;
            } 
            else
                {
                cartContent.push(
                        {
                            dish:dish,
                            quantity:1,
                            notes:null
                        });
                }
        const totalItems = cartContent.reduce((sum, i) => sum + i.quantity, 0)    
        cartCounter.textContent=totalItems;

        localStorage.setItem("UpdateOrder",JSON.stringify(cartContent));
        resumeInfo();   
        }

}


export function IncElement(item,dishprice,dishQuantity)
{
    const params= new URLSearchParams(window.location.search);
    const act = params.get("act");
    if(act!=='agg')
    {
    const cart = JSON.parse(localStorage.getItem("CartContent"));
    const storedItem = cart.find(i=>i.dish.id==item.dish.id);
    if(storedItem)
        {
            storedItem.quantity++;
        }
    item.quantity=storedItem.quantity;   
    dishprice.textContent="$"+parseInt(item.dish.price*item.quantity);     
    dishQuantity.textContent=item.quantity;
    localStorage.setItem("CartContent",JSON.stringify(cart));
    resumeInfo();
    }
    else
        {
            const cart = JSON.parse(localStorage.getItem("UpdateOrder"));
            const storedItem = cart.find(i=>i.dish.id==item.dish.id);
            if(storedItem)
                {
                    storedItem.quantity++;
                }
            item.quantity=storedItem.quantity;   
            dishprice.textContent="$"+parseInt(item.dish.price*item.quantity);     
            dishQuantity.textContent=item.quantity;
            localStorage.setItem("UpdateOrder",JSON.stringify(cart));
            resumeInfo();            
        }
   
}

export function DecElement(item,dishprice,dishQuantity)
{
    const params= new URLSearchParams(window.location.search);
    const act = params.get("act");
    if(act!=='agg')
    {
        const cart = JSON.parse(localStorage.getItem("CartContent"));
        const storedItem = cart.find(i=>i.dish.id==item.dish.id);
        if(storedItem && storedItem.quantity>1)
            {
                storedItem.quantity--;
            }
        
        item.quantity=storedItem.quantity;   
        dishprice.textContent="$"+parseInt(item.dish.price*item.quantity);   
        dishQuantity.textContent=item.quantity;
        localStorage.setItem("CartContent",JSON.stringify(cart));
        resumeInfo();
    }
    else
        {
        const cart = JSON.parse(localStorage.getItem("UpdateOrder"));
        const storedItem = cart.find(i=>i.dish.id==item.dish.id);
        if(storedItem && storedItem.quantity>1)
            {
                storedItem.quantity--;
            }
        
        item.quantity=storedItem.quantity;   
        dishprice.textContent="$"+parseInt(item.dish.price*item.quantity);   
        dishQuantity.textContent=item.quantity;
        localStorage.setItem("UpdateOrder",JSON.stringify(cart));
        resumeInfo();
        }
}

export function deleteDish(item)
{
    const params= new URLSearchParams(window.location.search);
    const act = params.get("act");
    if(act!=='agg')
    {
        let cart = JSON.parse(localStorage.getItem("CartContent")); 
        const id=item.dish.id;
        cart = cart.filter(item=>item.dish.id !== id);
        localStorage.setItem("CartContent",JSON.stringify(cart));
        resumeInfo();
    }
    else{
        let cart = JSON.parse(localStorage.getItem("UpdateOrder")); 
        const id=item.dish.id;
        cart = cart.filter(item=>item.dish.id !== id);
        localStorage.setItem("UpdateOrder",JSON.stringify(cart));
        resumeInfo();
    }
}

function DoOrder()
{
    const btn = document.querySelector(".btn");
    const params= new URLSearchParams(window.location.search);
    const act = params.get("act");
    if(btn && act!=='agg')
    {
        btn.addEventListener('click',()=>
        {
            CreateOrder();
            
        });
    }
    else
        {
        if(btn)
        {
        btn.addEventListener('click',()=>
        {
         
            UpdateOrder();
        });
        }
        }
    
}

export function emptyCart()
{
    const cartContent = document.querySelector(".CartResume");
    cartContent.classList.add('empty');
    cartContent.innerHTML='';
    
    const mensagediv=document.createElement('div');
    mensagediv.className='emptymsj';

    const tittle = document.createElement('h1');
    tittle.textContent='Tu carrito está vacío';
    const text = document.createElement('p');
    text.textContent="Explora nuestro menú y agrega tus platos favoritos";

    const menuBtn = document.createElement('button');
    menuBtn.className='btn_';

    menuBtn.textContent="← VER MENÚ";
    menuBtn.addEventListener('click',()=>
        {  
        const params= new URLSearchParams(window.location.search);
        const act = params.get("act");
            if(act==='agg')
            {
                 location.href='Menu.html?act=agg';
            }
            else
            {
                 location.href='Menu.html';
            }
            
        });

    const emptycartImg = document.createElement('img');
    emptycartImg.src="Components/Images/empty-cart.png";
    
    mensagediv.appendChild(emptycartImg);
    mensagediv.appendChild(tittle);
    mensagediv.appendChild(text);
    mensagediv.appendChild(menuBtn);

    cartContent.appendChild(mensagediv);
}
