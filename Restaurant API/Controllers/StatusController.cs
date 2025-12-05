using Application.Interfaces;
using Application.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Restaurant_API.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class StatusController : ControllerBase
    {
        private readonly IStatusServices _services;

        public StatusController(IStatusServices services)
        {
            _services = services;
        }

        [HttpGet]
        public async Task<ActionResult<GenericResponse>> GetStatus() 
        {
            var result = await _services.GetStatus();
            var response = result.Select(s => new GenericResponse
            {
                id= s.Id,
                name=s.Name,
            });
            return new JsonResult(new
            {
                message = " Lista de estados obtenida exitosamente",
                data = response
            })
            {
                StatusCode=200
            };
        
        }
    }
}
