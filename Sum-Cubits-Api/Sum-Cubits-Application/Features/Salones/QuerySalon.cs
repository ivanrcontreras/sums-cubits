
using Microsoft.EntityFrameworkCore;
using Sum_Cubits_Application.Infrastructure.Database;
using System.Linq.Expressions;

namespace Sum_Cubits_Application.Features.Salones
{
    public class QuerySalon
    {
        private readonly SqlServerDbContext _dbContext;

        public QuerySalon(
            SqlServerDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Salon?>Get(int idSalon)
        {
            return await _dbContext
                .Set<Salon>()
                .Where(s => s.SalonId == idSalon)
                .FirstOrDefaultAsync();
        }

        public async Task<Salon?>GetSalonId(string? nombreSalon)
        {
            return await _dbContext
                .Set<Salon>()
                .Where(s => s.Nombre == nombreSalon)
                .FirstOrDefaultAsync();
        }

        public async Task<List<Salon>> GetList(Expression<Func<Salon, bool>> predicate)
        {
            return await _dbContext
                .Set<Salon>()
                .Where(predicate)
                .ToListAsync();
        }

        public async Task Create(Salon entity)
        {
            _dbContext.Add(entity);
            await _dbContext.SaveChangesAsync();
        }

        public async Task Update(Salon entity)
        {
            _dbContext.Update(entity);
            await _dbContext.SaveChangesAsync();
        }

        public async Task Delete(Salon entity)
        {
            _dbContext.Update(entity);
            await _dbContext.SaveChangesAsync();
        }

        public async Task Recover(Salon entity)
        {
            _dbContext.Update(entity);
            await _dbContext.SaveChangesAsync();
        }
    }
}
