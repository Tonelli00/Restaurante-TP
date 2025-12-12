import { getData } from "../Global/ApiService.js";

export async function getAllDishes(){
    const EndpointUrl="api/v1/Dish?onlyActive=true";
    const dishes = await getData(EndpointUrl);
    return dishes;
}

export async function getDishesByCategory(categoryId) {
    const EndpointUrl=`api/v1/Dish?category=${categoryId}&onlyActive=true`;
    const dishes= await getData(EndpointUrl);
    return dishes;
}

export async function getDishesByNameandCat(DishName,categoryId) {
    if(categoryId==null)
    {
        const EndpointUrl=`api/v1/Dish?name=${DishName}&onlyActive=true`;
        const dishes= await getData(EndpointUrl);
        return dishes;        
    }
    else
    {
        const EndpointUrl=`api/v1/Dish?name=${DishName}&category=${categoryId}&onlyActive=true`;
        const dishes= await getData(EndpointUrl);
        return dishes;
    }
    
}