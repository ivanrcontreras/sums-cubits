
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Sum_Cubits_Application.Features.Permisos;

namespace Sum_Cubits_Application.Infrastructure.Database.Configurations
{
    public class PermissionConfiguration : IEntityTypeConfiguration<Permiso>
    {
        public void Configure(EntityTypeBuilder<Permiso> builder)
        {
            builder.ToTable("permisos");
            builder.HasKey(p => p.PermisoId);
            builder.Property(p => p.PermisoId)
                .HasColumnName("id");
            builder.Property(p => p.Accion)
                .IsRequired()
                .HasMaxLength(100)
                .HasColumnName("accion");
            builder.Property(p => p.Controlador)
                .HasColumnName("controlador");
            builder.Property(p => p.Fecha_Alta)
                .HasColumnName("fecha_alta");
            builder.Property(p => p.Fecha_Modificacion)
                .HasColumnName("fecha_modificacion");
            builder.Property(p => p.Fecha_Baja)
                .HasColumnName("fecha_baja");
        }
    }
}
