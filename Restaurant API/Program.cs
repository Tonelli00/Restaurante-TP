using Application.Interfaces;
using Application.UseCase.Category;
using Application.UseCase.DeliveryType;
using Application.UseCase.Dish;
using Application.UseCase.Order;
using Application.UseCase.Status;
using Infraestructure.Command;
using Infraestructure.Persistence;
using Infraestructure.Querys;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//Custom
var connectionString= builder.Configuration["ConnectionStrings"];
builder.Services.AddDbContext<AppDbContext>(opt => opt.UseSqlServer(connectionString));

builder.Services.AddScoped<IDishServices,DishServices>();
//Esto lo que hace es que cada vez que un controlador, servicio o clase pida un IDishService, el programa le va a devolver  una instancia de DishService.
//El Add scoped sirve para que cada peticion tenga su propia instancia .
builder.Services.AddScoped<IDishQuery, DishQuery>();
//Inyecto la query para dish
builder.Services.AddScoped<IDishCommand, DishCommand>();
//Inyecto el command para dish
builder.Services.AddScoped<ICategoryServices, CategoryServices>();
builder.Services.AddScoped<ICategoryCommand, CategoryCommand>();
//Inyecto el command para category
builder.Services.AddScoped<ICategoryQuery, CategoryQuery>();
//Inyecto la query para command
//Inyecto el servicio, querys y command para delivery type.
builder.Services.AddScoped<IDeliveryTypeServices, DeliveryTypeServices>();
builder.Services.AddScoped<IDeliveryTypeCommand, DeliveryTypeCommand>();
builder.Services.AddScoped<IDeliveryTypeQuery, DeliveryTypeQuery>();
//Inyecto el servicio, querys y command para status
builder.Services.AddScoped<IStatusServices, StatusServices>();
builder.Services.AddScoped<IStatusCommand,StatusCommand>();
builder.Services.AddScoped<IStatusQuery, StatusQuery>();
//Inyecto el servicio, querys y command para order
builder.Services.AddScoped<IOrderServices, OrderServices>();
builder.Services.AddScoped<IOrderCommand, OrderCommand>();
builder.Services.AddScoped<IOrderQuery, OrderQuery>();

//Agrego las anotaciones
builder.Services.AddSwaggerGen(c => {

    c.EnableAnnotations();
}
) ;


builder.Services.AddSwaggerGen(options =>
{
    options.MapType<Application.Enums.SortByPrice>(() => new Microsoft.OpenApi.Models.OpenApiSchema
    {
        Type = "string",
        Enum = new List<Microsoft.OpenApi.Any.IOpenApiAny>
        {
            new Microsoft.OpenApi.Any.OpenApiString("asc"),
            new Microsoft.OpenApi.Any.OpenApiString("desc")
        }
    });

});

//Configuro CORS (Porque mi front y back se corren en dominios distintos)

builder.Services.AddCors(option => 
{
    option.AddPolicy("PermitirTodo", policy => 
    {
        policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
    });
});


//end custom

var app = builder.Build();

//Aplico la configuración de cors
app.UseCors("PermitirTodo");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
