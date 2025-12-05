using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Exceptions
{
    public class invalid_range:Exception
    {
        public invalid_range():base() { }

        public invalid_range(string message) : base(message) { }

    }
}
