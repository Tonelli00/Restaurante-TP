using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Exceptions
{
    public class invalid_quantity:Exception
    {
        public invalid_quantity():base() { }
        public invalid_quantity(string message) : base(message) { }


    }
}
