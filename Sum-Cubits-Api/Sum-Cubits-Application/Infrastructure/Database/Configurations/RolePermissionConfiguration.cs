
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Sum_Cubits_Application.Features.Roles;

namespace Sum_Cubits_Application.Infrastructure.Database.Configurations
{
    public class RolePermissionConfiguration : IEntityTypeConfiguration<RolPermiso>
    {
        public void Configure(EntityTypeBuilder<RolPermiso> builder)
        {
            builder.ToTable("rolespermisos");
            builder.HasKey(rp => new { rp.RolId, rp.PermisoId });

            builder.Property(rp => rp.RolId)
                .HasColumnName("rol_id");
            builder.HasOne(rp => rp.Role)
                .WithMany()
                .HasForeignKey(rp => rp.RolId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Property(rp => rp.PermisoId)
                .HasColumnName("permiso_id");
            builder.HasOne(rp => rp.Permission)
                .WithMany()
                .HasForeignKey(rp => rp.PermisoId)
                .OnDelete(DeleteBehavior.Restrict);


        }
    }
}
