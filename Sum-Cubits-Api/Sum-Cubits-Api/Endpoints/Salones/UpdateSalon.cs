using Microsoft.AspNetCore.Mvc;
using Sum_Cubits_Application.Features.Salones;

namespace Sum_Cubits_Api.Endpoints.Salones
{
    public static class UpdateSalon
    {
        public record Request (int salonId, string nombreSalon);
        public record Response();

        public static async Task<IResult> Handle([FromBody] Request request, QuerySalon querySalon)
        {
            var salonUpdate = await querySalon.Get(request.salonId);
            if (salonUpdate == null)
            {
                Results.NotFound("Salon no encontrado");
            }


            salonUpdate.Nombre = request.nombreSalon;

            await querySalon.Update(salonUpdate);

            return Results.Ok(new Response());
        }
    }
}
