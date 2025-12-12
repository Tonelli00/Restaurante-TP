import { getData } from "../Global/ApiService.js";

const EndpointUrl= "api/v1/Category";

export async function getAllCategories()
{
    const categories = await getData(EndpointUrl);
    return categories;
}