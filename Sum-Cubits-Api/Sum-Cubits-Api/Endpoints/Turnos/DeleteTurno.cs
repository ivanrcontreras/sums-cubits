using Microsoft.AspNetCore.Mvc;
using Sum_Cubits_Application.Features.Turnos;

namespace Sum_Cubits_Api.Endpoints.Turnos
{
    public static class DeleteTurno
    {
        public record Response();

        public static async Task<IResult> Handle([FromRoute]int turnoId, [FromServices]QueryTurno queryTurno)
        {
            var entity = await queryTurno.Get(turnoId);
            if (entity == null)
            {
                return Results.NotFound();

            }
            entity.Activo = false;
            entity.FechaModificacion = DateTime.Now;
            await queryTurno.Delete(entity);
            return Results.Ok(new Response());
        }
    }
}
