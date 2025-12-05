using Application.Models;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface IOrderServices
    {
        Task<OrderCreateReponse> CreateOrder(OrderRequest order);
        Task<OrderDetailsResponse> GetOrderById(long Id);
        Task<List<Order>> GetOrdersByFilters(DateTime?from, DateTime? to,int?status);
        Task<OrderUpdateReponse> UpdateOrder(long id, OrderUpdateRequest update);
        Task<OrderUpdateReponse> UpdateOrderItemStatus(long OrderId, long itemId,OrderItemUpdateRequest UpdateItemRequest);
    }
}
