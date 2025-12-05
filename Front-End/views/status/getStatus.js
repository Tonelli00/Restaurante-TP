export async function statuses()
{
const response =await fetch('https://localhost:7105/api/v1/Status')
const data = await response.json();


return data.data;
}


async function selectStatus()
{
 return new Promise(resolve=>
        {
    const statusSelect=document.getElementById('statuses');
    
    const confirmbtn = document.querySelector('.confirmbtn');

     confirmbtn.addEventListener('click',()=>
        {
            const statusDiv = document.getElementById('Statuses');
            statusDiv.classList.remove('show');
            
            const statusSelected = statusSelect.options[statusSelect.selectedIndex];
            const statusData = 
            {
                id:statusSelected.value,
                name:statusSelected.text,
            }
            resolve(statusData);
    


        })
    })

}
