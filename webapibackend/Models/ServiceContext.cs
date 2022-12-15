using Microsoft.EntityFrameworkCore;
namespace webapibackend.Models
{
    public class ServiceContext : DbContext
    {
        public ServiceContext(DbContextOptions<ServiceContext> options)
            : base(options)
        {

        }

        public DbSet<Service> Services { get; set; } = null!;
    }
}
