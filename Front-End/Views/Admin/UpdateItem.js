import { PatchData } from "../Global/ApiService.js";
import { toast } from "../Global/GlobalToast.js";

export async function updateItemStatus(itemId,OrderId,StatusId)
{
    const Endpointurl=`api/v1/Order/${OrderId}/item/${itemId}`;

    const newStatus=
    {
        status:StatusId
    };

    const response = await PatchData(Endpointurl,newStatus);

    if(response.ok)
        {
        toast("Se realizaron los cambios con éxito...","good");

        setTimeout(() => {
            const updateModal=document.getElementById('updateModal');
            updateModal.classList.remove('active');
            document.body.classList.remove('ActiveModal');
        }, 1800);
        console.log('se ejecuto el toast');
        }
        else{ 
            toast("No se pudieron realizar los cambios, intente nuevamente...","bad");
            setTimeout(() => {
                const updateModal=document.getElementById('updateModal');
                updateModal.classList.remove('active');
                document.body.classList.remove('ActiveModal');
            }, 1800);
      }


}