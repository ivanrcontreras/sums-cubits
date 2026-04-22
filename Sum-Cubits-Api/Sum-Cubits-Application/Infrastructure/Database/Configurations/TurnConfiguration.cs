
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Sum_Cubits_Application.Features.Turnos;

namespace Sum_Cubits_Application.Infrastructure.Database.Configurations
{
    public class TurnConfiguration : IEntityTypeConfiguration<Turno>
    {
        public void Configure(EntityTypeBuilder<Turno> builder)
        {
            builder.ToTable("turnos");

            builder.HasKey(t => t.TurnoId);
            builder.Property(t => t.TurnoId)
                .HasColumnName("id");

            builder.Property(t => t.NombreTurno)
                .IsRequired()
                .HasMaxLength(100)
                .HasColumnName("nombre_turno");
            builder.Property(t => t.HoraInicio)
                .IsRequired()
                .HasColumnName("hora_inicio");
            builder.Property(t => t.HoraFin)
                .IsRequired()
                .HasColumnName("hora_fin");
            builder.Property(t => t.Activo)
                .IsRequired()
                .HasColumnName("activo");
            builder.Property(t => t.FechaCreacion)
                .HasColumnName("fecha_creacion");
            builder.Property(t => t.FechaModificacion)
                .HasColumnName("fecha_modificacion");
        }
    }
}
