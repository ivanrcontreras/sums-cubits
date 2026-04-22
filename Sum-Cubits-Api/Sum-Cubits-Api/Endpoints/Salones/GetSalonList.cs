using LinqKit;
using Microsoft.AspNetCore.Mvc;
using Sum_Cubits_Application.Features.Salones;
using System.Linq.Expressions;

namespace Sum_Cubits_Api.Endpoints.Salones
{
    public static class GetSalonList
    {
        public record Request(bool? activo);
        public record Response(List<SalonDto>SalonDtos);

        public static async Task<IResult> Handle([FromBody] Request request,[FromServices]QuerySalon querySalon)
        {
            var salonPredicateList = BuildPredicate(request.activo);
            var salonList = await querySalon.GetList(salonPredicateList);
            var salonesDtos = salonList
                .Select(s => new SalonDto
                {
                    SalonId = s.SalonId,
                    NombreSalon = s.Nombre,
                    Activo = s.Activo
                })
                .ToList();
            return Results.Ok(new Response(salonesDtos));
        }

        private static Expression<Func<Salon, bool>> BuildPredicate(bool? activo)
        {
            var predicate = PredicateBuilder.New<Salon>(true);

            if (activo.Value == true)
            {
                predicate = predicate.And(s => s.Activo == true);
            }
            //.And(s => s.Activo == true);
            return predicate;
        }
    }
}
