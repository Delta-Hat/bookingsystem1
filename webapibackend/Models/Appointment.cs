namespace webapibackend.Models
{
    public class Appointment
    {
        public long Id { get; set; }
        public long GuestId { get; set; }
        public long StaffId { get; set; }
        public long ServiceId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }
}
