using Microsoft.AspNetCore.Mvc;
using Sum_Cubits_Application.Features.Salones;

namespace Sum_Cubits_Api.Endpoints.Salones
{
    public static class CreateSalon
    {
        public record Request(string nombreSalon);
        public record Response();

        public static async Task<IResult> Handle([FromBody] Request request,[FromServices] QuerySalon querySalon)
        {
            var entity = new Salon
            {
                Nombre = request.nombreSalon,
                Activo = true
            };

            await querySalon.Create(entity);
            return Results.Created($"/salones", new Response());
        }
    }
}
