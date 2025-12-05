using Application.Enums;
using Application.Exceptions;
using Application.Interfaces;
using Application.Models;
using Microsoft.AspNetCore.Mvc;

namespace Restaurant_API.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryServices _services;

        public CategoryController(ICategoryServices services)
        {
            _services = services;
        }
        [HttpGet]
        public async Task<ActionResult<CategoryResponse>> GetCategories() 
        {
            var result = await _services.GetCategories();
            var response = result.Select(c => new CategoryResponse 
            {
            Id=c.Id,
            Name=c.Name,
            Description=c.Description,
            order=c.Order,
            });
            return new JsonResult(new 
            {
            message= "Lista de categorías obtenida exitosamente",
            data = response,
            })
            {

                StatusCode = 200
            };
            
        } 
    }
}
