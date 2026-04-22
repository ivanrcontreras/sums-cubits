using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Sum_Cubits_Application.Features.Roles;

namespace Sum_Cubits_Application.Infrastructure.Database.Configurations
{
    public class RoleConfiguration : IEntityTypeConfiguration<Rol>
    {
        public void Configure(EntityTypeBuilder<Rol> builder)
        {
            builder.ToTable("roles");
            builder.HasKey(r => r.RolId);
            builder.Property(r => r.RolId)
                .HasColumnName("id");
            builder.Property(r => r.NombreRol)
                   .IsRequired()
                   .HasMaxLength(100)
                   .HasColumnName("nombre_rol");
            builder.Property(r => r.FechaCreacion)
                .IsRequired()
                .HasColumnName("fecha_creacion");
            builder.Property(r => r.Fecha_Baja)
                .HasColumnName("fecha_baja");
        }
    }
}
