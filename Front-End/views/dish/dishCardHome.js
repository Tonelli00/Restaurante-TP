document.addEventListener('DOMContentLoaded',()=>
    {
        fetch('https://localhost:7105/api/v1/Dish?onlyActive=true')
.then(response=>response.json())
.then(data => {
   
    const firstFour=data.slice(0,4);

    firstFour.forEach((plato,index) => {
        //Saco el div de la carta 
        const cartaDiv=document.querySelector(`#carta${index+1}`); //Si index = 0--> Carta1
        
        if(!cartaDiv){return} //En caso de que no haya div, salto.
        

        const nameSpan = cartaDiv.querySelector(".nombre");
        const priceSpan = cartaDiv.querySelector(".precio");
        
        const imageSpan = cartaDiv.querySelector(".imagen");
       

        if (nameSpan) nameSpan.textContent = plato.name;
        if (priceSpan) priceSpan.textContent = "$"+plato.price;
        if(imageSpan) imageSpan.src= plato.image;

        
    });

    //Acá voy a mostrar los primeros 4 que obtenga.
    
        
    })
    .catch(error=>console.error("Error al cargar las imagenes.",error));

    });






