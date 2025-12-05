using System.Text.Json.Serialization;


namespace Domain.Entities
{
    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int Order { get; set; }

        [JsonIgnore]
        public ICollection<Dish> Dishes { get; set;}
       
    }
}
