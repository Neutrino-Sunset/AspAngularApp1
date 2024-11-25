using AspAngularApp1.Server.Model.Entities;
using Microsoft.EntityFrameworkCore;

namespace AspAngularApp1.Server.Model.Data
{
   public class AppDbContext : DbContext
   {
      public AppDbContext(DbContextOptions<AppDbContext> options)
          : base(options)
      {}

      public DbSet<Consultants> Consultants { get; set; } = default;
   }
}
