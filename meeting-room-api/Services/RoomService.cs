using meeting_room_api.Models;
using MongoDB.Driver;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace meeting_room_api.Services
{
    public class RoomService
    {
        private readonly IMongoCollection<Room> _roomsCollection;

        public RoomService(IConfiguration config, IMongoClient mongoClient)
        {
            var dbName = config["MongoDB:DatabaseName"];
            var roomsCollectionName = config["MongoDB:RoomsCollection"];
            var database = mongoClient.GetDatabase(dbName);
            _roomsCollection = database.GetCollection<Room>(roomsCollectionName);
        }

        public async Task<List<Room>> GetAllRoomsAsync() =>
            await _roomsCollection.Find(_ => true).ToListAsync();

        public async Task<Room> GetRoomByIdAsync(string id) =>
            await _roomsCollection.Find(r => r.Id == id).FirstOrDefaultAsync();

        public async Task AddRoomAsync(Room room)
        {
            await _roomsCollection.InsertOneAsync(room);
        }

        public async Task UpdateRoomAsync(string id, Room updatedRoom) =>
            await _roomsCollection.ReplaceOneAsync(r => r.Id == id, updatedRoom);

        public async Task DeleteRoomAsync(string id) =>
            await _roomsCollection.DeleteOneAsync(r => r.Id == id);
    }
}
