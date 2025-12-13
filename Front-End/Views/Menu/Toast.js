export function toast(DishName)
{
    const toastcontainerDiv = document.getElementById('Toastcontainer');

    const toastdiv = document.createElement('div');
    toastdiv.className='Toast';
    toastdiv.innerHTML='';
    toastdiv.classList.add('active');

    const text = document.createElement('p');
    text.textContent=`${DishName} agregado al carrito`;
    const image=document.createElement('img');
    image.src="./Components/Images/check.png";
    image.style.height='1rem';

    toastdiv.appendChild(image);
    toastdiv.appendChild(text);
    
    toastcontainerDiv.appendChild(toastdiv);

     requestAnimationFrame(() => {
    toastdiv.classList.add('active');
  });


    setTimeout(() => {
    toastdiv.classList.remove('active');
    toastdiv.classList.add('hide');

        
    setTimeout(() => {
      toastdiv.remove();
    }, 500);

  }, 1500);

}   