using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Exceptions
{
    public class invalid_transition:Exception
    {
        public invalid_transition():base() { }
        public invalid_transition(string message):base(message) { }
    }
}
