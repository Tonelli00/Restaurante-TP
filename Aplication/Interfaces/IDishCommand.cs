using Domain.Entities;


namespace Application.Interfaces
{
    public interface IDishCommand
    {
        Task<Dish> InsertDish(Dish dish);

        Task<Dish> UpdateDish(Guid dishid, Dish updateDish);
        Task<Dish> removeDish(Dish dish);
        


    }
}
