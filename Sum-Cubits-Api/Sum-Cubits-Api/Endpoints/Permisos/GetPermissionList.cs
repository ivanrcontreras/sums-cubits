using LinqKit;
using Microsoft.AspNetCore.Mvc;
using Sum_Cubits_Application.Features.Permisos;
using Sum_Cubits_Application.Features.Roles;
using System.Linq.Expressions;

namespace Sum_Cubits_Api.Endpoints.Permisos
{
    public static class GetPermissionList
    {
        public record Response(List<PermisoDto>? PermissionDtos);

        public static async Task<IResult> Handle(int roleId, [FromServices]QueryPermiso queryPermission, [FromServices]QueryRol queryRole)
        {
            var role = await queryRole.Get(roleId);
            var permissionListPredicate = BuildFilter(roleId);

            var permissionList = await queryPermission.GetList(permissionListPredicate);
            var permissionDtoList = permissionList
                .Select(permission => new PermisoDto
                {
                    Id = permission.PermisoId,
                    Accion = permission.Permission.Accion,
                    Controlador = permission.Permission.Controlador
                })
                .ToList();
            return Results.Ok(new Response(permissionDtoList));
        }

        private static Expression<Func<RolPermiso, bool>> BuildFilter(int? roleId)
        {
            var predicate = PredicateBuilder.New<RolPermiso>(true);
            if (roleId.HasValue)
            {
                predicate = predicate.And(p => p.RolId == roleId.Value);
            }
            return predicate;
        }
    }
}
