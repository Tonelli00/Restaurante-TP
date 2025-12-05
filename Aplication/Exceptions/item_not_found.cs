using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Exceptions
{
    public class item_not_found:Exception
    { 
        public item_not_found():base() { }
        public item_not_found(string message):base(message) { }
    }
}
