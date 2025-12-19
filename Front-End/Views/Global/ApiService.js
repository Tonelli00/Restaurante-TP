const base_URL= "https://localhost:7105/";

export async function getData(Endpointurl)
{
    try
    {
        const response = await fetch(`${base_URL}${Endpointurl}`);
        const data = response.json();
        return data;

    }
    catch(error)
    {
        console.error("No se pudo establecer una conexion con la api");
    }
}

export async function PostData(Endpointurl,orderdata){
    try
    {
        const order=
        {
            items:orderdata.items,
            delivery:orderdata.delivery,
            notes:orderdata.notes,
        };

        const opcionesFetch = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json', 
        },
        body: JSON.stringify(order)};

        const response = await fetch(`${base_URL}${Endpointurl}`,opcionesFetch);
        return response;

    }
    catch(error)
    {
        console.error("No se pudo establecer una conexion con la api");
    }
}

export async function PutData(Endpointurl,items)
{
    try
    {
        const opcionesFetch = {
        method: 'PUT',
        headers: {
        'Content-Type': 'application/json', 
        },
        body: JSON.stringify(items)};
        
        const response = await fetch(`${base_URL}${Endpointurl}`,opcionesFetch);
        return response;
    }
    catch(error)
    {
        console.error("No se pudo establecer una conexion con la api");
    }
}