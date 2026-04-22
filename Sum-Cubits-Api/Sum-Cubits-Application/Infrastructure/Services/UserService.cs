
using LinqKit;
using Sum_Cubits_Application.Application.Exceptions;
using Sum_Cubits_Application.Features.Roles;
using Sum_Cubits_Application.Features.Usuarios;

namespace Sum_Cubits_Application.Infrastructure.Services
{
    public class UserService
    {
        private readonly QueryCacheService _queryCacheService;
        private readonly QueryUsuario _queryUser;
        private readonly QueryRol _queryRole;

        public UserService(QueryCacheService queryCacheService,QueryUsuario queryUsuarios, QueryRol queryRoles)
        {
            _queryCacheService = queryCacheService;
            _queryUser = queryUsuarios;
            _queryRole = queryRoles;
        }
        public async Task<int?> GetRoleId(string userEmail, string? userName)
        {
            var user = GetUserFromCache(userEmail);
            if (user != null) return user.RolId;

            user = await GetUserFromDatabase(userEmail);
            if (user != null)
            {
                AddUserToCache(user);
                return user.RolId;
            }

            // Usuario nuevo → crear con nombre y rol por defecto
            user = await CreateUser(userEmail, userName);
            AddUserToCache(user);
            return user.RolId;
        }

        public async Task<int> GetUserId(string userEmail)
        {
            var user = GetUserFromCache(userEmail);

            if (user != null)
                return user.UsuarioId;

            user = await GetUserFromDatabase(userEmail);

            if (user != null)
            {
                AddUserToCache(user);
                return user.UsuarioId;
            }

            return user.UsuarioId;
        }

        private Usuario? GetUserFromCache(string userEmail)
        {
            var cacheKey = GetUserKey(userEmail);
            return _queryCacheService.Get<Usuario?>(cacheKey);
        }

        private async Task<Usuario?> GetUserFromDatabase(string userEmail)
        {
            return await _queryUser.Get(userEmail);
        }

        private async Task<Usuario> CreateUser(string userEmail, string? userName)
        {
            var userRolIdPredicate = PredicateBuilder
                .New<Rol>()
                .And(r => r.NombreRol == "Usuario");

            var role = await _queryRole.GetDefault(userRolIdPredicate);

            var entity = new Usuario
            {
                Email = userEmail,
                FullName = userName,
                FechaRegistro = DateTime.Now,
                RolId = role.RolId,
                Activo = true
            };

            await _queryUser.Create(entity);

            entity.Role = null;

            return entity;
        }

        private void AddUserToCache(Usuario? user)
        {
            var cacheKey = GetUserKey(user?.Email);
            _queryCacheService.Set(cacheKey, user);
        }

        private static string GetUserKey(string userEmail) => $"USER_{userEmail}";

    }
}
