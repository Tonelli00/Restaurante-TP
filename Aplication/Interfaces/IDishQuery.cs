using Application.Enums;
using Domain.Entities;

namespace Application.Interfaces
{
    public interface IDishQuery
    {
        Task<Dish> GetDish(Guid dishid);

        Task<Dish> GetDishWithCategory(Guid dishId);
        int UniqueName(string dishName);
        Task<bool> checkDish(Guid dishId);
       
        Task<IQueryable<Dish>> FilterDish(string? name, int? categoryId, SortByPrice? orderPriceBy, bool? Available);



    }
}
