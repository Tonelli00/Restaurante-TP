using Domain.Entities; 
using Microsoft.EntityFrameworkCore;


namespace Infraestructure.Persistence
{
    public class AppDbContext:DbContext
    {
       
        public DbSet<Category>Categories{ get; set;}
        public DbSet<DeliveryType> DeliveryTypes { get; set;}
        public DbSet<Dish> Dishes { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Status> Statuses { get; set; }

   


       

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) 
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //Write Fluent API configurations here

            

            //Property Configurations
            modelBuilder.Entity<Category>(entity => {
                entity.ToTable("Category"); //--> Defino que la tabla se va a llamar Category
                entity.Property(c => c.Id).HasColumnName("Id").IsRequired(); //--> Aca se define una columna con el nombre ID y es requerida. Es decir, no puede ser nulo.
                entity.HasKey(c => c.Id);//-->Defino que su PK va a ser el ID.
                entity.Property(c => c.Id).ValueGeneratedOnAdd();//Aca defino que su PK (ID) se autoincremente.
                entity.Property(c => c.Name).HasColumnName("Name").HasMaxLength(25).IsRequired();//--> Se define una columna con el nombre Name y es de tipo var char con una longitud maxima de 25 y que sea varchar y no nvarchar.
                entity.Property(c => c.Description).HasColumnName("Description").HasMaxLength(255).IsRequired(); //--> Lo mismo que el anterior.
                entity.Property(c => c.Order).HasColumnName("Order").HasColumnType("integer").IsRequired();

                

                entity.HasData
                (
                    new Category {
                        Id=1,
                        Name="Entradas",
                        Description= "Pequeñas porciones para abrir el apetito antes del plato principal.",
                        Order= 1
                    },
                    new Category
                    {
                        Id = 2,
                        Name = "Ensaladas",
                        Description = "Opciones frescas y livianas, ideales como acompañamiento o plato principal.",
                        Order = 2
                    },
                    new Category
                    {
                        Id = 3,
                        Name = "Minutas",
                        Description = " Platos rápidos y clásicos de bodegón: milanesas, tortillas, revueltos.",
                        Order = 3
                    },
                    new Category
                    {
                        Id = 4,
                        Name = "Pastas",
                        Description = "Variedad de pastas caseras y salsas tradicionales.",
                        Order = 5   
                    },
                    new Category
                    {
                        Id = 5,
                        Name = "Parrilla",
                        Description = "Cortes de carne asados a la parrilla, servidos con guarniciones.",
                        Order = 4
                    },
                    new Category
                    {
                        Id = 6,
                        Name = "Pizzas",
                        Description = "Pizzas artesanales con masa casera y variedad de ingredientes.",
                        Order = 7
                    },
                    new Category
                    {
                        Id = 7,
                        Name = "Sandwiches",
                        Description = "Sandwiches y lomitos completos preparados al momento.",
                        Order = 6
                    },
                    new Category
                    {
                        Id = 8,
                        Name = "Bebidas",
                        Description = "Gaseosas, jugos, aguas y opciones sin alcohol.",
                        Order = 8
                    },
                    new Category
                    {
                        Id = 9,
                        Name = "Cervezas Artesanal",
                        Description = "Cervezas de producción artesanal, rubias, rojas y negras.",
                        Order = 9
                    },
                    new Category
                    {
                        Id = 10,
                        Name = "Postres",
                        Description = "Clásicos dulces caseros para cerrar la comida.",
                        Order = 10
                    }




                    );
            
            
            
            
            });
            //Aca ya estaria terminado el MODELADO de la tabla category. Tengo que ver las relaciones.

            //Empiezo el MODELADO de la tabla DeliveryType
            modelBuilder.Entity<DeliveryType>(entity =>
            {
                entity.ToTable("DeliveryType"); 
                entity.Property(d => d.Id).HasColumnName("Id"); 
                entity.HasKey(d => d.Id); 
                entity.Property(d => d.Id).ValueGeneratedOnAdd(); 
                entity.Property(d => d.Name).HasColumnName("Name").HasMaxLength(25).IsRequired();

                //Precargo los datos


                entity.HasData(

                    new DeliveryType 
                    { 
                    Id=1,
                    Name="Delivery"
                    },
                    new DeliveryType
                    {
                        Id = 2,
                        Name = "Take Away"
                    },
                    new DeliveryType
                    {
                        Id = 3,
                        Name = "Dine in"
                    }
                    );
            
            });
            //Aca ya estaria terminado el MODELADO de la tabla deliverytype.

            //Empiezo el modelado de Dish
            modelBuilder.Entity<Dish>(entity =>
            {
                entity.ToTable("Dish"); 
                entity.Property(d => d.DishId).HasColumnName("DishId");
                entity.HasKey(d => d.DishId);
                entity.Property(d => d.DishId).HasDefaultValueSql("NEWID()").IsRequired();
                entity.Property(d => d.Name).HasColumnName("Name").HasMaxLength(255).IsUnicode(false).IsRequired();
                entity.Property(d => d.Description).HasColumnName("Description").HasColumnType("varchar(max)").IsUnicode(false).IsRequired();
                
                entity.Property(d => d.Price).HasColumnName("Price").HasColumnType("decimal(10,2)").IsRequired();
               
                entity.Property(d => d.Available).HasColumnName("Available").HasColumnType("bit").IsRequired();

                entity.HasOne<Category>(d => d.CategoryEntity)
                       .WithMany(c => c.Dishes)
                       .HasForeignKey(d => d.Category);
                      
                // Aca ya establecí la relación de 1 a muchon con platos y categorías.

                entity.Property(d => d.ImageUrl).HasColumnName("ImageURL").HasColumnType("varchar(max)").IsRequired();
                entity.Property(d => d.CreateDate).HasColumnName("CreateDate").HasColumnType("datetime").HasDefaultValueSql("GETDATE()").IsRequired();
                entity.Property(d => d.UpdateDate).HasColumnName("UpdateDate").HasColumnType("datetime").HasDefaultValueSql("GETDATE()").IsRequired();
            });

