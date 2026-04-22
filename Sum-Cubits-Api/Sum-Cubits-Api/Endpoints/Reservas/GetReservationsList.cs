using LinqKit;
using Microsoft.AspNetCore.Mvc;
using Sum_Cubits_Application.Features.Reservas;
using System.Linq.Expressions;

namespace Sum_Cubits_Api.Endpoints.Reservas
{
    public static class GetReservationsList
    {
        public record Response(List<ReservaDto> ReservationDto);
        public static async Task<IResult> Handle(DateOnly? reservationDate,
            [FromServices] QueryReserva queryReserva)
        {
            var reservationsPredicate = BuildPredicate(reservationDate);
            var reservationsList = await queryReserva.GetList(reservationsPredicate);
            var reservationsDto = reservationsList.Select(r => new ReservaDto
            {
                FechaReserva = r.FechaReserva,
                FullNameUser = r.Usuario.FullName,
                PhoneUser = r.Usuario.Telefono,
                NameTurn = r.Turno.NombreTurno,
                HourStart = Convert.ToString(r.Turno.HoraInicio),
                HourEnd = Convert.ToString(r.Turno.HoraFin)
            }).ToList();
            return Results.Ok(new Response(reservationsDto));
        }
        private static Expression<Func<Reserva, bool>> BuildPredicate(DateOnly? reservationDate)
        {
            var predicate = PredicateBuilder.New<Reserva>(true);

            predicate = predicate.And(r => r.Estado.NombreEstado == "Confirmada");

            if (reservationDate.HasValue)
                predicate = predicate.And(r => r.FechaReserva == reservationDate);

            return predicate;
        }
    }
}
