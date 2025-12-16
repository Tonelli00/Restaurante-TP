export function resumeInfo()
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
   totalSpan.textContent=total;
   dishCountSpan.textContent=totalItems;


}
