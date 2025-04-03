using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;

namespace meeting_room_api.Models
{
    public class Reservation
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string RoomId { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public string ReservedBy { get; set; }
        public string Purpose { get; set; }
    }
}
