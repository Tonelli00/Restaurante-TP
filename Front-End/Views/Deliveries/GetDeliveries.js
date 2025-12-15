import { getData } from "../Global/ApiService.js";

const EndpointUrl="api/v1/DeliveryType";

export async function getAllDeliveries()
{
    const data = await getData(EndpointUrl);
    const Deliveries = data.data;
    return Deliveries;
}
