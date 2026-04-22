using Microsoft.AspNetCore.Mvc;
using Sum_Cubits_Application.Features.Turnos;

namespace Sum_Cubits_Api.Endpoints.Turnos
{
    public static class UpdateTurno
    {
        public record Request(int turnoId, string? nombreTurno, string? horaInicio, string? horaFin);
        public record Response();
        public static async Task<IResult> Handle([FromBody] Request request, [FromServices] QueryTurno queryTurno)
        {
            var entity = await queryTurno.Get(request.turnoId);
            if (entity == null)
            {
                return Results.NotFound();
            }
            entity.NombreTurno = request.nombreTurno;
            entity.HoraInicio = TimeSpan.Parse(request.horaInicio);
            entity.HoraFin = TimeSpan.Parse(request.horaFin);
            entity.FechaModificacion = DateTime.Now;
            await queryTurno.Update(entity);
            return Results.Ok(new Response());
        }
    }
}
