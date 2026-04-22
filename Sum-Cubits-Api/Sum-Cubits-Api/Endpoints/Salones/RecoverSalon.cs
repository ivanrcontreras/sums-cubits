using Microsoft.AspNetCore.Mvc;
using Sum_Cubits_Application.Features.Salones;

namespace Sum_Cubits_Api.Endpoints.Salones
{
    public static class RecoverSalon
    {
        public record Request(int salonId);
        public record Response();

        public static async Task<IResult> Handle([FromBody] Request request,QuerySalon querySalon)
        {
            var entity = await querySalon.Get(request.salonId);

            if (entity == null)
            {
                return Results.NotFound(new { message = "Salon No encontrado" });
            }

            entity.Activo = true;

            await querySalon.Recover(entity);
            return Results.Ok(new Response());
        }
    }
}
