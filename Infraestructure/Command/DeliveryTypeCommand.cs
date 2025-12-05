using Application.Interfaces;
using Infraestructure.Persistence;


namespace Infraestructure.Command
{
    public class DeliveryTypeCommand:IDeliveryTypeCommand
    {
        private readonly AppDbContext _Context;
        public DeliveryTypeCommand(AppDbContext context) 
        {
        _Context=context; 
        }

    }
}
