

namespace Application.Exceptions
{
    public class NoName:Exception
    {
        public NoName():base() 
        { }
        public NoName(string menssage) : base(menssage)
        { }
    }
}
