using LinqKit;
using Microsoft.AspNetCore.Mvc;
using Sum_Cubits_Application.Features.Turnos;
using System.Linq.Expressions;

namespace Sum_Cubits_Api.Endpoints.Turnos
{
    public static class GetTurnsList
    {
        public record Request(bool? activo);
        public record Response(List<TurnoDto> TurnoDto);

        public static async Task<IResult> Handle([FromBody]Request request, [FromServices]QueryTurno queryTurno)
        {
            var turnoListPredicate = BuildPredicate(request.activo);
            var turnosList = await queryTurno.GetList(turnoListPredicate);
            var turnosDto = turnosList
                .Select(t => new TurnoDto
                {
                    TurnoId = t.TurnoId,
                    NombreTurno = t.NombreTurno,
                    HoraInicio = Convert.ToString(t.HoraInicio),
                    HoraFin = Convert.ToString(t.HoraFin),
                    Activo = t.Activo
                })
                .ToList();
            return Results.Ok(new Response(turnosDto));
        }
        private static Expression<Func<Turno, bool>> BuildPredicate(bool? activo)
        {
            var predicate = PredicateBuilder.New<Turno>(true);

            if (activo.Value == true)
            {
                predicate = predicate.And(t => t.Activo == true);
            }
            //.And(s => s.Activo == true);
            return predicate;
        }
    }
}
