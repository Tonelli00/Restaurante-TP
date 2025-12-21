import {GetAllOrders} from "../Order/GetAllOrders.js";

async function StaticsData(){
    
    const ActiveOrdersSpan= document.querySelector('.Active');
    let activeOrders = 0; 
    const InActiveOrdersSpan= document.querySelector('.Inactive');
    let InactiveOrders = 0;
    const TotalProfitSpan = document.querySelector('.total');
    let totalCount = 0;
    
    const orders = await GetAllOrders();
    
    orders.forEach(order =>{
        if(order.status.id>=1 && order.status.id<5)
            {
                activeOrders++;
            }
            else{InactiveOrders++;}
        
            totalCount+=order.totalAmount;    
    });

    TotalProfitSpan.textContent="$"+totalCount;
    ActiveOrdersSpan.textContent=activeOrders;
    InActiveOrdersSpan.textContent=InactiveOrders;
    console.log(activeOrders);
    console.log(InactiveOrders);
    console.log(totalCount);
}
StaticsData();  