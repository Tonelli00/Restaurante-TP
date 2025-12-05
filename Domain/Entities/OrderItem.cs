

namespace Domain.Entities
{
    public class OrderItem
    {
        public long OrderItemId { get; set; } 
 
        public long Order { get; set; } 
        public Order OrderEntity { get; set; }
        public Guid Dish { get; set; } 
        public Dish DishEntity { get; set; } 
        public int Quantity { get; set; }
        public string Notes { get; set; }
        
        public int Status { get; set; }
        public Status? StatusEntity { get; set; }  
        public DateTime CreateDate { get; set; }
    }
}
