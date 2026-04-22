using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Sum_Cubits_Application.Features.Salones;

namespace Sum_Cubits_Application.Infrastructure.Database.Configurations
{
    public class SalonesConfiguration : IEntityTypeConfiguration<Salon>
    {
        public void Configure(EntityTypeBuilder<Salon> builder)
        {
            builder.ToTable("salones");
            builder.HasKey(e => e.SalonId);
            builder.Property(e => e.SalonId)
                .HasColumnName("id");
            builder.Property(e => e.Nombre)
                .IsRequired()
                .HasMaxLength(100)
                .HasColumnName("nombre");
            builder.Property(e => e.Activo)
                .HasColumnName("activo");
        }
    }
}
