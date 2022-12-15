namespace webapibackend.Models
{
    public class Guest
    {
        public long Id { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? PhoneNumber { get; set; }//phone numbers can have hyphens in them, so string.
        public string? Email { get; set; }

    }
}
