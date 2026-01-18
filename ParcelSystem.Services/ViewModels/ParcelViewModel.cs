using System;

namespace ParcelSystem.Services.ViewModels
{
    public class ParcelViewModel
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string SenderName { get; set; } = string.Empty;
        public string ReceiverName { get; set; } = string.Empty;
        public string Status { get; set; } = "Created";
        public DateTime CreatedAt { get; set; }

        public int AddressId { get; set; }
        // Opcjonalnie: możemy tu dodać nazwę miasta/ulicy, żeby łatwiej wyświetlić to na liście
        public string? DeliveryAddressInfo { get; set; } 
    }
}