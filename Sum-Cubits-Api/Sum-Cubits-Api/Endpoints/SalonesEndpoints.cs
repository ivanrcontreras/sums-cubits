using Sum_Cubits_Api.Endpoints.Salones;

namespace Sum_Cubits_Api.Endpoints
{
    public static class SalonesEndpoints
    {
        public static IEndpointRouteBuilder MapSalonesEndpoints(this IEndpointRouteBuilder app)
        {
            var group = app.MapGroup("/salones")
               .WithTags("Salones")
               .WithOpenApi()
               .RequireAuthorization("Default");

            //GetListSalon
            group.MapPost("/activos", GetSalonList.Handle)
                .WithName("GetSalonList")
                .RequireAuthorization("Default")
                .Produces<GetSalonList.Response>(StatusCodes.Status200OK);

            //CreateSalon
            group.MapPost("", CreateSalon.Handle)
                .WithName("CreateSalon")
                .RequireAuthorization("Default")
                .Produces<CreateSalon.Response>(StatusCodes.Status201Created);

            //UpdateSalon
            group.MapPut("", UpdateSalon.Handle)
                .WithName("UpdateSalon")
                .RequireAuthorization("Default")
                .Produces<UpdateSalon.Response>(StatusCodes.Status200OK);

            //DeleteSalon
            group.MapDelete("/{salonId:int}", DeleteSalon.Handle)
                .WithName("DeleteSalon")
                .RequireAuthorization("Default")
                .Produces<DeleteSalon.Response>(StatusCodes.Status200OK);

            //RecoverSalon
            group.MapPut("/recover", RecoverSalon.Handle)
                .WithName("RecoverSalon")
                .RequireAuthorization("Default")
                .Produces<RecoverSalon.Response>(StatusCodes.Status200OK);

            return app;
        }
    }
}
