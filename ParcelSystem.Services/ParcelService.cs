using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore; // Ważne dla .Include()
using ParcelSystem.DAL;
using ParcelSystem.Model;
using ParcelSystem.Services.ViewModels;

namespace ParcelSystem.Services
{
    public class ParcelService : IParcelService
    {
        private readonly ParcelContext _context;

        public ParcelService(ParcelContext context)
        {
            _context = context;
        }

        public IEnumerable<ParcelViewModel> GetAll()
        {
            return _context.Parcels
                .Include(p => p.Address) // Pobieramy też dane adresu (Eager Loading)
                .Select(p => new ParcelViewModel
                {
                    Id = p.Id,
                    Title = p.Title,
                    SenderName = p.SenderName,
                    ReceiverName = p.ReceiverName,
                    Status = p.Status,
                    CreatedAt = p.CreatedAt,
                    AddressId = p.AddressId,
                    // Łączymy dane adresu w jeden string dla wygody widoku listy
                    DeliveryAddressInfo = p.Address != null 
                        ? $"{p.Address.City}, {p.Address.Street} {p.Address.BuildingNumber}" 
                        : "Brak adresu"
                }).ToList();
        }

        public ParcelViewModel? GetById(int id)
        {
            var p = _context.Parcels.Include(x => x.Address).FirstOrDefault(x => x.Id == id);
            if (p == null) return null;

            return new ParcelViewModel
            {
                Id = p.Id,
                Title = p.Title,
                SenderName = p.SenderName,
                ReceiverName = p.ReceiverName,
                Status = p.Status,
                CreatedAt = p.CreatedAt,
                AddressId = p.AddressId,
                DeliveryAddressInfo = p.Address != null 
                        ? $"{p.Address.City}, {p.Address.Street} {p.Address.BuildingNumber}" 
                        : ""
            };
        }

        public int Add(ParcelViewModel viewModel)
        {
            var entity = new Parcel
            {
                Title = viewModel.Title,
                SenderName = viewModel.SenderName,
                ReceiverName = viewModel.ReceiverName,
                Status = viewModel.Status,
                CreatedAt = DateTime.Now, // Ustawiamy datę serwera
                AddressId = viewModel.AddressId
            };

            _context.Parcels.Add(entity);
            _context.SaveChanges();
            return entity.Id;
        }

        public void Update(ParcelViewModel viewModel)
        {
            var entity = _context.Parcels.Find(viewModel.Id);
            if (entity != null)
            {
                entity.Title = viewModel.Title;
                entity.SenderName = viewModel.SenderName;
                entity.ReceiverName = viewModel.ReceiverName;
                entity.Status = viewModel.Status;
                // CreatedAt zazwyczaj nie zmieniamy przy edycji
                entity.AddressId = viewModel.AddressId;

                _context.SaveChanges();
            }
        }

        public void Delete(int id)
        {
            var entity = _context.Parcels.Find(id);
            if (entity != null)
            {
                _context.Parcels.Remove(entity);
                _context.SaveChanges();
            }
        }
    }
}