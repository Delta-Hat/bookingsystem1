namespace webapibackend.Models
{
    /*
     * This DTO is intended to solve the 415 error being returned by the API when sending a number.
     * This also makes it so we don't have to worry about imprecise floats.
     * The API will instead convert the
     */
    public class ServiceDTO
    {
        public long Id { get; set; }
        public string? Name { get; set; }
        public string? Price { get; set; } //String representing price. Gets converted to decimal.
    }
}
