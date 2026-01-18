using Microsoft.EntityFrameworkCore;
using ParcelSystem.Model;

namespace ParcelSystem.DAL
{
    public class ParcelContext : DbContext
    {
        // Konstruktor przyjmujący opcje (np. ConnectionString)
        public ParcelContext(DbContextOptions<ParcelContext> options) : base(options)
        {
        }

        // Odzwierciedlenie naszych klas jako tabele w bazie danych
        public DbSet<Address> Addresses { get; set; }
        public DbSet<Parcel> Parcels { get; set; }

        // Opcjonalnie: Konfiguracja relacji (choć EF często domyśla się sam)
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Przykładowa konfiguracja: Jedna paczka ma jeden adres
            modelBuilder.Entity<Parcel>()
                .HasOne(p => p.Address)
                .WithMany() // Zakładamy, że pod jednym adresem może być wiele paczek (lub jedna, zależnie od logiki)
                .HasForeignKey(p => p.AddressId);
                
            base.OnModelCreating(modelBuilder);
        }
    }
}