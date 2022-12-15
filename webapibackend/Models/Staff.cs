namespace webapibackend.Models
{
    public class Staff  
    {
        /*
         * We could, in theory, have a "Person" abstract class where Staff and Guest are sub-classes,
         * but we're gonna keep it simple this time.
         */

        public long Id { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? JobTitle { get; set; }
    }
}
