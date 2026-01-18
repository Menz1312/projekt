using System.Collections.Generic;
using ParcelSystem.Services.ViewModels;

namespace ParcelSystem.Services
{
    public interface IParcelService
    {
        IEnumerable<ParcelViewModel> GetAll();
        ParcelViewModel? GetById(int id);
        int Add(ParcelViewModel viewModel);
        void Update(ParcelViewModel viewModel);
        void Delete(int id);
    }
}