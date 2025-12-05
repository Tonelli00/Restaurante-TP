import { filterDish } from "../dish/DishCardMenu.js";

document.addEventListener('DOMContentLoaded',()=> //me aseguro que este todo el html cargado
    {
        fetch('https://localhost:7105/api/v1/Category')
        .then(response=>response.json())
        .then(categories=>
            {                 
              
                const ul = document.getElementById('lista-categorias');//Selecciono el elemento
                ul.innerHTML=''; //Limpio todo lo que tenga actualmente.
                
                categories.data.forEach(category => {
                    const li = document.createElement('li');//Por cada categoria creo
                    //un item de lista
                    const a = document.createElement('a');//Por cada elemetno creo un
                    //elemento de tipo ancla.
                    a.textContent=category.name; 
         
                    a.href='#';

                    a.addEventListener('click',(e)=>
                        {
                            e.preventDefault();
                            
                            document.querySelectorAll('#lista-categorias a').forEach(link=>link.classList.remove('activo'));
                            a.classList.add('activo');
                            
                            filterDish(category.id);

                        });
                    li.appendChild(a);
                    ul.appendChild(li);  
                        
                });
                const firstcategory = ul.querySelector('a');
                firstcategory.click();
                


            });

    });