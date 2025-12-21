using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface IOrderQuery
    {
        Task<Order> GetOrderById(long id);
        Task<decimal> GetPriceByDishId(Guid DishId);
        Task<Status> GetStatusById(int statusID);
        Task<DeliveryType> GetDeliveryTypeById(int DeliveryID);
        Task<List<Order>> GetOrdersByFilters(DateTime? from, DateTime? to, int? status);
        Task<bool> existDish(Guid DishId);
        Task<bool> ActiveDish(Guid dishId);
        Task<bool> existOrderItemInOrder(long orderId,long itemId);
        Task<OrderItem> getOrderItemInOrder(long orderId, Guid dishId);
        Task<OrderItem?> getOrderItem(long orderID, long ItemId);
        Task<string> getstatusName(int statusId);


    }
}
