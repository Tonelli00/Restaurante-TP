import { GetStatuses } from "../Status/GetAllStatuses.js";
import { updateItemStatus } from "./UpdateItem.js";
export async function updateModal(item,orderNumber)
{

    const modalDiv = document.getElementById('updateModal');
    const contentDiv = document.querySelector('.modalContent');
    const closeBtn = document.querySelector('.closeBtn');



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
    dishStatus.textContent='Estado actual:'+item.status.name;

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
        statusBtn.textContent=status.name;
        statusBtn.value=status.id;
        statusBtn.addEventListener('click',()=>
            {
                statusIdSelected=statusBtn.value;
            });
       
        btnDiv.appendChild(statusBtn);
        
    });

    const saveChangebtn=document.createElement('button');
    saveChangebtn.className='btn'; 
    saveChangebtn.type='button';
    saveChangebtn.textContent='Guardar cambios';
    saveChangebtn.addEventListener('click',(e)=>
        {
            e.preventDefault();
            updateItemStatus(item.id,orderNumber,statusIdSelected);
            location.reload();
        });

    
    dishInfo.appendChild(dishName);
    dishInfo.appendChild(dishStatus);
    dishInfo.appendChild(statusText);
    dishInfo.appendChild(btnDiv);   
    dishInfo.appendChild(saveChangebtn);

    contentDiv.appendChild(tittleDiv);
    contentDiv.appendChild(dishInfo);
    contentDiv.appendChild(orderContent);



}