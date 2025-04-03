using Microsoft.AspNetCore.Mvc;
using meeting_room_api.Models;
using meeting_room_api.Services;
using System.Threading.Tasks;

namespace meeting_room_api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RoomsController : ControllerBase
    {
        private readonly RoomService _roomService;

        public RoomsController(RoomService roomService)
        {
            _roomService = roomService;
        }

        [HttpGet]
        public async Task<IActionResult> GetRooms()
        {
            var rooms = await _roomService.GetAllRoomsAsync();
            return Ok(rooms);
        }

        [HttpPost]
        public async Task<IActionResult> CreateRoom([FromBody] Room room)
        {
            await _roomService.AddRoomAsync(room);
            return CreatedAtAction(nameof(GetRooms), room);
        }

        // Weitere Endpunkte (PUT, DELETE) können hier ergänzt werden.
    }
}
