using System.Text.Json.Serialization;


namespace Application.Enums
{
    [JsonConverter(typeof(JsonStringEnumConverter))] 

    public enum SortByPrice
    {
            asc=0,
            desc=1
    }
}
