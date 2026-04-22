using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Sum_Cubits_Application.Features.Roles;

namespace Sum_Cubits_Application.Infrastructure.Database.Configurations
{
    public class RoleViewConfiguration : IEntityTypeConfiguration<RolVista>
    {
        public void Configure(EntityTypeBuilder<RolVista> builder)
        {
            builder.ToTable("rolesvistas");
            builder.HasKey(rv => new { rv.RolId, rv.VistaId });
            builder.Property(rv => rv.RolId)
                .HasColumnName("rol_id");
            builder.HasOne(rv => rv.Role)
                .WithMany()
                .HasForeignKey(rv => rv.RolId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Property(rv => rv.VistaId)
                .HasColumnName("vista_id");
            builder.HasOne(rv => rv.View)
                .WithMany()
                .HasForeignKey(rv => rv.VistaId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
