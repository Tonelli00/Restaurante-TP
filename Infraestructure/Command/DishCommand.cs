using Application.Interfaces;
using Domain.Entities;
using Infraestructure.Persistence;
using Microsoft.EntityFrameworkCore;


namespace Infraestructure.Command
{
    public class DishCommand : IDishCommand
    {
        private readonly AppDbContext _Context;

        public DishCommand(AppDbContext context)
        {
            _Context = context;
        } 


        
        public async Task<Dish> InsertDish(Dish dish) 
        {
            _Context.Dishes.Add(dish);
            await _Context.SaveChangesAsync();
            return dish; 
        }

        public async Task<Dish> UpdateDish(Guid dishid, Dish updateDish)
        {
            

            var dish = await _Context.Dishes.FindAsync(dishid);

            dish.Name = updateDish.Name;
            dish.Description = updateDish.Description;
            dish.Price= updateDish.Price;
            dish.Available = updateDish.Available;
            dish.ImageUrl=updateDish.ImageUrl;
            dish.Category = updateDish.Category;
            dish.UpdateDate= updateDish.UpdateDate;
            _Context.Dishes.Update(dish);
            await _Context.SaveChangesAsync();
  
            return dish; 
        }

        public async Task<Dish> removeDish(Dish dish)
        {   
            _Context.Remove(dish);
            await _Context.SaveChangesAsync();
            return dish;
        }



    }
}
