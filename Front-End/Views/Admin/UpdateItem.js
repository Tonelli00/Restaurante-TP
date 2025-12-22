import { PatchData } from "../Global/ApiService.js";
import  {toast} from "../Global/GlobalToast.js";

export async function updateItemStatus(itemId,OrderId,StatusId)
{   const modalDiv = document.getElementById('updateModal');
    const Endpointurl=`api/v1/Order/${OrderId}/item/${itemId}`;
    console.log(itemId);
    console.log(OrderId);
    console.log(StatusId);

    const newStatus=
    {
        status:StatusId
    };
    
    const result = await PatchData(Endpointurl,newStatus);
    
    if(result.ok)
        {
        modalDiv.classList.remove('active');
        document.body.classList.remove('ActiveModal');  
        toast("Se realizaron los cambios con éxito...","good");
        
        setTimeout(() => {       
        location.reload();
             }, 1700);    
        }
        
        else
        {
            modalDiv.classList.remove('active');
            document.body.classList.remove('ActiveModal');  
                
            setTimeout(() => {
            toast("No se pudieron realizar lo cambios, intente nuevamente...","bad");
            }, 1500);
            return {ok:false}
        }
    
}