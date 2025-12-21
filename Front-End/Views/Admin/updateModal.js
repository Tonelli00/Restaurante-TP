import { GetStatuses } from "../Status/GetAllStatuses.js";
import { updateItemStatus } from "./UpdateItem.js";
import { StatusTranslate } from "../Status/StatusTranslater.js";
export async function updateModal(item,orderNumber)
{
    console.log(item);
    console.log(orderNumber);
    const modalDiv = document.getElementById('updateModal');
    const contentDiv = document.querySelector('.modalContent');
    const headerModal  =document.querySelector('.modalHeader');
    headerModal.innerHTML='';

    const closeBtn = document.createElement('button');
    closeBtn.className= "closeBtn";
    closeBtn.textContent='X';

    headerModal.appendChild(closeBtn);

    modalDiv.classList.add('active');
    document.body.classList.add('ActiveModal');

    contentDiv.innerHTML='';
    
    closeBtn.addEventListener('click',()=>
        {
            modalDiv.classList.remove('active');
            document.body.classList.remove('ActiveModal');    
        }); 
 
    const orderContent = document.createElement('div');
    orderContent.className='OrderContent';
    
    const tittleDiv =document.createElement('div');
    tittleDiv.className='tittleDiv';
    const tittle = document.createElement('h1');
    tittle.textContent='Editar estado';
    tittleDiv.appendChild(tittle);

    const dishInfo = document.createElement('div');
    dishInfo.className='dishInfo';
    const dishName = document.createElement('p');
    dishName.textContent=item.dish.name;
    const dishStatus = document.createElement('p');
    dishStatus.className='dishStatus';
    dishStatus.textContent='Estado actual:'+StatusTranslate(item.status.name);

    const statuses = await GetStatuses();
    const statusText = document.createElement('p');
    statusText.textContent='Seleccione el nuevo estado';
    statusText.className='dishStatus';
    const btnDiv = document.createElement('div');
    btnDiv.className='btnDiv';
   
    let statusIdSelected = null;

    statuses.forEach(status => 
    {
        const statusBtn=document.createElement('button');
        statusBtn.textContent=StatusTranslate(status.name);
        statusBtn.value=status.id;
        statusBtn.addEventListener('click',(e)=>
            {
                btnDiv.querySelectorAll('button').forEach(btn => btn.classList.remove('focus'));  
                statusBtn.classList.add('focus');  
                statusIdSelected=Number(statusBtn.value);
            });
      
           
       
        btnDiv.appendChild(statusBtn);
        
    });

    const saveChangebtn=document.createElement('button');
    saveChangebtn.className='btn'; 
    saveChangebtn.type='button';
    saveChangebtn.textContent='Guardar cambios';
    saveChangebtn.addEventListener('click',async (e)=>
        {
            e.preventDefault();
            if(statusIdSelected==null)
                {
                    alert('selecciona un estado');
                    return;
                }
            
            const result = await updateItemStatus(item.id,orderNumber,statusIdSelected);
                
            statusIdSelected=null;
            console.log("LLego aca",result);
        });

    
    dishInfo.appendChild(dishName);
    dishInfo.appendChild(dishStatus);
    dishInfo.appendChild(statusText);
    dishInfo.appendChild(btnDiv);   
    dishInfo.appendChild(saveChangebtn);

    headerModal.appendChild(tittleDiv);


    contentDiv.appendChild(dishInfo);
    contentDiv.appendChild(orderContent);



}