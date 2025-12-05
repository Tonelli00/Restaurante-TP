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
    public class StatusQuery:IStatusQuery
    {
        private readonly AppDbContext _context;

        public StatusQuery(AppDbContext context)
        {
            _context = context;
        }
        public async Task<List<Status>> GetStatus() 
        {
            return await _context.Statuses.ToListAsync();
        }
    }
}
