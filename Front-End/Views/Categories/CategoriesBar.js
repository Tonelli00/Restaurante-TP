import { getAllCategories} from "./GetCategories.js";
import { getAllDishes,getDishesByCategory,getDishesByNameandCat} from "../Dishes/GetDishes.js";
import { menuCards } from "../Dishes/MenuCards.js";

async function categoryBar() {
    const data = await getAllCategories();
    const categories = data.data;
    let activecategory=null;
    const inputSearch = document.getElementById('searchInput');

    
    const categoriesdiv = document.querySelector(".categorybar");
    const AllCategoriesbutton = document.createElement('button');

    AllCategoriesbutton.textContent="TODOS";
    categoriesdiv.appendChild(AllCategoriesbutton);

    AllCategoriesbutton.classList.add('active');
    
    AllCategoriesbutton.addEventListener('click',async (event)=> 
    {
        clearActiveButtons();
        AllCategoriesbutton.classList.add('active');
        activecategory=null;
        menuCards(await getAllDishes());  
    });
    
     menuCards(await getAllDishes());  
   

    categories.forEach( category => {

        const categorybutton = document.createElement('button');
        categorybutton.textContent=category.name.toUpperCase();
        
        categorybutton.addEventListener('click',async (event)=> 
            {
                clearActiveButtons();
                categorybutton.classList.add('active');
                AllCategoriesbutton.classList.remove('active');
                activecategory=category.id;
                menuCards(await getDishesByCategory(category.id));
            });
        
        categoriesdiv.appendChild(categorybutton);
    });
      
    inputSearch.addEventListener('keyup',async(event)=>
    {
        doSearch();
    });
    

    async function doSearch() {
    const inputSearch = document.getElementById('searchInput');
    const text = inputSearch.value;
    menuCards(await getDishesByNameandCat(text,activecategory));
    
}

}

categoryBar();
function clearActiveButtons() {
    const buttons = document.querySelectorAll('.categorybar button');
    buttons.forEach(btn => btn.classList.remove('active'));
}



