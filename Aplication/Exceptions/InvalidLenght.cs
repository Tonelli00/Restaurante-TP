using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Exceptions
{
    public class InvalidLenght : Exception
    {
        public InvalidLenght():base()
        {
        }
        public InvalidLenght(string message) : base(message)
        {
        }
    }
}
