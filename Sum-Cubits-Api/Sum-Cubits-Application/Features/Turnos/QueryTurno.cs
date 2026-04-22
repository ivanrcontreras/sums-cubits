
using Microsoft.EntityFrameworkCore;
using Sum_Cubits_Application.Infrastructure.Database;
using System.Linq.Expressions;

namespace Sum_Cubits_Application.Features.Turnos
{
    public class QueryTurno
    {
        private readonly SqlServerDbContext _dbContext;

        public QueryTurno(
            SqlServerDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        
        public async Task<Turno?> GetTurnoId(string? nombreTurno)
        {
            return await _dbContext
                .Set<Turno>()
                .Where(t => t.NombreTurno == nombreTurno)
                .FirstOrDefaultAsync();
        }

        public async Task<Turno?> Get(int idTurno)
        {
            return await _dbContext
                .Set<Turno>()
                .Where(t => t.TurnoId == idTurno)
                .FirstOrDefaultAsync();
        }

        public async Task<List<Turno>> GetList(Expression<Func<Turno, bool>> predicate)
        {
            return await _dbContext
                .Set<Turno>()
                .Where(predicate)
                .ToListAsync();
        }

        public async Task Create(Turno entity)
        {
            _dbContext.Add(entity);
            await _dbContext.SaveChangesAsync();
        }

        public async Task Recover(Turno entity)
        {
            _dbContext.Update(entity);
            await _dbContext.SaveChangesAsync();
        }
        public async Task Update(Turno entity)
        {
            _dbContext.Update(entity);
            await _dbContext.SaveChangesAsync();
        }
        public async Task Delete(Turno entity)
        {
            _dbContext.Update(entity);
            await _dbContext.SaveChangesAsync();
        }

       
    }
}
