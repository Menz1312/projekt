using System.Collections.Generic;
using System.Linq;
using ParcelSystem.DAL;
using ParcelSystem.Model;
using ParcelSystem.Services.ViewModels;

namespace ParcelSystem.Services
{
    public class AddressService : IAddressService
    {
        private readonly ParcelContext _context;

        public AddressService(ParcelContext context)
        {
            _context = context;
        }

        public IEnumerable<AddressViewModel> GetAll()
        {
            // Pobieramy dane z bazy i mapujemy na ViewModel
            return _context.Addresses.Select(a => new AddressViewModel
            {
                Id = a.Id,
                City = a.City,
                ZipCode = a.ZipCode,
                Street = a.Street,
                BuildingNumber = a.BuildingNumber,
                ApartmentNumber = a.ApartmentNumber,
                Country = a.Country
            }).ToList();
        }

        public AddressViewModel? GetById(int id)
        {
            var address = _context.Addresses.Find(id);
            if (address == null) return null;

            return new AddressViewModel
            {
                Id = address.Id,
                City = address.City,
                ZipCode = address.ZipCode,
                Street = address.Street,
                BuildingNumber = address.BuildingNumber,
                ApartmentNumber = address.ApartmentNumber,
                Country = address.Country
            };
        }

        public int Add(AddressViewModel viewModel)
        {
            var entity = new Address
            {
                City = viewModel.City,
                ZipCode = viewModel.ZipCode,
                Street = viewModel.Street,
                BuildingNumber = viewModel.BuildingNumber,
                ApartmentNumber = viewModel.ApartmentNumber,
                Country = viewModel.Country
            };

            _context.Addresses.Add(entity);
            _context.SaveChanges();
            return entity.Id;
        }

        public void Update(AddressViewModel viewModel)
        {
            var entity = _context.Addresses.Find(viewModel.Id);
            if (entity != null)
            {
                entity.City = viewModel.City;
                entity.ZipCode = viewModel.ZipCode;
                entity.Street = viewModel.Street;
                entity.BuildingNumber = viewModel.BuildingNumber;
                entity.ApartmentNumber = viewModel.ApartmentNumber;
                entity.Country = viewModel.Country;
                
                _context.SaveChanges();
            }
        }

        public void Delete(int id)
        {
            var entity = _context.Addresses.Find(id);
            if (entity != null)
            {
                _context.Addresses.Remove(entity);
                _context.SaveChanges();
            }
        }
    }
}