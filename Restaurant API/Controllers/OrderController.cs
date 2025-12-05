using Application.Exceptions;
using Application.Interfaces;
using Application.Models;
using Azure;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using System.ComponentModel.DataAnnotations;

namespace Restaurant_API.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderServices _Service;
        public OrderController(IOrderServices service)
        {
            _Service = service;
        }
        [HttpPost]
        [ProducesResponseType(typeof(OrderCreateReponse), StatusCodes.Status201Created)]
        [SwaggerResponse(201, "Orden Creada exitosamente", typeof(OrderCreateReponse))]
        [ProducesResponseType(typeof(ApiError), StatusCodes.Status400BadRequest)]
        [SwaggerResponse(400, "Datos de orden inválidos", typeof(ApiError))]
        [SwaggerOperation(Summary = "Crea una nueva orden", Description = "Crea una orden nueva en el sistema.")]

        public async Task<ActionResult<OrderCreateReponse>> CreateOrder([FromBody][Required] OrderRequest orderRequest)
        {
            try
            {
                var result = await _Service.CreateOrder(orderRequest);
                return new JsonResult(result)
                {
                    StatusCode = 201
                };
            }
            catch (invalid_dish exception)
            {
                return BadRequest(new ApiError { message = exception.Message });
            }
            catch (invalid_quantity exception)
            {
                return BadRequest(new ApiError { message = exception.Message });
            }
            catch (missing_delivery exception)
            {
                return BadRequest(new ApiError { message = exception.Message });
            }


        }







        [HttpGet]
        [ProducesResponseType(typeof(OrderDetailsResponse), StatusCodes.Status200OK)]
        [SwaggerResponse(200, "Orden Creada exitosamente", typeof(OrderDetailsResponse))]
        [ProducesResponseType(typeof(ApiError), StatusCodes.Status400BadRequest)]
        [SwaggerResponse(400, "Parámetros de búsqueda inválidos", typeof(ApiError))]
        [SwaggerOperation(Summary = "Buscar órdenes", Description = "Obtiene una lista de órdenes con filtros opcionales.")]
        public async Task<ActionResult<OrderDetailsResponse>> GetOrdersByFilters([FromQuery] DateTime? from, [FromQuery] DateTime? to, [FromQuery] int? status)
        {
            try
            {
                var result = await _Service.GetOrdersByFilters(from, to, status);
                var response = result.Select(o => new OrderDetailsResponse
                {
                    orderNumber = o.OrderId,
                    totalAmount = (double)o.Price,
                    deliveryTo = o.DeliveryTo,
                    notes = o.Notes,
                    status = new GenericResponse
                    {
                        id = o.OverallStatus,
                        name = o.StatusEntity.Name
                    },
                    deliveryType = new GenericResponse
                    {
                        id = o.DeliveryType,
                        name = o.DeliveryTypeEntity.Name,
                    },
                    items = o.OrderItems.Select(item => new OrderItemResponse
                    {
                        id = item.OrderItemId,
                        quantity = item.Quantity,
                        notes = item.Notes,
                        status = new GenericResponse
                        {
                            id = item.Status,
                            name = item.StatusEntity.Name
                        },
                        dish = new DishShortResponse
                        {
                            id = item.Dish,
                            name = item.DishEntity.Name,
                            image = item.DishEntity.ImageUrl,
                        }

                    }
                ).ToList(),
                    createdAt = o.CreateDate,
                    updatedAt = o.UpdateDate,


                });

                return Ok(response.ToList());

            }
            catch (invalid_range exception)
            {
                return BadRequest(new ApiError { message = exception.Message });
            }
            catch (invalid_status exception)
            {
                return BadRequest(new ApiError { message = exception.Message });
            }



        }

        [HttpGet("{id}")]
        [ProducesResponseType(typeof(OrderDetailsResponse), StatusCodes.Status200OK)]
        [SwaggerResponse(200, "Orden obtenida exitosamente", typeof(OrderDetailsResponse))]
        [ProducesResponseType(typeof(ApiError), StatusCodes.Status404NotFound)]
        [SwaggerResponse(404, "Orden no encontrada", typeof(ApiError))]
        [SwaggerOperation(Summary = "Obtiene orden por número", Description = "Obtiene los detalles completos de una orden específica.")]
        public async Task<ActionResult<OrderDetailsResponse>> GetOrderById(long id)
        {
            try
            {
                var result = await _Service.GetOrderById(id);
                return Ok(result);

            }
            catch (order_notfound exception)
            {
                return NotFound(new ApiError { message = exception.Message });
            }

        }





        [HttpPut("{id}")]
        [ProducesResponseType(typeof(OrderUpdateReponse), StatusCodes.Status200OK)]
        [SwaggerResponse(200, "Orden actualizada exitosamente", typeof(OrderUpdateReponse))]
        [ProducesResponseType(typeof(ApiError), StatusCodes.Status400BadRequest)]
        [SwaggerResponse(400, "Datos de actualización inválidos", typeof(ApiError))]
        [SwaggerOperation(Summary = "Actualiza orden existente", Description = "Actualiza los items de una orden existente.")]
        public async Task<ActionResult<OrderUpdateReponse>> UpdateOrder(long id,[Required]OrderUpdateRequest UpdateRequest) 
        {
            try
            {
                var result = await _Service.UpdateOrder(id, UpdateRequest);
              
                return Ok(result);

            }
            catch (order_notfound exception)
            {
                return BadRequest(new ApiError { message = exception.Message });
            }
            catch (order_in_progress exception)
            {
                return BadRequest(new ApiError { message = exception.Message });
            }
            catch (invalid_dish exception) 
            {
                return BadRequest(new ApiError { message = exception.Message });
            }
            catch (invalid_quantity exception)
            {
                return BadRequest(new ApiError { message = exception.Message });
            }



        }
       
        [HttpPatch("{id}/item/{itemId}")]
        [ProducesResponseType(typeof(OrderUpdateReponse), StatusCodes.Status200OK)]
        [SwaggerResponse(200, "Estado del item actualizado exitosamente", typeof(OrderUpdateReponse))]
        [ProducesResponseType(typeof(ApiError), StatusCodes.Status400BadRequest)]
        [SwaggerResponse(400, "Estado inválido o transición no permitida", typeof(ApiError))]
        [ProducesResponseType(typeof(ApiError), StatusCodes.Status404NotFound)]
        [SwaggerResponse(404, "Orden o item no encontrado", typeof(ApiError))]
        [SwaggerOperation(Summary = "Actualizar estado de item individual", Description = "Actualiza el estado de un item específico dentro de una orden.")]  
        public async Task<ActionResult<OrderUpdateReponse>> UpdateOrderItemStatus(long id , long itemId, [Required]OrderItemUpdateRequest UpdateItemRequest) 
        {
            try
            {
                var result = await _Service.UpdateOrderItemStatus(id, itemId, UpdateItemRequest);
                
                return Ok(result);

            }
            catch (order_notfound exception)
            {
                return NotFound(new ApiError { message = exception.Message });
            }
            catch (item_not_found exception)
            {
                return NotFound(new ApiError { message = exception.Message });
            }
            catch (invalid_status exception) 
            {
                return BadRequest(new ApiError { message = exception.Message });
            }
            catch (invalid_transition exception)
            {
                return BadRequest(new ApiError { message = exception.Message });
            }


        }
        
        
    
    }
}
