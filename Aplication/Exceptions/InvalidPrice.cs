

namespace Application.Exceptions
{
    public class InvalidPrice:Exception
    {
        public InvalidPrice():base() 
        { }
        public InvalidPrice(string message) : base(message) 
        { }
    }
}
