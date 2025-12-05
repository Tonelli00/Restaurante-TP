import { loadOrders } from "./WatchOrders.js";

displayModal();
function displayModal()
{
    document.addEventListener('DOMContentLoaded', () => 
        {
    const closebtn = document.getElementById('orderclose-btn_');
    const displayBTN=document.querySelector('.MyOrders');
    const display = document.getElementById('order-display');

    displayBTN.addEventListener('click',(event)=>
        {
            event.preventDefault();
            display.classList.add('show');
            document.body.classList.add('displaytrue');
            loadOrders();


        });
    closebtn.addEventListener('click',()=>
        {
            display.classList.remove('show');
            document.body.classList.remove('displaytrue');
        });


        });
    
}

