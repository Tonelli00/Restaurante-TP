import {PostData} from "../Global/ApiService.js";


export async function CreateOrder(){
    const Endpointurl="api/v1/Order";
    const elements =JSON.parse(localStorage.getItem('CartContent'));
    const optionInput = document.querySelector( 'input[name="DeliveryOption"]:checked');
   
    const itemsData = elements.map(item =>
        ({
            id:item.dish.id,
            quantity:Number(item.quantity),
            notes:item.notes||"No hay nota para el plato"
        }));



   let deliverydata=
   {
    id:Number(optionInput.id),
    to:""
   };
    

    if(optionInput.id==="1")
        {
            const deliveryTo=document.querySelector(".ToInput");
            deliverydata.to=deliveryTo.value;
        }
       
    const OrderNotes = document.querySelector(".OrderNotes");    
    
    const order = 
    {
        items:itemsData,
        delivery:deliverydata,
        notes:OrderNotes.value || "No hay nota acerca del pedido"
    }

    PostData(Endpointurl,order);
    localStorage.removeItem('CartContent');
    location.reload();

}
