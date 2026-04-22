using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Controllers;
using Sum_Cubits_Application.Features.Usuarios;
using Sum_Cubits_Application.Infrastructure;
using Sum_Cubits_Application.Infrastructure.Services;
using System.Security.Claims;

namespace Sum_Cubits_Api.Authorization
{
    public class AuthorizationHandler : IAuthorizationHandler
    {
        private readonly UserService userService;
        private readonly PermissionService permissionService;
        private readonly QueryUsuario queryUser;

        public AuthorizationHandler(UserService _userService, PermissionService _permissionService, QueryUsuario _queryUsuario, ILogger<AuthorizationHandler> logger)
        {
            userService = _userService;
            permissionService = _permissionService;
            queryUser = _queryUsuario;
        }
        public async Task HandleAsync(AuthorizationHandlerContext context)
        {
           foreach(var requirement in context.Requirements)
               if (IsAuthenticated(context) && await HavePermission(context))
                    context.Succeed(requirement);
           
        }

        private async Task<bool>HavePermission(AuthorizationHandlerContext context)
        {
            var roleId = await GetUserRoleId(context);
            var action = GetRequestAction(context);
            var controller = GetRequestController(context);

            return await permissionService.CheckPermission(roleId, action, controller);
        }

        private static bool IsAuthenticated(AuthorizationHandlerContext context)
        {
            return context.User.Identity!.IsAuthenticated;
        }

        private static string GetRequestAction(AuthorizationHandlerContext context)
        {
            if (context.Resource is HttpContext httpContext)
            {
                var endpoint = httpContext.GetEndpoint();
                var actionName = endpoint?.Metadata.GetMetadata<EndpointNameMetadata>()?.EndpointName;
                if (endpoint?.Metadata.GetMetadata<ControllerActionDescriptor>() is ControllerActionDescriptor descriptor)
                {
                    return descriptor.ActionName;
                }

                return actionName ?? httpContext.Request.RouteValues["action"]?.ToString() ?? httpContext.Request.Path.ToString();
            }

            if (context.Resource is ActionContext actionContext)
            {
                return ((ControllerActionDescriptor)actionContext.ActionDescriptor).ActionName;
            }
            throw new InvalidOperationException("No se pudo determinar la acción desde el contexto de autorización");
        }

        private static string GetRequestController(AuthorizationHandlerContext context)
        {
            if (context.Resource is HttpContext httpContext)
            {
                var endpoint = httpContext.GetEndpoint();
                if (endpoint?.Metadata.GetMetadata<ControllerActionDescriptor>() is ControllerActionDescriptor descriptor)
                {
                    return descriptor.ControllerName;
                }

                var path = httpContext.Request.Path.ToString().Trim('/');
                var segments = path.Split('/');

                if (segments.Length > 0 && !string.IsNullOrEmpty(segments[0]))
                {
                    return char.ToUpper(segments[0][0]) + segments[0].Substring(1).ToLower();
                }

                return httpContext.Request.RouteValues["controller"]?.ToString() ?? "Api";
            }

            // Fallback para MVC tradicional (ActionContext)
            if (context.Resource is ActionContext actionContext)
            {
                return ((ControllerActionDescriptor)actionContext.ActionDescriptor).ControllerName;
            }

            throw new InvalidOperationException("No se pudo determinar el controlador desde el contexto de autorización.");
        }

        private async Task<int> GetUserRoleId(AuthorizationHandlerContext context)
        {
            var userEmail = context.User.FindFirstValue("email")
                         ?? context.User.FindFirstValue(ClaimTypes.Email);
            var userName = context.User.FindFirstValue("name");

            if (string.IsNullOrEmpty(userEmail))
                throw new Exception("Email no encontrado en el token.");

            return await userService.GetRoleId(userEmail,userName)
                ?? throw new Exception("Rol no encontrado para el usuario.");
        }


    }
}
