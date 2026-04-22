
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Sum_Cubits_Application.Features.Usuarios;

namespace Sum_Cubits_Application.Infrastructure.Database.Configurations
{
    public class UserConfiguration : IEntityTypeConfiguration<Usuario>
    {
        public void Configure(EntityTypeBuilder<Usuario> builder)
        {
            builder.ToTable("usuarios");
            builder.HasKey(u => u.UsuarioId);
            builder.Property(u => u.UsuarioId)
                .HasColumnName("id");
            builder.Property(u => u.RolId)
                .IsRequired()
                .HasColumnName("rol_id");
            builder.Property(u => u.FullName)
                .HasMaxLength(100)
                .HasColumnName("full_name");
            builder.Property(u => u.Email)
                .IsRequired()
                .HasMaxLength(255)
                .HasColumnName("email");
            builder.Property(u => u.Telefono)
                .HasColumnName("telefono");
            builder.Property(u => u.FechaRegistro)
                .IsRequired()
                .HasColumnName("fecha_registro");
            builder.Property(u => u.FechaBaja)
                .HasColumnName("fecha_baja");
            builder.Property(u => u.Activo)
                .IsRequired()
                .HasColumnName("activo");
            builder.HasOne(u => u.Role)
                .WithMany()
                .HasForeignKey(u => u.RolId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
