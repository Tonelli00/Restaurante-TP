using Application.Interfaces;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.UseCase.Category
{
    public class CategoryServices : ICategoryServices
    {
        private readonly ICategoryCommand _command;
        private readonly ICategoryQuery _query;
        public CategoryServices(ICategoryCommand command, ICategoryQuery query)
        {
            this._command = command;
            this._query = query;
        }
        public async Task<List<Domain.Entities.Category>> GetCategories()
        {
            return await _query.GetCategories();
        }
    }
}
