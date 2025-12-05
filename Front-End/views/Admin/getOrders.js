import { statuses } from "../status/getStatus.js";

const activeOrders = document.getElementById('activeOrders');
const inactiveOrders = document.getElementById('InactiveOrders');
loadActiveOrders();
loadInactiveOrders();
//https://localhost:7105/api/v1/Order
//https://localhost:7105/api/v1/Order?status=5


async function loadActiveOrders()
{
    activeOrders.innerHTML='';


    fetch('https://localhost:7105/api/v1/Order')
    .then(response=>response.json())
    .then(orders=>
        {
        
            orders.forEach(order => {
                if(order.status.id<5)
                {
            const ordercard = document.createElement('div');
            ordercard.className='OrderCard';

            const container = document.createElement('div');
            container.className='order_container';

            const orderNMB= document.createElement('h1');
            orderNMB.textContent="Orden:"+order.orderNumber;

            const orderStatus= document.createElement('h2');
            orderStatus.textContent="Estado:"+order.status.name;
            const price= document.createElement('h2');
            price.textContent="Precio:$"+order.totalAmount;
            
            const deliveryType_= document.createElement('h2');
            deliveryType_.textContent="Tipo de entrega:"+order.deliveryType.name;



            
            const SeeOrder = document.createElement('button');
            SeeOrder.className='seeOrderBTN';
            SeeOrder.textContent='Ver orden';
            
            SeeOrder.addEventListener('click',()=>
                {
                    document.getElementById('order-detail-display').classList.add('show');
                    document.body.classList.add('displaytrue');
                    orderModal(order);
                });

            container.appendChild(orderNMB);
            container.appendChild(orderStatus);
            container.appendChild(price);
            container.appendChild(deliveryType_);
            container.appendChild(SeeOrder);
            ordercard.appendChild(container);

            activeOrders.appendChild(ordercard);
                        
                }

           


                
            });

        });
}

async function loadInactiveOrders(){
    inactiveOrders.innerHTML='';
    fetch('https://localhost:7105/api/v1/Order?status=5')
    .then(response=>response.json())
    .then(orders=>
        {   
            if(orders.length==0)
                {
                const ordercard = document.createElement('div');
                ordercard.className='OrderCard';

                const container = document.createElement('div');
                container.className='order_container';

                const msj= document.createElement('h1');
                msj.textContent="No hay ordenes inactivas.";
                
                container.appendChild(msj);
                ordercard.appendChild(container);

                inactiveOrders.appendChild(ordercard);

                }
            orders.forEach(order => {

            const ordercard = document.createElement('div');
            ordercard.className='OrderCard';

            const container = document.createElement('div');
            container.className='order_container';

            const orderNMB= document.createElement('h1');
            orderNMB.textContent="Orden:"+order.orderNumber;

            const orderStatus= document.createElement('h2');
            orderStatus.textContent="Estado:"+order.status.name;
            const price= document.createElement('h2');
            price.textContent="Precio:$"+order.totalAmount;
            
            const deliveryType_= document.createElement('h2');
            deliveryType_.textContent="Tipo de entrega:"+order.deliveryType.name;

            container.appendChild(orderNMB);
            container.appendChild(orderStatus);
            container.appendChild(price);
            container.appendChild(deliveryType_);
            ordercard.appendChild(container);

            inactiveOrders.appendChild(ordercard);


                
            });

        });
    
}


async function orderModal(order)
{

    const detailbody = document.getElementById('order-detail-body'); 
    detailbody.innerHTML='';
    
    const title = document.createElement('h1');
    title.className='title';
    title.textContent='Orden '+order.orderNumber;
    detailbody.appendChild(title);

    let changestatus;

    const closeDetail = document.getElementById('close-detail');

    closeDetail.addEventListener('click',()=>
        {
            document.getElementById('order-detail-display').classList.remove('show');
            document.body.classList.remove('displaytrue');
        });


        const confirmButton = document.createElement('button');
        confirmButton.className='confirmStatus';
        confirmButton.textContent='Cambiar estados';

    const items = order.items;
    const Allstatuses = await statuses();



    items.forEach(item =>
        {
            const card = document.createElement('div');
            card.className="card";

            const statusSelect = document.createElement('select');
            statusSelect.className='status';
            
            const option = document.createElement('option');
            option.textContent=item.status.name;
            option.value=item.status.id;
            statusSelect.appendChild(option);
          
            Allstatuses.forEach(status => 
                {
                    const statusOption=document.createElement('option');
                    statusOption.value=status.id;
                    statusOption.textContent=status.name;
                    statusSelect.appendChild(statusOption);
                });

       
        
                            
            const contenedor = document.createElement('div');
            contenedor.className='contenedor';
            const name = document.createElement('h3');
            name.textContent=item.dish.name;
            const quantity_ = document.createElement('h3');
            quantity_.textContent=item.quantity;

            contenedor.appendChild(name);
            contenedor.appendChild(quantity_);
            contenedor.appendChild(statusSelect);
            
            card.appendChild(contenedor);

            
            detailbody.appendChild(card); 
        });
        confirmButton.addEventListener('click',async ()=>
        {
          const cards = detailbody.querySelectorAll('.card');
          const updates = [];

          for(let index = 0; index<cards.length;index++)
            {
                const card = cards[index];
                const statusSelect = card.querySelector('.status');
                changestatus=Number(statusSelect.value);
                if(items[index].status.id>changestatus)
                    {
                        toastError("No se puede cambiar a un estado previo.");
                        return;

                    }
                if(items[index].status.id===changestatus){continue;}
                updates.push(
                    {
                        
                        itemId:items[index].id,
                        status:changestatus,
                    });    

            }  


         
            
          await updateStatus(order.orderNumber,updates);
          await loadActiveOrders();
          await loadInactiveOrders();
                } );   


        detailbody.appendChild(confirmButton);
            
}

async function updateStatus(orderId,itemsToUpdate)
{
    try
    {
    for(const item of itemsToUpdate)
        {
            await fetch(`https://localhost:7105/api/v1/Order/${orderId}/Item/${item.itemId}`,
                {
                    method:'PATCH',
                    headers:{'Content-Type':'application/json'},
                    body:JSON.stringify({status:item.status}),
                });
              
        };  
        toast();   
    }
    catch(error)
    {

        toastError("Intentelo nuevamente.");
    }
    
}

function toast()
{
  const toast =document.getElementById('mensaje');//Toast (Tostadora) es una analogía de lo que hace el mensaje.
  toast.textContent="Items actualizados correctamente";                          
  toast.classList.add('mostrar');
  //Le agreo la clase mostrar a toast
  setTimeout(() => toast.classList.remove('mostrar'), 1000);
  //Especifico cuanto tiempo se va a mostrar el mensaje.
  //y le saco la clase que le agregue.

}


function toastError(msj)
{
  const toast =document.getElementById('errormensaje');//Toast (Tostadora) es una analogía de lo que hace el mensaje.
  toast.textContent="Operación fallida. "+msj;                          
  toast.classList.add('mostrar');
  //Le agreo la clase mostrar a toast
  setTimeout(() => toast.classList.remove('mostrar'), 1000);
  //Especifico cuanto tiempo se va a mostrar el mensaje.
  //y le saco la clase que le agregue.    

}