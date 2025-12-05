using Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Models
{
    public class OrderRequest //Esta es la petición para crear una orden.
    {
        [Required]
        public List<Items>? items { get; set; }
        [Required]
        public Delivery delivery { get; set; }
        public string? notes { get; set; }
    }
}
