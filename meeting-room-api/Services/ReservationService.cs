using meeting_room_api.Models;
using MongoDB.Driver;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace meeting_room_api.Services
{
    public class ReservationService
    {
        private readonly IMongoCollection<Reservation> _reservationsCollection;

        public ReservationService(IConfiguration config, IMongoClient mongoClient)
        {
            var dbName = config["MongoDB:DatabaseName"];
            var reservationsCollectionName = config["MongoDB:ReservationsCollection"];
            var database = mongoClient.GetDatabase(dbName);
            _reservationsCollection = database.GetCollection<Reservation>(reservationsCollectionName);
        }

        public async Task<List<Reservation>> GetAllReservationsAsync() =>
            await _reservationsCollection.Find(_ => true).ToListAsync();

        public async Task<Reservation> GetReservationByIdAsync(string id) =>
            await _reservationsCollection.Find(r => r.Id == id).FirstOrDefaultAsync();

        public async Task AddReservationAsync(Reservation reservation)
        {
            await _reservationsCollection.InsertOneAsync(reservation);
        }

        public async Task UpdateReservationAsync(string id, Reservation updatedReservation) =>
            await _reservationsCollection.ReplaceOneAsync(r => r.Id == id, updatedReservation);

        public async Task DeleteReservationAsync(string id) =>
            await _reservationsCollection.DeleteOneAsync(r => r.Id == id);
    }
}
