using Application.Exceptions;
using Application.Interfaces;
using Domain.Entities;
using Infraestructure.Persistence;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infraestructure.Querys
{
    public class OrderQuery : IOrderQuery
    {
        private readonly AppDbContext _context;

        public OrderQuery(AppDbContext context)
        {
            _context = context;
        }

        public async Task<decimal> GetPriceByDishId(Guid DishId)
        {
            var dish = await _context.Dishes.FindAsync(DishId);
            return dish.Price;
        }
        public async Task<Status> GetStatusById(int statusId)
        {
            return await _context.Statuses.FindAsync(statusId);

        }

        public async Task<DeliveryType> GetDeliveryTypeById(int DeliveryID)
        {
            return await _context.DeliveryTypes.FindAsync(DeliveryID);
        }

        public async Task<Order> GetOrderById(long id)
        {
            if (await _context.Orders.FindAsync(id) != null)
            {
                return await _context.Orders.Include(o => o.StatusEntity)
                   .Include(o => o.DeliveryTypeEntity)
                   .Include(o => o.OrderItems).ThenInclude(oi => oi.DishEntity)
                   .Include(o => o.OrderItems).ThenInclude(oi => oi.StatusEntity)
                   .FirstOrDefaultAsync(o => o.OrderId == id);

            }
            else
            {
                string message = " Orden no encontrada";
                throw new order_notfound(message);
            }

        }


        public async Task<List<Order>> GetOrdersByFilters(DateTime? from, DateTime? to, int? status)
        {
            var query = _context.Orders.Include(o => o.StatusEntity)
                .Include(o => o.DeliveryTypeEntity)
                .Include(o => o.OrderItems)
                    .ThenInclude(item => item.DishEntity)
                .Include(o=>o.OrderItems)
                    .ThenInclude(item => item.StatusEntity)
                .AsQueryable();

               if (from.HasValue && to.HasValue) 
               {
                    query = query.Where(o => o.CreateDate >= from && o.CreateDate <= to);
               }

                if (status.HasValue) 
                {
                    query = query.Where(o => o.OverallStatus == status.Value);
                }
                

            
            return await query.ToListAsync();
        }

        public async Task<bool> existDish(Guid dishId)
        {
            return await _context.Dishes.AnyAsync(d => d.DishId == dishId);
        }
        public async Task<bool> ActiveDish(Guid dishId)
        {
            return await _context.Dishes.AnyAsync(d => d.DishId == dishId && d.Available == true);
        }
        public async Task<bool> existOrderItemInOrder(long orderId, long ItemId) 
        {
            return  await _context.OrderItems.AnyAsync(oi => oi.Order== orderId && oi.OrderItemId==ItemId && oi.Status==1 );
        
        }
        public async Task<OrderItem?> getOrderItemInOrder(long orderId,Guid DishId) 
        {
            return await _context.OrderItems.Where(oi => oi.Order == orderId && oi.Dish == DishId).FirstOrDefaultAsync();
        
        }
        public async Task<string> getstatusName(int statusId) 
        {
            return await _context.Statuses.Where(s=>s.Id==statusId).Select(s=>s.Name).FirstAsync();
        
        }

       

    }
}
