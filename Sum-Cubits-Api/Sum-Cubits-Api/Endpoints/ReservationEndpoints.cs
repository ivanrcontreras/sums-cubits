using Sum_Cubits_Api.Endpoints.Reservas;

namespace Sum_Cubits_Api.Endpoints
{
    public static class ReservationEndpoints
    {
        public static IEndpointRouteBuilder MapReservationEndpoints(this IEndpointRouteBuilder app)
        {
            var group = app.MapGroup("/reservations")
                .WithTags("Reservations")
                .WithOpenApi()
                .RequireAuthorization("Default");


            //GetMyReservationList
            group.MapGet("/myreservations", GetMyReservationList.Handle)
                .WithName("GetMyReservationList")
                .RequireAuthorization("Default")
                .Produces<GetMyReservationList.Response>(StatusCodes.Status200OK)
                .Produces(StatusCodes.Status404NotFound);

            //GetReservationList
            group.MapGet("", GetReservationsList.Handle)
                .WithName("GetReservationsList")
                .RequireAuthorization("Default")
                .Produces<GetReservationsList.Response>(StatusCodes.Status200OK)
                .Produces(StatusCodes.Status404NotFound);

            //GetAvailableTurnos
            group.MapPost("available-turns", GetAvailableTurnos.Handle)
                .WithName("GetAvailableTurnos")
                .RequireAuthorization("Default")
                .Produces<GetAvailableTurnos.Response>(StatusCodes.Status200OK)
                .Produces(StatusCodes.Status404NotFound);

            //Create Reservation
            group.MapPost("",CreateReservation.Handle)
                .WithName("CreateReservation")
                .RequireAuthorization("Default")
                .Produces<CreateReservation.Response>(StatusCodes.Status201Created);

            //Delete Reservation
            group.MapDelete("", DeleteReservation.Handle)
                .WithName("DeleteReservation")
                .RequireAuthorization("Default")
                .Produces(StatusCodes.Status204NoContent)
                .Produces(StatusCodes.Status404NotFound);

            return app;
        }
    }
}
