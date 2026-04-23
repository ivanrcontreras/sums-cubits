using Microsoft.AspNetCore.Mvc;
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
            [FromServices] UserService userService)
        {
            var userEmail = httpContext.User.FindFirstValue("email")
                         ?? httpContext.User.FindFirstValue(ClaimTypes.Email);

            if (string.IsNullOrEmpty(userEmail))
                return Results.Unauthorized();

            var roleId = await userService.GetRoleId(userEmail, httpContext.User.FindFirstValue("name"));

            if (!roleId.HasValue)
                return Results.NotFound("Rol no encontrado para el usuario.");

            return Results.Ok(new Response(roleId.Value));
        }
    }
}