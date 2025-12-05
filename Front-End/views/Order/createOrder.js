export async function createOrder(dishlist,delivery,ordernotes)//Va a recibir una lista de platos y crea la orden
{
    const items_ = dishlist.map(dish=>
        ({
            id:dish.id,
            quantity:dish.quantity||1,
            notes:dish.notes || "",
        }));

    const deliverydata = 
    {   
        id:delivery.id,
        to:delivery.to,

    }; 
    const order=
       {
        items:items_,
        delivery:deliverydata,
        notes:ordernotes,
       };

        
        const response = await fetch('https://localhost:7105/api/v1/Order',
        {
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(order)
        });


        const orderResponse = await response.json();
        const msj = "NRO de orden:#"+orderResponse.orderNumber;
        toast(msj);
        return orderResponse;
        
       
 

}


function toast(msj)
{
  const mensaje =document.getElementById('mensaje');;//Toast (Tostadora) es una analogía de lo que hace el mensaje.
    
  
  mensaje.textContent="Orden creada correctamente "+msj;                          
  mensaje.classList.add('mostrar');
  //Le agreo la clase mostrar a toast
  setTimeout(() => mensaje.classList.remove('mostrar'), 1500);
  //Especifico cuanto tiempo se va a mostrar el mensaje.
  //y le saco la clase que le agregue.

}