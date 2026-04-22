using Microsoft.AspNetCore.Mvc;
using Sum_Cubits_Application.Features.Turnos;

namespace Sum_Cubits_Api.Endpoints.Turnos
{
    public static class CreateTurno
    {
        public record Request(string nombreTurno, TimeSpan horaInicio, TimeSpan horaFin);
        public record Response();

        public static async Task<IResult> Handle([FromBody] Request request, [FromServices] QueryTurno queryTurno)
        {
            var entity = new Turno
            {
                NombreTurno = request.nombreTurno,
                HoraInicio = request.horaInicio,
                HoraFin = request.horaFin,
                Activo = true,
                FechaCreacion = DateTime.Now
            };
            await queryTurno.Create(entity);
            return Results.Created($"/turnos", new Response());
        }
    }
}
