using Application.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.UseCase.Status
{
    public class StatusServices : IStatusServices
    {
        private readonly IStatusQuery _Query;
        private readonly IStatusCommand _Command;

        public StatusServices(IStatusQuery query, IStatusCommand command)
        {
            _Query = query;
            _Command = command;
        }

        public async Task<List<Domain.Entities.Status>> GetStatus()
        {
            return await _Query.GetStatus();
        }
    }
}