            //Hago el modelado de datos para OrderItem:
            modelBuilder.Entity<OrderItem>(entity =>
            {
                
                entity.ToTable("OrderItem"); 
                entity.Property(o => o.OrderItemId).HasColumnName("OrderItemId").IsRequired();
                entity.HasKey(o => o.OrderItemId);
                entity.Property(o => o.OrderItemId).ValueGeneratedOnAdd();

                //Order
                entity.Property(o => o.Order).HasColumnName("OrderId").IsRequired();
                entity.HasOne<Order>(oI => oI.OrderEntity)
                    .WithMany(o => o.OrderItems)
                    .HasForeignKey(oI => oI.Order)
                    .OnDelete(DeleteBehavior.Cascade);
                     
                //Establezco la relación de 1 a muchos entre order item y order. Dado que un order item pertenece a una orden pero una order puede tener muchos order items


                //Dish
                entity.Property(o => o.Dish).HasColumnName("DishId").IsRequired();
                entity.HasOne<Dish>(o => o.DishEntity)
                      .WithMany(d => d.OrderItems)
                      .HasForeignKey(o => o.Dish)
                      .OnDelete(DeleteBehavior.Cascade);
                      
                //Aca establezco que un order item tiene un plato pero un plato puede estar en distintos orders items. La clave foranea es el ID del plato (que tengo como variable en la clase order item)

                //Creo una columna llamada Quantity.
                entity.Property(o => o.Quantity).HasColumnName("Quantity").IsRequired();
               

                //Status
                entity.Property(o => o.Status).HasColumnName("StatusId").IsRequired();
                entity.HasOne<Status>(o => o.StatusEntity)
                      .WithMany(s => s.OrderItems)
                      .HasForeignKey(o => o.Status)
                      .OnDelete(DeleteBehavior.Restrict);
                      

                //Aca establezco que un order item tiene un status pero un status puede estar en distintos order items. La fk es statusId

                //Creo columna para Notes
                entity.Property(o => o.Notes).HasColumnName("Notes").HasColumnType("varchar(max)").IsRequired();

                //Creo columna para Create Date
                entity.Property(o => o.CreateDate).HasColumnName("CreateDate").HasColumnType("datetime").HasDefaultValueSql("GETDATE()").IsRequired();//Creo una columna llamada CreateDate.

            });
            
            modelBuilder.Entity<Order>(entity =>
            {
                entity.ToTable("Order");
                //Creo la columna Order Id
                entity.Property(o => o.OrderId).HasColumnName("OrderId").HasColumnType("bigint").IsRequired(true);
                entity.HasKey(o => o.OrderId);
                entity.Property(o => o.OrderId).ValueGeneratedOnAdd();
                //Creo la columna Delivery type.
                entity.Property(o => o.DeliveryType).HasColumnName("DeliveryId");
                entity.HasOne<DeliveryType>(o => o.DeliveryTypeEntity)
                      .WithMany(d => d.DeliveryInOrders)
                      .HasForeignKey(o => o.DeliveryType);
                      
                //Aca creo una relacion de 1 a muchos entre la orden y el tipo de delivery de la orden.
               

                
                entity.Property(o => o.DeliveryTo).HasColumnName("DeliveryTo").HasMaxLength(255);

                //Creo la columna Status Id
                entity.Property(o => o.OverallStatus).HasColumnName("StatusId").IsRequired(true);

                entity.HasOne<Status>(o => o.StatusEntity)
                      .WithMany(s => s.Orders)
                      .HasForeignKey(o => o.OverallStatus);
                      

                //Establezco que una orden puede tener un status pero un status puede estar en muchas ordenes. La fk va a ser statusId (propiedad de la clase order)

                //Creo la columna notes
                entity.Property(o => o.Notes).HasColumnName("Notes").HasColumnType("varchar(max)");

                //creo la columna price

                entity.Property(o => o.Price).HasColumnName("Price").HasColumnType("decimal(10,2)");

                //Creo la culumna create date
                entity.Property(o => o.CreateDate).HasColumnName("CreateDate").HasColumnType("datetime").HasDefaultValueSql("GETDATE()").IsRequired(true);

                //creo la columna Update Date
                entity.Property(o => o.UpdateDate).HasColumnName("UpdateDate").HasColumnType("datetime").HasDefaultValueSql("GETDATE()").IsRequired(true);

            });
            modelBuilder.Entity<Status>(entity =>
            {
                entity.ToTable("Status");
                entity.Property(s => s.Id).HasColumnName("Id").IsRequired();
                entity.HasKey(s => s.Id);
                entity.Property(s => s.Name).HasColumnName("Name").HasMaxLength(25).IsUnicode(false);
                //Defino la columna Name con una cantidad max de 25 caracteres y que sea varchar

                //Precargo los datos

                entity.HasData
                (

                    new Status 
                    {
                        Id=1,
                        Name="Pending"
                    },
                    new Status
                    {
                        Id = 2,
                        Name = "In progress"
                    },
                    new Status
                    {
                        Id = 3,
                        Name = "Ready"
                    },
                    new Status
                    {
                        Id = 4,
                        Name = "Delivery"
                    },
                    new Status
                    {
                        Id = 5,
                        Name = "Closed"
                    }
                    );
            
            
            
            });









        }
    }
}
