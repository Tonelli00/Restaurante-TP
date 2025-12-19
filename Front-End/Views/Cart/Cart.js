document.addEventListener("DOMContentLoaded", () => {
    CartAddDish();
});
export function CartAddDish()
{   
    const params= new URLSearchParams(window.location.search);
    const act = params.get("act");
    if(act !== 'agg'){return;}
    document.body.classList.add('add-dish-mode');

}