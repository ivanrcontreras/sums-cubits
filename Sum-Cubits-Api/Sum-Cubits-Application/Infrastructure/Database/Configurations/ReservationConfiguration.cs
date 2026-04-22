
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Sum_Cubits_Application.Features.Reservas;

namespace Sum_Cubits_Application.Infrastructure.Database.Configurations
{
    public class ReservationConfiguration : IEntityTypeConfiguration<Reserva>
    {
        public void Configure(EntityTypeBuilder<Reserva> builder)
        {
            builder.ToTable("reservas");
            builder.HasKey(r => r.ReservaId);
            builder.Property(r => r.ReservaId)
                .HasColumnName("id");
            builder.Property(r => r.UsuarioId)
                .HasColumnName("usuario_id")
                .IsRequired();
            builder.Property(r => r.SalonId)
                .HasColumnName("salon_id")
                .IsRequired();
            builder.Property(r => r.TurnoId)
                .HasColumnName("turno_id")
                .IsRequired();
            builder.Property(r => r.EstadoId)
                .HasColumnName("estado_id")
                .IsRequired();
            builder.Property(r => r.FechaReserva)
                .HasColumnName("fecha_reserva")
                .HasColumnType("date")
                .IsRequired();
            builder.Property(r => r.FechaSolicitud)
                .HasColumnName("fecha_solicitud")
                .IsRequired(false);
            builder.Property(r => r.Observaciones)
                .HasColumnName("observaciones")
                .HasMaxLength(500);

            builder.HasOne(r => r.Usuario)
                .WithMany()
                .HasForeignKey(r => r.UsuarioId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(r => r.Salon)
                .WithMany()
                .HasForeignKey(r => r.SalonId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(r => r.Turno)
                .WithMany()
                .HasForeignKey(r => r.TurnoId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(r => r.Estado)
                .WithMany()
                .HasForeignKey(r => r.EstadoId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
