

namespace Application.Exceptions
{
    public class CategoryNotFound:Exception
    {
        public CategoryNotFound() : base() { }
        public CategoryNotFound(string menssage) : base(menssage) { }
    }
}
