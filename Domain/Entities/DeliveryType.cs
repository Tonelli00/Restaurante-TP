

namespace Domain.Entities
{
    public class DeliveryType
    {
        public int Id { get; set; }
        public string Name { get; set; }


        public List<Order>DeliveryInOrders { get; set; }
    }
}
