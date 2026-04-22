using Microsoft.EntityFrameworkCore;
using Sum_Cubits_Application.Infrastructure.Database;

namespace Sum_Cubits_Application.Features.EstadosReserva 
{
    public class QueryEstado
    {
        private readonly SqlServerDbContext _dbContext;

        public QueryEstado(
            SqlServerDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<int?> GetEstadoId(string? nombreEstado)
        {
            return await _dbContext
                .Set<Estado>()
                .Where(s => s.NombreEstado == nombreEstado)
                .Select(s => s.EstadoId)
                .FirstOrDefaultAsync();
        }

        public async Task<Estado?> GetEstado(string? nombreEstado)
        {
            return await _dbContext
             .Set<Estado>()
             .Where(s => s.NombreEstado == nombreEstado)
             .FirstOrDefaultAsync();
        }
    }
}
