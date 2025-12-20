using Application.Exceptions;
using Application.Interfaces;
using Application.Models;
using Domain.Entities;


namespace Application.UseCase.Order
{
    public class OrderServices:IOrderServices
    {
        private readonly IOrderCommand _Command;
        private readonly IOrderQuery _Query;

        public OrderServices(IOrderCommand command, IOrderQuery query)
        {
            _Command = command;
            _Query = query;
        }

        public async Task<OrderCreateReponse> CreateOrder(OrderRequest OrderRequest)
        {
            //Validaciones
            foreach (var item in OrderRequest.items) 
            {
                
                if (!Guid.TryParse(item.id.ToString(), out Guid dishId) || !await _Query.existDish(item.id) || !await _Query.ActiveDish(item.id))
                {
                    string message = " El plato especificado no existe o no está disponible";
                    throw new invalid_dish(message);
                }
                if (item.quantity <= 0) 
                {
                    string message = " La cantidad debe ser mayor a 0";
                    throw new invalid_quantity(message);
                }     
            }
            if (OrderRequest.delivery.id<=0 || OrderRequest.delivery.id > 3) 
            {
                string message = " Debe especificar un tipo de entrega válido";
                throw new missing_delivery(message);
            }

            //Creacion de la orden
            var order = new Domain.Entities.Order
            {
                DeliveryType = OrderRequest.delivery.id,
                DeliveryTo = OrderRequest.delivery.to,
                DeliveryTypeEntity=await _Query.GetDeliveryTypeById(OrderRequest.delivery.id),
                OrderItems = new List<OrderItem>(),
                Notes=OrderRequest.notes,
                CreateDate = DateTime.Now,
                UpdateDate = DateTime.Now,
                OverallStatus = 1,
                StatusEntity = await _Query.GetStatusById(1)
            
            };
            decimal  Totalprice = 0;
            foreach (var item in OrderRequest.items)
            {
                
                var OrderItem = new OrderItem
                {
                    Order=order.OrderId,
                    Dish=item.id,
                    Quantity=item.quantity,
                    Notes=item.notes,
                    Status= 1,
                    StatusEntity= await _Query.GetStatusById(1),
                    CreateDate=DateTime.Now,

                };
                Totalprice += await _Query.GetPriceByDishId(item.id)*item.quantity;
                
                order.OrderItems.Add(OrderItem);
            };
            order.Price = Totalprice;
            //Llamo al command pasandole la orden creada.
            await _Command.InsertOrder(order);
            return new OrderCreateReponse 
            {
                orderNumber = order.OrderId,
                totalAmount = (double)order.Price,
                createdAt = order.CreateDate,
            };
            
           
        }

        public async Task<List<Domain.Entities.Order>> GetOrdersByFilters(DateTime? from, DateTime? to, int? status)
        {
            if (from >= to)
            {
                string message = "Rango de fechas inválido";
                throw new invalid_range(message);
            }
            if (status <= 0 || status > 5)
            {
                string message = " Estado invalido";
                throw new invalid_status(message);
            }
            return await _Query.GetOrdersByFilters(from, to, status);
        }


        public async Task<OrderDetailsResponse> GetOrderById(long Id)
        {
            var order= await _Query.GetOrderById(Id);
            return new OrderDetailsResponse {
                orderNumber = order.OrderId,
                totalAmount = (double)order.Price,
                deliveryTo = order.DeliveryTo,
                notes = order.Notes,
                status = new GenericResponse
                {
                    id = order.OverallStatus,
                    name = order.StatusEntity.Name,
                },
                deliveryType = new GenericResponse
                {
                    id = order.DeliveryType,
                    name = order.DeliveryTypeEntity.Name,
                },
                items = order.OrderItems.Select(items => new OrderItemResponse
                {
                    id = items.OrderItemId,
                    quantity = items.Quantity,
                    notes = items.Notes,
                    status = new GenericResponse
                    {
                        id = items.Status,
                        name = items.StatusEntity.Name,
                    },
                    dish = new DishShortResponse
                    {
                        id = items.Dish,
                        name = items.DishEntity.Name,
                        image = items.DishEntity.ImageUrl
                    }
                }).ToList(),

                createdAt = order.CreateDate,
                updatedAt = order.UpdateDate,



            };
        }

      

