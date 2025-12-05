

namespace Application.Exceptions
{
    public class DishNotFound:Exception
    {
        public DishNotFound() 
        { }
        public DishNotFound(string menssage):base(menssage) 
        { 
        }

    }
}
