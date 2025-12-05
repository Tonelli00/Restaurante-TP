using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Models
{
    public class Items
    {
        [Required]
        public Guid id { get; set; }
        [Required]
        public int quantity { get; set; }
        public string? notes { get; set; }
    }
}
