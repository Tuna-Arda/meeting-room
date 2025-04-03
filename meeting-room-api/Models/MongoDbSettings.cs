namespace meeting_room_api.Models
{
    public class MongoDbSettings
    {
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
        public string RoomsCollection { get; set; }
        public string ReservationsCollection { get; set; }
    }
}
