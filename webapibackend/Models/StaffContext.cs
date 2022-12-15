using Microsoft.EntityFrameworkCore;
namespace webapibackend.Models
{
    public class StaffContext : DbContext
    {
        public StaffContext(DbContextOptions<StaffContext> options)
            : base(options)
        {

        }
        public DbSet<Staff> Staffs { get; set; } = null!;
    }
}
