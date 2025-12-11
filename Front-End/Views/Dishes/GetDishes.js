import { getData } from "../Global/ApiService.js";

const EndpointUrl="api/v1/Dish?onlyActive=true";

export async function getAllDishes(){
    const dishes = await getData(EndpointUrl);
    return dishes;
}