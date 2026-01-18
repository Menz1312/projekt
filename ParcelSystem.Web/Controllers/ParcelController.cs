using Microsoft.AspNetCore.Mvc;
using ParcelSystem.Services;
using ParcelSystem.Services.ViewModels;

namespace ParcelSystem.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ParcelController : ControllerBase
    {
        private readonly IParcelService _parcelService;

        public ParcelController(IParcelService parcelService)
        {
            _parcelService = parcelService;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var result = _parcelService.GetAll();
            return Ok(result);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var result = _parcelService.GetById(id);
            if (result == null) return NotFound();

            return Ok(result);
        }

        [HttpPost]
        public IActionResult Add([FromBody] ParcelViewModel model)
        {
            // Tutaj można dodać walidację, np. czy AddressId istnieje
            var id = _parcelService.Add(model);
            return CreatedAtAction(nameof(GetById), new { id = id }, model);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] ParcelViewModel model)
        {
            model.Id = id;
            _parcelService.Update(model);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _parcelService.Delete(id);
            return NoContent();
        }
    }
}