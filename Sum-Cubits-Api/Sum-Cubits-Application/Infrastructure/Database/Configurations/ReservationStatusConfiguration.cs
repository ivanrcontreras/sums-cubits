using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using Sum_Cubits_Application.Features.EstadosReserva;

namespace Sum_Cubits_Application.Infrastructure.Database.Configurations
{
    public class ReservationStatusConfiguration : IEntityTypeConfiguration<Estado>
    {
        public void Configure(EntityTypeBuilder<Estado> builder)
        {
            builder.ToTable("estadosreserva");

            builder.HasKey(er => er.EstadoId);
            builder.Property(er => er.EstadoId)
                .HasColumnName("id");

            builder.Property(er => er.NombreEstado)
                .IsRequired()
                .HasColumnName("nombre_estado")
                .HasMaxLength(100);
        }
    }
}
