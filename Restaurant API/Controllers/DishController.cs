using Application.Enums;
using Application.Exceptions;
using Application.Interfaces;
using Application.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using System.Linq.Expressions;



namespace Restaurant_API.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class DishController : ControllerBase
    {
        private readonly IDishServices _services;

        public DishController(IDishServices services)
        {
            _services = services;
        }

        [HttpPost] 
        [ProducesResponseType(typeof(DishResponse), StatusCodes.Status201Created)]
        [SwaggerResponse(201, "Plato Creado exitosamente", typeof(DishResponse))]
        [ProducesResponseType(typeof(ApiError), StatusCodes.Status400BadRequest)]
        [SwaggerResponse(400, "Datos de entrada inválidos", typeof(ApiError))]
        [ProducesResponseType(typeof(ApiError), StatusCodes.Status409Conflict)]
        [SwaggerResponse(409, "Ya existe un plato con el mismo nombre", typeof(ApiError))]
        [SwaggerOperation(Summary = "Crear nuevo plato", Description = "Crea un nuevo plato en el menú del restaurante.")]

        public async Task<ActionResult<DishResponse>> CreateDish(DishRequest request)
        {
            try
            {
                var result = await _services.CreateDish(request);
                return new JsonResult(result)
                { StatusCode=201};

            }


            catch (DishNotFound exception)
            {
                return NotFound(new ApiError { message = exception.Message });
            }
            catch (InvalidPrice exception)
            {
                return BadRequest(new ApiError { message = exception.Message });
            }
            catch (MultipleDishName exception)
            {
                return Conflict(new ApiError { message = exception.Message });
            }
            catch (NoName exception)
            {
                return BadRequest(new ApiError { message = exception.Message }
                );
            }
            catch (CategoryNotFound exception)
            {
                return BadRequest(new ApiError { message = exception.Message });
            }


        }

       


        [HttpGet]
        [ProducesResponseType(typeof(DishResponse), StatusCodes.Status200OK)]
        [SwaggerResponse(200, "Lista de platos obtenida exitosamente", typeof(DishResponse))]
        [ProducesResponseType(typeof(ApiError), StatusCodes.Status400BadRequest)]
        [SwaggerResponse(400, "Parámetros de búsqueda inválidos", typeof(ApiError))]
        [SwaggerOperation(Summary = "Buscar platos", Description = "Obtiene una lista de platos del menú con opciones de filtrado y ordenamiento.")]

        public async Task<ActionResult<DishResponse>> filterDishes([FromQuery] string? name,[FromQuery] int? category,[FromQuery] SortByPrice? sortByPrice,[FromQuery] bool onlyActive =true) 
        {
            try
            {
                var result = await _services.FilterDish(name, category, sortByPrice, onlyActive);
                return Ok(result);
            }
           
            catch (InvalidParameter exception) 
            {

                return BadRequest(new ApiError { message = exception.Message }
                );
            }
            
        }



        [HttpGet("{id}")]
        [ProducesResponseType(typeof(DishResponse), StatusCodes.Status200OK)]
        [SwaggerResponse(200, "Plato encontrado exitosamente", typeof(DishResponse))]
        [ProducesResponseType(typeof(ApiError), StatusCodes.Status400BadRequest)]
        [SwaggerResponse(400, "ID de plato inválido", typeof(ApiError))]
        [ProducesResponseType(typeof(ApiError), StatusCodes.Status404NotFound)]
        [SwaggerResponse(404, "Plato no encontrado", typeof(ApiError))]
        [SwaggerOperation(Summary = "Obtener plato por ID", Description = "Obtiene los detalles completos de un plato específico.")]

        public async Task<ActionResult<DishResponse>> GetDishById(string id)
        {

            try
            {
                var result = await _services.GetDishById(id);
                return Ok(result);
            }
            catch (DishNotFound exception)
            {
                return NotFound(new ApiError { message = exception.Message });
            }
            catch (InvalidParameter exception)
            {
                return BadRequest(new ApiError { message = exception.Message });
            }



        }






        [HttpPut("{id}")]
        [ProducesResponseType(typeof(DishResponse), StatusCodes.Status200OK)]
        [SwaggerResponse(200, "Plato actualizado exitosamente", typeof(DishResponse))]
        [ProducesResponseType(typeof(ApiError), StatusCodes.Status400BadRequest)]
        [SwaggerResponse(400, "Datos de entrada inválidos", typeof(ApiError))]
        [ProducesResponseType(typeof(ApiError), StatusCodes.Status404NotFound)]
        [SwaggerResponse(404, "Plato no encontrado", typeof(ApiError))]
        [ProducesResponseType(typeof(ApiError), StatusCodes.Status409Conflict)]
        [SwaggerResponse(409, "Conflicto - nombre duplicado", typeof(ApiError))]
        [SwaggerOperation(Summary = "Actualizar plato existente", Description = "Actualiza todos los campos de un plato existente en el menú.")]
        public async Task<ActionResult<DishResponse>> UpdateDish(Guid id, [FromBody] DishUpdateRequest request)
        {
            try
            {
                var result = await _services.UpdateDish(id, request);
                return Ok(result);
            }
            catch (DishNotFound exception)
            {
                return NotFound(new ApiError { message = exception.Message });
            }
            catch (InvalidPrice exception)
            {
                return BadRequest(new ApiError { message = exception.Message });
            }
            catch (MultipleDishName exception)
            {
                return Conflict(new ApiError { message = exception.Message });
            }
            catch (CategoryNotFound exception)
            {
                return BadRequest(new ApiError { message = exception.Message });
            }
            catch (NoName exception)
            {
                return Conflict(new ApiError { message = exception.Message });
            }
            catch (InvalidLenght exception)
            {
                return BadRequest(new ApiError { message = exception.Message });
            }

        }




        [HttpDelete("{id}")]
        [ProducesResponseType(typeof(DishResponse), StatusCodes.Status200OK)]
        [SwaggerResponse(200, "Plato eliminado exitosamente", typeof(DishResponse))]
        [ProducesResponseType(typeof(ApiError), StatusCodes.Status404NotFound)]
        [SwaggerResponse(404, "Plato no encontrado", typeof(ApiError))]
        [ProducesResponseType(typeof(ApiError), StatusCodes.Status409Conflict)]
        [SwaggerResponse(409, "No se puede eliminar - plato en uso", typeof(ApiError))]   
        [SwaggerOperation(Summary = "Eliminar plato", Description = "Elimina un plato del menú del restaurante.")]

        public async Task<ActionResult<DishResponse>> removeDish(Guid id) 
        {
            try
            {
                var result = await _services.removeDish(id);
                
                return Ok(result);
            }
            catch (DishNotFound exception)
            {
                return NotFound(new ApiError { message = exception.Message });
            }
            catch (dish_in_use exception) 
            {
                return Conflict(new ApiError { message = exception.Message });
            }
            

        }
        
        
        
       
    }
}
    