using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Exceptions
{
    public class invalid_dish:Exception
    {
        public invalid_dish():base()
        {
        }
        public invalid_dish(string message):base(message)
        {
        }
    }
}
