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

export async function PostData(Endpointurl,data){
    try
    {
    

    }
    catch(error)
    {
        console.error("No se pudo establecer una conexion con la api");
    }
}