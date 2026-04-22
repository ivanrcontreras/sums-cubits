using Sum_Cubits_Application.Features.Turnos;

namespace Sum_Cubits_Application.Features.Reservas
{
    public class ReservaDto
    {
        public DateOnly FechaReserva { get; set; }
        public List<TurnoDto> ListTurnsDto { get; set; }

        public  string FullNameUser { get; set; }

        public string PhoneUser { get; set; }

        public string NameTurn { get; set; }

        public string HourStart { get; set; }
        public string HourEnd { get; set; }

    }
}
