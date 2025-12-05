using Application.Interfaces;
using Application.Models;
using Application.Exceptions;
using Application.Enums;
using Domain.Entities;

namespace Application.UseCase.Dish
{
    public class DishServices : IDishServices
    {
        private readonly IDishCommand _command;
        private readonly IDishQuery _query;
        public DishServices(IDishCommand command, IDishQuery query)
        {
            _command = command;
            _query = query;
        }
  
        public async Task<DishResponse> CreateDish(DishRequest request) 
        {
          

            if (_query.UniqueName(request.Name)>0) 
            {
                string menssage = "Ya existe un plato con ese nombre";
                throw new MultipleDishName(menssage);
            }

           
            if (string.IsNullOrWhiteSpace(request.Name)) 
            {
                string menssage = "El nombre del plato es obligatorio";
                throw new NoName(menssage);
            }

           
            if (request.Price <= 0)
            {
                string menssage = "El precio debe ser mayor a cero";
                throw new InvalidPrice(menssage);
            }

            if (request.Category<=0 || request.Category>10 || request.Category==null)
            {
                string menssage = "Categoria inexistente.";
                throw new CategoryNotFound(menssage);
            }




            var dish = new Domain.Entities.Dish
            {

                Name = request.Name,
                Description = request.Description,
                Price = request.Price,
                ImageUrl = request.Image,
                Category = request.Category,
                Available = true,
                CreateDate = DateTime.Now,
                UpdateDate = DateTime.Now,
            };

            var createdDish = await _command.InsertDish(dish);
            var DishwithCategory = await _query.GetDishWithCategory(createdDish.DishId);
            return new DishResponse
            {
                Id = DishwithCategory.DishId,
                Name = DishwithCategory.Name,
                Description = DishwithCategory.Description,
                Price = DishwithCategory.Price,
                Category = new GenericResponse
                {
                    id = DishwithCategory.Category,
                    name = DishwithCategory.CategoryEntity.Name,
                },
                Image=DishwithCategory.ImageUrl,
                IsActive=DishwithCategory.Available,
                CreatedAt=DishwithCategory.CreateDate,
                UpdatedAt= DishwithCategory.UpdateDate,
            };

        }


        public async Task<IQueryable<DishResponse>> FilterDish(string? name,int? categoryId,SortByPrice? orderPriceBy,bool? Available)
        {
            
            if (categoryId <= 0 && !orderPriceBy.HasValue) 
            {
                string menssage = "Parámetros de búsqueda inválidos";
                throw new InvalidParameter(menssage); 
            }
            var dishes =  await _query.FilterDish( name, categoryId,  orderPriceBy,  Available);

            return dishes.Select(d => new DishResponse
            {
                Id= d.DishId,
                Name=d.Name,
                Description=d.Description,  
                Price = d.Price,
                Category = new GenericResponse 
                {
                id=d.Category,
                name=d.CategoryEntity.Name,
                },
                Image=d.ImageUrl,
                IsActive=d.Available,
                CreatedAt=d.CreateDate,
                UpdatedAt=d.UpdateDate,

            });
        }


        public async Task<DishResponse> UpdateDish(Guid dishid, DishUpdateRequest request)
        {


            if (!await _query.checkDish(dishid))
            {
                string message = "Plato no encontrado";
                throw new DishNotFound(message);
            }
            
            var selected_dish = await _query.GetDish(dishid);


            if (selected_dish.Name != request.Name)
            {
                int quantity = _query.UniqueName(request.Name);
                if (quantity > 0)
                {
                    string menssage = "Ya existe un plato con ese nombre";
                    throw new MultipleDishName(menssage);
                }
            }


            if (request.Price <= 0)
            {
                string menssage = "El precio debe ser mayor a cero";
                throw new InvalidPrice(menssage);
            }


            if (request.Category<=0 || request.Category>10 || request.Category == null)
            {
                string menssage = "Categoria inexistente.";
                throw new CategoryNotFound(menssage);
            }

            if (string.IsNullOrWhiteSpace(request.Name))
            {
                string menssage = "No se indicó un nombre.";
                throw new NoName(menssage);
            }
            if (request.Name.Length > 100) 
            {
                string message = "El nombre debe tener menos de 100 caracteres";
                throw new InvalidLenght(message);
            }
            if (request.Description.Length > 500)
            {
                string message = "La descripcion debe tener menos de 500 caracteres";
                throw new InvalidLenght(message);
            }
            //Una vez que valido todo, actualizo el plato que traje.
            
            selected_dish.Name=request.Name;
            selected_dish.Description = request.Description;
            selected_dish.Price = request.Price;
            selected_dish.Category = request.Category;
            selected_dish.ImageUrl = request.Image;
            selected_dish.Available = request.IsActive;
            selected_dish.UpdateDate = DateTime.Now;
            var new_dish = await _command.UpdateDish(dishid, selected_dish);
            var DishwithCategory = await _query.GetDishWithCategory(new_dish.DishId);
            return new DishResponse
            {
                Id = DishwithCategory.DishId,
                Name = DishwithCategory.Name,
                Description = DishwithCategory.Description,
                Price = DishwithCategory.Price,
                Category = new GenericResponse
                {
                    id = DishwithCategory.Category,
                    name = DishwithCategory.CategoryEntity.Name,
                },
                Image = DishwithCategory.ImageUrl,
                IsActive = DishwithCategory.Available,
                CreatedAt = DishwithCategory.CreateDate,
                UpdatedAt = DishwithCategory.UpdateDate,
            };
        }

        public async Task<DishResponse> removeDish(Guid dishId)
        {
            if (await _query.GetDish(dishId)==null) 
            {
                string message = "Plato no encontrado";
                throw new DishNotFound(message);
            }
            var dish = await _query.GetDish(dishId);
            
            if (dish.OrderItems.Count > 0)
            {
                string message = " No se puede eliminar el plato porque está incluido en órdenes activas";
                throw new dish_in_use(message);
            }
            else
            {

             await _command.removeDish(dish);
            }
            
            return new DishResponse 
            {

                Id =dish.DishId,
                Name = dish.Name,
                Description = dish.Description,
                Price = dish.Price,
                Category = new GenericResponse
                {
                    id = dish.Category,
                    name = dish.CategoryEntity.Name,
                },
                Image = dish.ImageUrl,
                IsActive = dish.Available,
                CreatedAt = dish.CreateDate,
                UpdatedAt = dish.UpdateDate,
            };
            
        }

        public async Task<DishResponse> GetDishById(string Id)
        {
            if (!Guid.TryParse(Id, out Guid dishId))
            {
                string message = " Formato de ID inválido";
                throw new InvalidParameter(message);
            }

            if (!await _query.checkDish(dishId)) 
            {
                string message = " Plato no encontrado";
                throw new DishNotFound(message);
            }
       
            
            var dish = await _query.GetDish(dishId);
            return new DishResponse 
            {
                Id = dish.DishId,
                Name = dish.Name,
                Description = dish.Description,
                Price = dish.Price,
                Category = new GenericResponse
                {
                    id = dish.Category,
                    name = dish.CategoryEntity.Name,
                },
                Image = dish.ImageUrl,
                IsActive = dish.Available,
                CreatedAt = dish.CreateDate,
                UpdatedAt=dish.UpdateDate,
            };
        }
    }
}
          

            


        
    


