using Application.Interfaces;
using Application.Models;
using Domain.Entities;
using Infraestructure.Persistence;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infraestructure.Command
{
    public class OrderCommand:IOrderCommand
    {
        private readonly AppDbContext _context;

        public OrderCommand(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Order> InsertOrder(Order order)
        {
            _context.Orders.Add(order);
            await _context.SaveChangesAsync();
            return order;
        }

        public async Task<Order> UpdateOrder(long id, Order Updateorder)
        {
            var Actualorder = await _context.Orders.FirstAsync(o=>o.OrderId==id);
            Actualorder.OrderId = Updateorder.OrderId;
            Actualorder.DeliveryType=Updateorder.DeliveryType;
            Actualorder.DeliveryTypeEntity=Updateorder.DeliveryTypeEntity;
            Actualorder.DeliveryTo=Updateorder.DeliveryTo;
            Actualorder.OverallStatus=Updateorder.OverallStatus;
            Actualorder.StatusEntity=Updateorder.StatusEntity;
            Actualorder.Notes=Updateorder.Notes;
            Actualorder.Price = Updateorder.Price;
            Actualorder.CreateDate=Updateorder.CreateDate;
            Actualorder.UpdateDate=Updateorder.UpdateDate;
            Actualorder.OrderItems=Updateorder.OrderItems;

            await _context.SaveChangesAsync();
            return Actualorder;
            
        }

        public async Task<Order> UpdateOrderItemStatus(long idOrder, Order NewOrder)
        {
            var order = await _context.Orders.FirstAsync(o => o.OrderId == idOrder);
          
            order.DeliveryType = NewOrder.DeliveryType;
            order.DeliveryTypeEntity = NewOrder.DeliveryTypeEntity;
            order.DeliveryTo = NewOrder.DeliveryTo;
            order.OverallStatus = NewOrder.OverallStatus;
            order.StatusEntity = NewOrder.StatusEntity;
            order.Notes = NewOrder.Notes;
            order.Price = NewOrder.Price;
            order.CreateDate = NewOrder.CreateDate;
            order.UpdateDate =DateTime.Now;
            order.OrderItems=NewOrder.OrderItems;
            await _context.SaveChangesAsync();
            return order;
        }
    }
}
