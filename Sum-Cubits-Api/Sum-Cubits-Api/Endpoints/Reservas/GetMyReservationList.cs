using LinqKit;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Sum_Cubits_Application.Features.Reservas;
using Sum_Cubits_Application.Features.Turnos;
using Sum_Cubits_Application.Infrastructure.Services;
using System.Linq.Expressions;
using System.Security.Claims;

namespace Sum_Cubits_Api.Endpoints.Reservas
{
    public class GetMyReservationList
    {

        public record Response(List<ReservaDto>ReservationDto);


        [Authorize]
        public static async Task<IResult> Handle(HttpContext httpContext,
            [FromServices]QueryReserva queryReserva, 
            [FromServices] UserService userService)
        {
            var userEmail = httpContext.User.FindFirstValue("email")
                         ?? httpContext.User.FindFirstValue(ClaimTypes.Email);

            if (string.IsNullOrEmpty(userEmail))
                return Results.Unauthorized();

            var userId = await userService.GetUserId(userEmail);

            if (userId == null || userId == 0)
            {
                return Results.NotFound("Usuario no encontrado");
            }

            var reservationListPredicate = BuildPredicate(userId);
            var reservationList = await queryReserva.GetList(reservationListPredicate);

            var reservationDtos = reservationList
                .GroupBy(r => r.FechaReserva)
                .Select(g => new ReservaDto
                {
                    FechaReserva = g.Key,
                    ListTurnsDto = g.Select(t => new TurnoDto
                    {
                        TurnoId = t.Turno.TurnoId,
                        NombreTurno = t.Turno.NombreTurno,
                        HoraInicio = Convert.ToString(t.Turno.HoraInicio),
                        HoraFin = Convert.ToString(t.Turno.HoraFin)
                    })
                    .OrderBy(t => t.TurnoId)
                    .ToList()
                })
                .OrderBy(r => r.FechaReserva)
                .ToList();




            return Results.Ok(new Response(reservationDtos));
        }

        private static Expression<Func<Reserva, bool>> BuildPredicate(int? userId)
        {
            var predicate = PredicateBuilder.New<Reserva>(true);

            if (userId.HasValue)
                predicate = predicate.And(r => r.UsuarioId == userId.Value
                && r.Estado.NombreEstado == "Confirmada"
                && r.FechaReserva >= DateOnly.FromDateTime(DateTime.Now));

            return predicate;
        }
    }
}
