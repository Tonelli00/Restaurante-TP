
export function resumeInfo()
{
    const params= new URLSearchParams(window.location.search);
    const act = params.get("act");
    if(act!=='agg')
        {
        const totalSpan = document.querySelector(".total");
        let total=0;

        const dishCountSpan = document.querySelector(".dishCount");
        let totalItems=0;
    
        const cart = JSON.parse(localStorage.getItem('CartContent'))||[];

        cart.forEach(item => {
            total+=parseInt(item.dish.price*item.quantity);   
            totalItems+=item.quantity;     
        });
         if(totalSpan && dishCountSpan)
        {
            totalSpan.textContent=total;
            dishCountSpan.textContent=totalItems;        
        }
        }
    else
        {
            const totalSpan = document.querySelector(".total");
            let total=0;

            const dishCountSpan = document.querySelector(".dishCount");
            let totalItems=0;
        
            const cart = JSON.parse(localStorage.getItem('UpdateOrder'))||[];

            cart.forEach(item => {
                total+=parseInt(item.dish.price*item.quantity);   
                totalItems+=item.quantity;     
            });
            if(totalSpan && dishCountSpan)
            {
                totalSpan.textContent=total;
                dishCountSpan.textContent=totalItems;        
            }


        }




}
