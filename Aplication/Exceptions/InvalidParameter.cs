

namespace Application.Exceptions
{
    public class InvalidParameter:Exception
    {
        public InvalidParameter():base() { }
        public InvalidParameter(string menssage) : base(menssage) { }

    }
}
