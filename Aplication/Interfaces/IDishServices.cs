using Application.Enums;
using Application.Models;
using Domain.Entities;

namespace Application.Interfaces
{
    public interface IDishServices
    {
        Task<DishResponse> CreateDish(DishRequest request);
      
        Task<DishResponse> UpdateDish(Guid dishid, DishUpdateRequest request);
      
        Task<IQueryable<DishResponse>> FilterDish(string? name,int? categoryId,SortByPrice? orderPriceBy,bool? Available);

        Task<DishResponse> removeDish(Guid dishId);
        Task<DishResponse> GetDishById(string dishId);
    }
}
