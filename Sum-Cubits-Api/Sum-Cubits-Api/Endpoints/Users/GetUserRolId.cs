using Microsoft.AspNetCore.Mvc;
using Sum_Cubits_Application.Features.Roles;
using Sum_Cubits_Application.Features.Usuarios;
using Sum_Cubits_Application.Infrastructure.Services;
using System.Security.Claims;

namespace Sum_Cubits_Api.Endpoints.Users
{
    public class GetUserRolId
    {
        public record Response(int RoleId);
        public static async Task<IResult> Handle(
            HttpContext httpContext,
            [FromServices] UserService userService,
            [FromServices] QueryUsuario queryUsuario)
        {
            var userEmail = httpContext.User.FindFirstValue("email")
                         ?? httpContext.User.FindFirstValue(ClaimTypes.Email);

            if (string.IsNullOrEmpty(userEmail))
                return Results.Unauthorized();

            var userId = await userService.GetUserId(userEmail);

            if (userId == null)
            {
                return Results.NotFound("Usuario no encontrado");
            }

            var roleId = await queryUsuario.GetRolId(userId);


            if (roleId == 0)
                return Results.NotFound("Rol no encontrado para el usuario.");

            return Results.Ok(new Response(roleId));
        }
    }
}