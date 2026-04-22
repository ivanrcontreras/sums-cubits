using Sum_Cubits_Api.Endpoints.Turnos;

namespace Sum_Cubits_Api.Endpoints
{
    public static class TurnoEndpoints
    {

        public static IEndpointRouteBuilder MapTurnoEndpoints(this IEndpointRouteBuilder app)
        {
            var group = app.MapGroup("/turnos")
               .WithTags("Turnos")
               .WithOpenApi()
               .RequireAuthorization("Default");

            //GetListTurno
            group.MapPost("/activos", GetTurnsList.Handle)
                .WithName("GetTurnoList")
                .RequireAuthorization("Default")
                .Produces<GetTurnsList.Response>(StatusCodes.Status200OK);

            //CreateTurno
            group.MapPost("", CreateTurno.Handle)
                .WithName("CreateTurno")
                .RequireAuthorization("Default")
                .Produces<CreateTurno.Response>(StatusCodes.Status201Created);
            //UpdateTurno
            group.MapPut("", UpdateTurno.Handle)
                .WithName("UpdateTurno")
                .RequireAuthorization("Default")
                .Produces<UpdateTurno.Response>(StatusCodes.Status200OK);
            //DeleteTurno
            group.MapDelete("/{turnoId:int}", DeleteTurno.Handle)
                .WithName("DeleteTurno")
                .RequireAuthorization("Default")
                .Produces<DeleteTurno.Response>(StatusCodes.Status200OK);
            //RecoverTurno
            group.MapPut("/recover", RecoverTurno.Handle)
                .WithName("RecoverTurno")
                .RequireAuthorization("Default")
                .Produces<RecoverTurno.Response>(StatusCodes.Status200OK);
            return app;
        }
    }
}
