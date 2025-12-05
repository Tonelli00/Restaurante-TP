using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Exceptions
{
    public class dish_in_use:Exception
    {
        public dish_in_use():base() { }
        public dish_in_use(string message):base(message) { }
    }
}
