using Microsoft.AspNetCore.Mvc;
using meeting_room_api.Models;
using meeting_room_api.Services;
using System.Threading.Tasks;

namespace meeting_room_api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReservationsController : ControllerBase
    {
        private readonly ReservationService _reservationService;

        public ReservationsController(ReservationService reservationService)
        {
            _reservationService = reservationService;
        }

        [HttpGet]
        public async Task<IActionResult> GetReservations()
        {
            var reservations = await _reservationService.GetAllReservationsAsync();
            return Ok(reservations);
        }

        [HttpPost]
        public async Task<IActionResult> CreateReservation([FromBody] Reservation reservation)
        {
            await _reservationService.AddReservationAsync(reservation);
            return CreatedAtAction(nameof(GetReservations), reservation);
        }

        // Weitere Endpunkte (PUT, DELETE) können hier ergänzt werden.
    }
}
