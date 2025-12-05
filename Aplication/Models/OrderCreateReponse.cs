using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Models
{
    public class OrderCreateReponse //Esta es la respuesta que me da el swagger. 
    {
        public long orderNumber { get; set; }
        public double totalAmount { get; set; }

        public DateTime createdAt { get; set; }
    }
}
