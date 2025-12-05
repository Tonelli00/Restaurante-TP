using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Exceptions
{
    public class missing_delivery:Exception
    {
        public missing_delivery():base() { }
        public missing_delivery(string message):base(message) { }
    }
}
