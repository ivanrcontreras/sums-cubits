using Microsoft.AspNetCore.Mvc;
using Sum_Cubits_Application.Features.EstadosReserva;
using Sum_Cubits_Application.Features.Reservas;
using Sum_Cubits_Application.Infrastructure.Services;
using System.Security.Claims;

namespace Sum_Cubits_Api.Endpoints.Reservas
{
    public static class DeleteReservation
    {
        public record Request(DateOnly fechaReserva);
        public record Response();

        public static async Task<IResult> Handle([FromBody]Request request,HttpContext httpContext, [FromServices] QueryReserva queryReserva, [FromServices] UserService userService, [FromServices]QueryEstado queryEstado)
        {
            var userEmail = httpContext.User.FindFirstValue("email")
                         ?? httpContext.User.FindFirstValue(ClaimTypes.Email);

            if (string.IsNullOrEmpty(userEmail))
                return Results.Unauthorized();

            var userId = await userService.GetUserId(userEmail);
            var idEstado = await queryEstado.GetEstadoId("Cancelada");

            var entity = new Reserva
            {
                UsuarioId = userId,
                FechaReserva = request.fechaReserva,
                EstadoId = idEstado,
                FechaSolicitud = DateTime.Now
            };

            await queryReserva.Cancel(entity);
            return Results.Ok(new Response());
        }
    }
}
