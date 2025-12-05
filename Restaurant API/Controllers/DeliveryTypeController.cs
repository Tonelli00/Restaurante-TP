using Application.Interfaces;
using Application.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Restaurant_API.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class DeliveryTypeController : ControllerBase
    {
        private readonly IDeliveryTypeServices _services;
        public DeliveryTypeController(IDeliveryTypeServices services)
        {
            _services = services;
        }

        [HttpGet]
        public async Task<ActionResult<GenericResponse>> GetDeliveries() 
        {
            var result = await _services.getDeliveries();
            var response = result.Select(c=>new GenericResponse 
            {
            id=c.Id,
            name=c.Name,
            });
            return new JsonResult(new
            {
                message = "Lista de tipos de entrega obtenida exitosamente",
                data = response
            })
            {
                StatusCode =200
            };

        }

    }
}
