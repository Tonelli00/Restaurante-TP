


export function loadOrders()
{

const orderItems = document.getElementById('order-items');
if(!orderItems){return;}
orderItems.innerHTML='';
fetch('https://localhost:7105/api/v1/Order').
then(response => response.json()).
then(orders=>
 {
    orders.forEach(order => 
    {
    if(order.status.id<5)
        {
            const card = createOrderCard(order);
      orderItems.appendChild(card);
        }
      
    });
});


}
    


function createOrderCard(order)
{
   
    const ordercard = document.createElement('div');
    ordercard.className='OrderCard';

    const container = document.createElement('div');
    container.className='Container';

   
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


    container.appendChild(orderNMB);
    container.appendChild(orderStatus);
    container.appendChild(price);
    container.appendChild(deliveryType_);
    container.appendChild(SeeOrder);
    ordercard.appendChild(container);

    SeeOrder.onclick=()=>
        {
            const detailDisplay = document.getElementById('order-detail-display');
            detailDisplay.classList.add('show');
            orderDetails(order);
       

        }       
         return ordercard;
}



function orderDetails(order)
{   const orderdetailcontent = document.getElementById('order-detail-content');
    const closeDetail = document.getElementById('close-detail');
    const detailbody = document.getElementById('order-detail-body');

    detailbody.innerHTML='';
    
    //Creo el titulo
    const title = document.createElement('div');
    title.className='title';

    const titlecontent = document.createElement('h1');
    titlecontent.textContent='Orden '+order.orderNumber;
    
    title.appendChild(titlecontent);
    title.appendChild(closeDetail);
    detailbody.appendChild(title);

    const items = order.items;
    items.forEach(item =>
        {
            const card = document.createElement('div');
            card.className="card";

           

            const img = document.createElement('img');
            img.className="imagen";
            img.src=item.dish.image;
            img.alt=item.dish.name;

        
                            
            const contenedor = document.createElement('div');
            contenedor.className='contenedor';
            const name = document.createElement('h3');
            name.textContent=item.dish.name;
            const quantity_ = document.createElement('h3');
            quantity_.textContent="Cantidad:"+item.quantity;
            const notes=document.createElement('h3');
            if(item.notes=="")
                {
                    notes.textContent="Notas:Sin nota";
                }
            else{notes.textContent="Nota:"+item.notes;}
            
            //En caso de que no se pueda traer la imagen
                
            img.onerror = () => {
                img.style.display = "none";
                const errorh2 = document.createElement('h2');
                errorh2.textContent = "Error al cargar imagen";
                card.appendChild(errorh2);
            };


            contenedor.appendChild(name);
            contenedor.appendChild(quantity_);
            contenedor.appendChild(notes);
            
            
           
            card.appendChild(img);
            card.appendChild(contenedor);
            
            
            detailbody.appendChild(card); 
          
        });
        const existAddDish = document.querySelector('#order-detail-content .AddDishDiv');
        if(!existAddDish)
            {
            //Si no existe, lo creo
            const AddDishDiv = document.createElement('div');
            AddDishDiv.className='AddDishDiv';
            const addDish = document.createElement('button');
            addDish.textContent='Agregar plato';
            addDish.className='AddBTN';
            
            addDish.onclick=(event)=>
                {
                    event.preventDefault();
                    localStorage.setItem("orderToEdit", order.orderNumber);//Guardo el numero de orden 
                    window.location.href='AddDish.html'; //Me voy a la pagina para agg plato
                }
            AddDishDiv.appendChild(addDish);
            orderdetailcontent.appendChild(AddDishDiv);
            }
            else
                {
                existAddDish.onclick=(event)=>
                {
                    event.preventDefault();
                    localStorage.setItem("orderToEdit", order.orderNumber);//Guardo el numero de orden 
                    window.location.href='AddDish.html'; //Me voy a la pagina para agg plato
                }

                }
        closeDetail.onclick=()=>
            {
                document.getElementById('order-detail-display').classList.remove('show');
            }
            

}

export async function updateDishes(dishes,orderId)
{

    const items_ = dishes.map(dish=>
        ({
            id:dish.id,
            quantity:dish.quantity||1,
            notes:dish.notes || "",
        }));

    const body = 
    {
        items:items_
    };

    const response = await  fetch(`https://localhost:7105/api/v1/Order/${orderId}`,
        {
            method:'PUT',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(body)

        });

   
    
    dishes.length=0;
    
    
    localStorage.setItem("orderUpdated", orderId); // <- señalo que se actualizó
    window.location.href='menu.html';
}





