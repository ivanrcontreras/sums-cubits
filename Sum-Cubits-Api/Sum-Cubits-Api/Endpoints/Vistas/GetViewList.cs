
using Microsoft.AspNetCore.Mvc;
using Sum_Cubits_Application.Features.Roles;
using Sum_Cubits_Application.Features.Vistas;

namespace Sum_Cubits_Api.Endpoints.Vistas
{
    public static class GetViewList
    {
        public record Response(List<VistaDto>? VistaDtos);

        public static async Task<IResult> Handle(int roleId, [FromServices]QueryVista queryView,[FromServices]QueryRol queryRole)
        {
                var roleViewList = await queryRole.GetRoleViewList(roleId);
                var roleViewListDto = roleViewList
                    .Select(rv => new VistaDto
                    {
                        Id = rv.VistaId,
                        NombreVista = rv.View.NombreVista,
                        Icono = rv.View.Icono,
                        Ruta = rv.View.Ruta
                    })
                    .ToList();
            return Results.Ok(new Response(roleViewListDto));
        }
    }
}