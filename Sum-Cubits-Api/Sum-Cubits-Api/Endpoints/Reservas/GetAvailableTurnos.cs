using LinqKit;
using Microsoft.AspNetCore.Mvc;
using Sum_Cubits_Application.Features.Reservas;
using Sum_Cubits_Application.Features.Turnos;
using Sum_Cubits_Application.Infrastructure.Services;
using System.Linq.Expressions;
namespace Sum_Cubits_Api.Endpoints.Reservas
{
    public static class GetAvailableTurnos
    {
        public record Request (DateOnly fechaReserva, int salonId);
        public record Response(bool AllOcuped, string? Mesagge, List<TurnoDto>? TurnsDtos);

        public static async Task<IResult> Handle(
            [FromBody] Request request,
            [FromServices] QueryReserva queryReserva,
            [FromServices] QueryTurno queryTurno,
            [FromServices] IHttpClientFactory httpFactory)
        {

            // Consultar si la fecha es feriado usando la API externa
            var httpClient = httpFactory.CreateClient();
            var isHoliday = await HolydayService.IsHoliday(request.fechaReserva, httpClient);

            // Obtener todos los turnos disponibles según el día (trato feriados como fin de semana)
            var isWeekendOrHoliday = GetIsWeekend(request.fechaReserva) || isHoliday;
            var turnsLisPredicate = BuildPredicate(request.fechaReserva, isWeekendOrHoliday);
            var turnslist = await queryTurno.GetList(turnsLisPredicate);
            var allTurnsIds = turnslist.Select(t => t.TurnoId).ToArray();

            var turnsDisponibiliIds = await queryReserva.GetTurnsDisponibili(request.fechaReserva, request.salonId, allTurnsIds);

            if (turnsDisponibiliIds.Count == 0)
            {
                return Results.Ok(new Response(
                    AllOcuped: true,
                    Mesagge: "No hay turnos disponibles para la fecha seleccionada.",
                    TurnsDtos: null
                ));
            }

            var turnsDisponibiliDtos = turnslist
                .Where(t => turnsDisponibiliIds.Contains(t.TurnoId))
                .Select(t => new TurnoDto
                {
                    TurnoId = t.TurnoId,
                    NombreTurno = t.NombreTurno
                })
                .ToList();

            return Results.Ok(new Response(
                AllOcuped: false,
                Mesagge: null,
                TurnsDtos: turnsDisponibiliDtos
            ));
        }

        private static Expression<Func<Turno, bool>> BuildPredicate(DateOnly fechaReserva, bool isWeekendOrHoliday)
        {
            var predicate = PredicateBuilder.New<Turno>(true);
            // Si no es fin de semana ni feriado, solo permitir turno "Noche"
            if (isWeekendOrHoliday == false)
            {
                predicate = predicate.And(t => t.NombreTurno == "Noche");
            }

            return predicate;
        }

        public static bool GetIsWeekend(DateOnly date)
        {
            return date.DayOfWeek switch
            {
                DayOfWeek.Saturday => true,
                DayOfWeek.Sunday => true,
                _ => false,
            };
        }
    }
}
