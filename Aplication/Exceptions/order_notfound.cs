using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Exceptions
{
    public class order_notfound:Exception
    {
        public order_notfound():base() { }
        public order_notfound(string message) : base(message) { }


    }
}
