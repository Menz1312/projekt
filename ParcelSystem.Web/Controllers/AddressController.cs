using Microsoft.AspNetCore.Mvc;
using ParcelSystem.Services;
using ParcelSystem.Services.ViewModels;

namespace ParcelSystem.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AddressController : ControllerBase
    {
        private readonly IAddressService _addressService;

        public AddressController(IAddressService addressService)
        {
            _addressService = addressService;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var result = _addressService.GetAll();
            return Ok(result);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var result = _addressService.GetById(id);
            if (result == null) return NotFound();
            
            return Ok(result);
        }

        [HttpPost]
        public IActionResult Add([FromBody] AddressViewModel model)
        {
            var id = _addressService.Add(model);
            return CreatedAtAction(nameof(GetById), new { id = id }, model);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] AddressViewModel model)
        {
            model.Id = id; // Upewniamy się, że ID w modelu jest zgodne z URL
            _addressService.Update(model);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _addressService.Delete(id);
            return NoContent();
        }
    }
}