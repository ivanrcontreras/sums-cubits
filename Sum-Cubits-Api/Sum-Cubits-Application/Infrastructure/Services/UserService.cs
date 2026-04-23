
using LinqKit;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query.SqlExpressions;
using Npgsql;
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

        private static readonly Dictionary<string, SemaphoreSlim> _userLocks = new();
        private static readonly object _lockDictLock = new();
        public UserService(QueryCacheService queryCacheService,QueryUsuario queryUsuarios, QueryRol queryRoles)
        {
            _queryCacheService = queryCacheService;
            _queryUser = queryUsuarios;
            _queryRole = queryRoles;
        }

        private SemaphoreSlim GetUserLock(string userEmail)
        {
            lock (_lockDictLock)
            {
                if (!_userLocks.ContainsKey(userEmail))
                {
                    _userLocks[userEmail] = new SemaphoreSlim(1, 1);
                }
                return _userLocks[userEmail];
            }
        }
        public async Task<int?> GetRoleId(string userEmail, string? userName)
        {

            var user = GetUserFromCache(userEmail);
            if (user != null) return user.RolId;

            var semaphore = GetUserLock(userEmail);
            await semaphore.WaitAsync();
            try
            {
                user = GetUserFromCache(userEmail);
                if (user != null) return user.RolId;

                user = await GetUserFromDatabase(userEmail);

                if (user != null)
                {
                    AddUserToCache(user);
                    return user.RolId;
                }
                user = await CreateUser(userEmail, userName);
                AddUserToCache(user);
                return user.RolId;

            }
            finally
            {
                semaphore.Release();
            }
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

            return 0;
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
