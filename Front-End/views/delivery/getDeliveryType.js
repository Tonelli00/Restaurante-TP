

export  async function deliverys()
{
const deliverydiv = document.getElementById('Deliverys');
deliverydiv.classList.add('show');
   
const response = await fetch('https://localhost:7105/api/v1/DeliveryType');
const data = await response.json();
renderDeliverys(data.data);

const deliverydata = await selectedDelivery();        
return deliverydata;
    
}

 function renderDeliverys(deliveryList)
{
    const deliveryTypes = document.getElementById('deliveryTypes');
    deliveryTypes.innerHTML='';
    
    deliveryList.forEach(delivery => 
    {
        const deliveryoption = document.createElement('option');
        deliveryoption.className=delivery.name;
        deliveryoption.value=delivery.id;   
        deliveryoption.textContent=delivery.name;
        deliveryTypes.appendChild(deliveryoption);

    });
}

function selectedDelivery()
{
    return new Promise(resolve=>
        {
    const deliverySelect=document.getElementById('deliveryTypes');
    const addressContainer = document.getElementById('address');
    const confirmbtn = document.querySelector('.confirmbtn');

    if(deliverySelect.options.length > 0 && deliverySelect.options[0].text.toLowerCase().includes('delivery'))
        {
         addressContainer.classList.add('show');
                     
        }
    deliverySelect.addEventListener('change',()=>
        {
            
            const deliverySelected = deliverySelect.options[deliverySelect.selectedIndex].text.toLowerCase();
            
            if(deliverySelected.includes('delivery'))
                {
                  addressContainer.classList.add('show');
                }
            else
                { addressContainer.classList.remove('show');;}

        });


        confirmbtn.addEventListener('click',()=>
        {
            const deliverydiv = document.getElementById('Deliverys');
            deliverydiv.classList.remove('show');
            const address = document.getElementById('deliveryAddress');
            const deliverySelected = deliverySelect.options[deliverySelect.selectedIndex];
            const deliveryData = 
            {
                id:deliverySelected.value,
                name:deliverySelected.text,
                to:address.value,
            }
            resolve(deliveryData);
    


        })
    })
}
    
