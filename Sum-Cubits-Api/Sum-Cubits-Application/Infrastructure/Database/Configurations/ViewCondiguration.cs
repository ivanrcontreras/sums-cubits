
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Sum_Cubits_Application.Features.Vistas;

namespace Sum_Cubits_Application.Infrastructure.Database.Configurations
{
    public class ViewCondiguration : IEntityTypeConfiguration<Vista>
    {
        public void Configure(EntityTypeBuilder<Vista> builder)
        {
            builder.ToTable("vistas");
            builder.HasKey(v => v.VistaId);
            builder.Property(v => v.VistaId)
                .HasColumnName("id");
            builder.Property(v => v.NombreVista)
                .HasMaxLength(100)
                .HasColumnName("nombre_vista");
            builder.Property(v => v.Icono)
                .HasMaxLength(100)
                .HasColumnName("icono");
            builder.Property(v => v.Ruta)
                .HasMaxLength(200)
                .HasColumnName("ruta");
            builder.Property(v => v.Fecha_Alta)
                .HasColumnName("fecha_alta");
            builder.Property(v => v.Fecha_Modificacion)
                .HasColumnName("fecha_modificacion");
            builder.Property(v => v.Fecha_Baja)
                .HasColumnName("fecha_baja");
        }
    }
}
