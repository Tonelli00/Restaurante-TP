export function toast(msj,status)
{
    const toastcontainerDiv = document.getElementById('Toast');
    
    if (!toastcontainerDiv) return;
    const toastdiv = document.createElement('div');
    toastdiv.className='Toast';
    toastdiv.innerHTML='';
    toastdiv.classList.add('active');
    
    const text = document.createElement('p');
    text.textContent=msj;
    const image=document.createElement('img');
    if(status=="good")
      {
        toastdiv.style.backgroundColor='var(--Succesfull-CreateOrder)';
        toastdiv.style.border='none';
        image.src="./Components/Images/check.png";
        image.style.height='1rem';
      }
    else{
      toastdiv.style.backgroundColor='var(--Bad-CreateOrder)';
      toastdiv.style.border='none'; 
      image.src="./Components/Images/bad.png";
      image.style.height='1rem';
    }



    

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
    }, 600);

  }, 1500);


}   