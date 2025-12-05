using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace Application.Models
{

    public class DishUpdateRequest
    {
        
      
        public string Name { get; set; }= string.Empty;

        public string? Description { get; set; }
        
        public decimal Price { get; set; }
       
        public int Category { get; set; }
        
        [Url(ErrorMessage = "La URL de la imagen no es válida")]
        public string? Image { get; set; }
        [Required (ErrorMessage ="Se debe indicar un estado")]
        public bool IsActive { get; set; } 
       
   

    }
}
