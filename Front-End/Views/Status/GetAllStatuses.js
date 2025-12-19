import { getData } from "../Global/ApiService.js";

export async function GetStatuses(){

    const EndpointUrl = "api/v1/Status";

    const data = await getData(EndpointUrl);

    return data.data;
}