let counter = 0;
let cartContent = [];

export function AddElement(dish)
{
 const cartCounter = document.querySelector('.cart-counter');
 counter++;
 cartContent.push(dish);
 cartCounter.textContent = counter;
 localStorage.setItem("CartContent",JSON.stringify(cartContent));
 console.log(localStorage.getItem("CartContent"));
}
