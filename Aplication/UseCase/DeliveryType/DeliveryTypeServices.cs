using Application.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.UseCase.DeliveryType
{
    public class DeliveryTypeServices:IDeliveryTypeServices
    {
        private readonly IDeliveryTypeQuery _query;
        private readonly IDeliveryTypeCommand _command;

        public DeliveryTypeServices(IDeliveryTypeCommand command, IDeliveryTypeQuery query) 
        {
            _command = command;
            _query = query;
        }

        public async Task<List<Domain.Entities.DeliveryType>> getDeliveries()
        {
            return await _query.getDeliveries();
        }
    }
}
