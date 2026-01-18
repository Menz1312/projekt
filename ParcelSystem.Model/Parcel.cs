using System;

namespace ParcelSystem.Model
{
    public class Parcel
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string SenderName { get; set; } = string.Empty;
        public string ReceiverName { get; set; } = string.Empty;
        public string Status { get; set; } = "Created"; // Domyślny status
        public DateTime CreatedAt { get; set; } = DateTime.Now;

        // Klucz obcy
        public int AddressId { get; set; }
        
        // Właściwość nawigacyjna (Relacja)
        public virtual Address? Address { get; set; }
    }
}