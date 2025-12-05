using Application.Models;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface IOrderCommand
    {
        Task<Order> InsertOrder(Order order);
        Task<Order> UpdateOrder(long id, Order Updateorder);
        Task<Order> UpdateOrderItemStatus(long OrderId, Order updateOrder);
        
    }
}
