
namespace Sum_Cubits_Application.Features.Turnos
{
    public class TurnoDto
    {
        public int TurnoId { get; set; }
        public string? NombreTurno { get; set; }
        public string? HoraInicio { get; set; }
        public string? HoraFin { get; set; }
        public bool? Activo { get; set; }
    }
}
