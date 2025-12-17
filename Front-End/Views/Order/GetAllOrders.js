import {getData} from "../Global/ApiService.js";

export async function GetAllOrders(){
    const Endpointurl= 'api/v1/Order';
    const data = await getData(Endpointurl);
    return data;
}
