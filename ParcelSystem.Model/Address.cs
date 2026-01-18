namespace ParcelSystem.Model
{
    public class Address
    {
        public int Id { get; set; }
        public string City { get; set; } = string.Empty;
        public string ZipCode { get; set; } = string.Empty;
        public string Street { get; set; } = string.Empty;
        public string BuildingNumber { get; set; } = string.Empty;
        public string? ApartmentNumber { get; set; } // Opcjonalne (nullable)
        public string Country { get; set; } = string.Empty;
    }
}