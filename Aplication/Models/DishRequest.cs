

using Swashbuckle.AspNetCore.Annotations;
using System.ComponentModel.DataAnnotations;

namespace Application.Models
{
    public class DishRequest
    {

        [Required(ErrorMessage ="El campo nombre es requerido.")]
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        [Required(ErrorMessage = "El campo precio es requerido")]
        public decimal Price { get; set; }
        [Required(ErrorMessage ="El campo categoria es requerido")]
        public int Category { get; set; }
        [Url(ErrorMessage = "La URL de la imagen no es válida")]
        public string? Image { get; set; }
    }
}
