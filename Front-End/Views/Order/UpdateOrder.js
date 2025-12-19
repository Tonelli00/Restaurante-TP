import { PutData } from "../Global/ApiService.js";
import { toast } from "../Global/GlobalToast.js";

export async function UpdateOrder()
{
    const dishes =JSON.parse(localStorage.getItem('UpdateOrder'));
    const OrderId =localStorage.getItem('OrderID');
    const Endpointurl=`api/v1/Order/${OrderId}`;
    console.log(dishes);
    const itemsData = dishes.map(item =>
        ({
            id:item.dish.id,
            quantity:Number(item.quantity),
            notes:item.notes||"No hay nota para el plato"
        }));

    const data = {
    items: itemsData
   };
    const response = await PutData(Endpointurl,data);
    if(response.ok)
        {
            toast("La orden fue actualizada correctamente","good");
            localStorage.removeItem('OrderID'); 
            localStorage.removeItem('UpdateOrder'); 
            setTimeout(()=>
            {
            location.href='MyOrders.html';
            },900);
            }
            else
            {   
                toast("Ocurrio un error inesperado, intentelo nuevamente...","bad");
            }

}