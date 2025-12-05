using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Exceptions
{
    public class order_in_progress : Exception
    {
        public order_in_progress():base() { }
        public order_in_progress(string message) : base(message) { }

    }
}
