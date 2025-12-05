

using System.Text.Json.Serialization;

namespace Domain.Entities
{
    public class Order
    {
        public long OrderId { get; set; }
        public int DeliveryType { get; set; } 
        public DeliveryType DeliveryTypeEntity { get; set; }
        public string DeliveryTo { get; set; } = string.Empty;
        public int OverallStatus { get; set; }
        public Status? StatusEntity { get; set; }
        public string? Notes { get; set;}   
        public decimal Price { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime UpdateDate { get; set; }


        [JsonIgnore]
        public ICollection<OrderItem> OrderItems { get; set; }

    }
}
