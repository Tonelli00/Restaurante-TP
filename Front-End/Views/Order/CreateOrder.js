import {PostData} from "../Global/ApiService.js";


export async function CreateOrder(){
    const optionInput = document.querySelector( 'input[name="DeliveryOption"]:checked');
    console.log(optionInput.id);
}

