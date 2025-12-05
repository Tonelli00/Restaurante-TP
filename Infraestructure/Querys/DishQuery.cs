using Application.Enums;
using Application.Interfaces;
using Domain.Entities;
using Infraestructure.Persistence;
using Microsoft.EntityFrameworkCore;


namespace Infraestructure.Querys
{
   
    
    public class DishQuery : IDishQuery
    {
        private readonly AppDbContext _context;

        public DishQuery(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Dish> GetDish(Guid dishid) 
        {
            return  await _context.Dishes.Include(d=>d.CategoryEntity).Include(d=>d.OrderItems).FirstOrDefaultAsync(d => d.DishId == dishid); 
        }

     

        public async Task<bool> checkDish(Guid dishId) 
        {
            return await _context.Dishes.AnyAsync<Dish>(d => d.DishId == dishId);
        }
        public async Task<Dish> GetDishWithCategory(Guid dishId)
        {
            return await _context.Dishes.Include(d=> d.CategoryEntity).FirstOrDefaultAsync(d=>d.DishId==dishId);
        }


        public int UniqueName(string dishName)
        {
            int count = _context.Dishes.Count<Dish>(d => d.Name == dishName);
          
            return count;
        
        }

     

        public async Task<IQueryable<Dish>> FilterDish(string? name, int? categoryId, SortByPrice? orderPriceBy, bool? Available)
        {
            var query = _context.Dishes 
                .Include(d => d.CategoryEntity)
                .AsQueryable(); 


            if (!string.IsNullOrWhiteSpace(name))
            {
                query = query.Where(d => d.Name == name);
            }
            if (categoryId.HasValue && categoryId > 0)
            {
                query = query.Where(d => d.Category == categoryId);
            }
            if (orderPriceBy.HasValue)  
            {
                if (SortByPrice.asc == orderPriceBy)
                {
                    query = query.OrderBy(d => d.Price);
                }
                else { query = query.OrderByDescending(d => d.Price); }
            
            }

            if ((bool)Available)
            {
                query = query.Where(d => d.Available == true);
            }



            return  query; 
           

            }





        }
    }

