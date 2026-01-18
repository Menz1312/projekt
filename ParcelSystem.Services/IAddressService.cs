using System.Collections.Generic;
using ParcelSystem.Services.ViewModels;

namespace ParcelSystem.Services
{
    public interface IAddressService
    {
        IEnumerable<AddressViewModel> GetAll();
        AddressViewModel? GetById(int id);
        int Add(AddressViewModel viewModel);
        void Update(AddressViewModel viewModel);
        void Delete(int id);
    }
}