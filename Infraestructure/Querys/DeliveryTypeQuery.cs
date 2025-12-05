using Application.Interfaces;
using Domain.Entities;
using Infraestructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Infraestructure.Querys
{
    public class DeliveryTypeQuery:IDeliveryTypeQuery
    {
        private readonly AppDbContext _context;
        public DeliveryTypeQuery(AppDbContext context) 
        {
        _context=context; 
        }

        public async Task<List<DeliveryType>> getDeliveries()
        {
            return await _context.DeliveryTypes.ToListAsync();
        }
    }
}
