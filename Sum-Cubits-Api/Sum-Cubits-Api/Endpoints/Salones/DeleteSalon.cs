using Microsoft.AspNetCore.Mvc;
using Sum_Cubits_Application.Features.Salones;

namespace Sum_Cubits_Api.Endpoints.Salones
{
    public static class DeleteSalon
    {
        public record Response ();
        public static async Task<IResult> Handle([FromRoute]int salonId, [FromServices]QuerySalon querySalon)
        {
            var entity = await querySalon.Get(salonId);

            if (entity == null)
            {
                return Results.NotFound(new { message = "Salon No encontrado" });
            }

            entity.Activo = false;

            await querySalon.Delete(entity);
            return Results.Ok(new Response());

        }

    }
}