        public async Task<OrderUpdateReponse> UpdateOrder(long id, OrderUpdateRequest update)
        {
            //Validaciones
            if(await _Query.GetOrderById(id)==null) 
            {
                string message = " Número de Orden invalido"; 
                throw new order_notfound(message);
            }

            var order = await _Query.GetOrderById(id);

            if (order.OverallStatus == 5) 
            {
                string message = " No se puede modificar una orden que ya está cerrada";
                throw new order_in_progress(message);
            }
            foreach (var item in update.items)
            {
                if (!await _Query.ActiveDish(item.id))
                {
                    string message = " El plato especificado no está disponible";
                    throw new invalid_dish(message);
                }
            }

      
            decimal updatePrice = order.Price;
            foreach (var item in update.items)
            {
                if (item.quantity <= 0) 
                {
                    string message = " La cantidad tiene que ser mayor a 0";
                    throw new invalid_quantity(message);
                }

                var existItem = await _Query.getOrderItemInOrder(order.OrderId, item.id);

                if (existItem != null) //Veo si el plato existe y el estado, si esta en preparación agrego x cantidad. Si no agrego otro plato.
                {
                    existItem.Quantity += item.quantity;  
                }
                else 
                {   var status = await _Query.GetStatusById(1);
                   
                    var orderItem = new OrderItem
                    {
                        Order = order.OrderId,
                        Dish = item.id,
                        Quantity = item.quantity,
                        Notes = item.notes,
                        Status = 1,
                        StatusEntity = new Domain.Entities.Status{Id = status.Id,Name = status.Name},
                        CreateDate = DateTime.Now,
                    };
                   order.OrderItems.Add(orderItem);
                } 
               updatePrice += await _Query.GetPriceByDishId(item.id) * item.quantity;           
            }
            order.Price=updatePrice;
            order.OverallStatus = 1;
            await _Command.UpdateOrder(id, order);
            return new OrderUpdateReponse 
            {
                orderNumber = order.OrderId,
                totalAmount = (Double)order.Price,
                updateAt = order.UpdateDate,
            };
        }

        public async Task<OrderUpdateReponse> UpdateOrderItemStatus(long OrderId, long itemId, OrderItemUpdateRequest UpdateItemRequest)
        {
            if (await _Query.GetOrderById(OrderId) == null) 
            {
                string message = " Orden no encontrada";
                throw new order_notfound(message);
            }
            var order_ToUpdate = await _Query.GetOrderById(OrderId);

            if (!await _Query.existOrderItemInOrder(OrderId,itemId)) 
            {
                string message = " Item no encontrado en la orden";
                throw new item_not_found(message);
            }
            if (UpdateItemRequest.status <= 0 || UpdateItemRequest.status > 5) 
            {
                string message = " Estado invalido"; 
                throw new invalid_status(message);
            }
            foreach (var item in order_ToUpdate.OrderItems)
            {
                if (item.OrderItemId == itemId && UpdateItemRequest.status > item.Status)
                {
                    item.Status = UpdateItemRequest.status;
                }
                else 
                {
                    if (UpdateItemRequest.status < item.Status) 
                    {
                        string ActualStatus = await _Query.getstatusName(item.Status);
                        string nameupdatestatus = await _Query.getstatusName(UpdateItemRequest.status);
                        string message = " No se puede cambiar de " + "'" + ActualStatus + "'" + " a " + "'" + nameupdatestatus + "'";
                        throw new invalid_transition(message);

                    }

                }

            }

            if(order_ToUpdate.OrderItems.All(i => i.Status == 5))
            {
                order_ToUpdate.OverallStatus = 5;
            }
            else if (order_ToUpdate.OrderItems.All(i => i.Status == 4))
            {
                order_ToUpdate.OverallStatus = 4;
            }
            else if (order_ToUpdate.OrderItems.All(i => i.Status == 3))
            {
                order_ToUpdate.OverallStatus = 3;
            }
            else if (order_ToUpdate.OrderItems.All(i => i.Status == 2))
            {
                order_ToUpdate.OverallStatus = 2;
            }
            else if (order_ToUpdate.OrderItems.Any(i => i.Status == 1))
            {
                order_ToUpdate.OverallStatus = 1;
            }

            order_ToUpdate.UpdateDate = DateTime.Now;

            var order =await _Command.UpdateOrderItemStatus(OrderId,order_ToUpdate);
            return new OrderUpdateReponse 
            {
                orderNumber = order.OrderId,
                totalAmount = (Double)order.Price,
                updateAt = order.UpdateDate,

            };
        }



        
    }
}
