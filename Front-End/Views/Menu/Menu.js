document.addEventListener("DOMContentLoaded", () => {
    AddDish();
});
export function AddDish()
{   
    const params= new URLSearchParams(window.location.search);
    const act = params.get("act");
    if(act !== 'agg'){return;}
    document.body.classList.add('add-dish-mode');
    
    const cartLogo = document.querySelector(".cart_logo");
    cartLogo.addEventListener('click',()=>
    {
        cartLogo.href="Cart.html?act=agg";
    });

}