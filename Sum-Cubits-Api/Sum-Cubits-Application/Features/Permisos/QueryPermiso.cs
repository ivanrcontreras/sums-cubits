
using Microsoft.EntityFrameworkCore;
using Sum_Cubits_Application.Features.Roles;
using Sum_Cubits_Application.Infrastructure.Database;
using System.Linq.Expressions;

namespace Sum_Cubits_Application.Features.Permisos
{
    public class QueryPermiso
    {
        private readonly SqlServerDbContext _dbContext;

        public QueryPermiso(
            SqlServerDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task<List<RolPermiso>> GetList(Expression<Func<RolPermiso,bool>> predicate)
        {
            return await _dbContext
                .Set<RolPermiso>()
                .Include(rp => rp.Role)
                .Include(rp => rp.Permission)
                .Where(predicate)
                .ToListAsync();
        }

        public async Task CreateBulk(IEnumerable<Permiso> entityList)
        {
            _dbContext.AddRange(entityList);
            await _dbContext.SaveChangesAsync();
        }

        public async Task DeleteBulk(IEnumerable<Permiso> entityList)
        {
            _dbContext.RemoveRange(entityList);
            await _dbContext.SaveChangesAsync();
        }
    }
}
