using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Exceptions
{
    public class invalid_status:Exception
    {
        public invalid_status():base() { }
        public invalid_status(string message) : base(message) { }
    }
}
