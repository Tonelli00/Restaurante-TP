import { getAllDeliveries } from "./GetDeliveries.js";

async function DeliveryOptions()
{
    const notes = document.querySelector(".notes");
    const deliveryOptionsDiv = document.querySelector(".DeliveryOptions");
    const options = await getAllDeliveries();
    
    options.forEach((delivery) => 
    {

        const option = document.createElement('label');
        option.htmlFor=delivery.id;

        const optionInput = document.createElement('input');
        optionInput.className="optionInput";
        optionInput.type="radio";
        optionInput.id=delivery.id;
        optionInput.name="DeliveryOption";

        option.appendChild(optionInput);
        option.append(delivery.name);

        deliveryOptionsDiv.appendChild(option);

        optionInput.addEventListener('change',()=>
            {   
                document.querySelectorAll('.DeliveryInfo').forEach(Info => Info.remove());
               
                document.querySelectorAll('.DeliveryOptions label').forEach(label =>label.classList.add('hidden'));
                option.classList.remove('hidden');
               
                if(optionInput.id === "1" )
                    {
                        optionInput.classList.remove('hidden');
                        const DeliveryInfo = document.createElement('div');
                        DeliveryInfo.className = 'DeliveryInfo';

                        const ToInput=document.createElement('input');
                        ToInput.className='ToInput';
                        ToInput.type="text";
                        ToInput.placeholder="Ingrese la dirección";
                        DeliveryInfo.appendChild(ToInput);
                        option.appendChild(DeliveryInfo);
                    }
                    else{optionInput.classList.remove('hidden');}

                const notesdiv = document.createElement('div');
                notesdiv.className="notesdiv";
                const notesInput = document.createElement('input');
                notesInput.className='OrderNotes';
                notesInput.type='text';
                notesInput.name='notes';
                notesInput.placeholder='Notas sobre el pedido (Opcional)';
                
                notesdiv.appendChild(notesInput);
                notes.appendChild(notesdiv);


            });
    });


    

}
DeliveryOptions();