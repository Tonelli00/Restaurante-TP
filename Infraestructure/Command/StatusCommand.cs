using Application.Interfaces;
using Infraestructure.Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infraestructure.Command
{
    public class StatusCommand:IStatusCommand
    {
        private readonly AppDbContext _context;

        public StatusCommand(AppDbContext context)
        {
            _context = context;
        }
    }
}
