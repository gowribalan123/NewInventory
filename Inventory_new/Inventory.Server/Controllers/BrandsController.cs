using AutoMapper;
using Inventory.Server.Dtos;
using Inventory.Server.Models.Core;
using Inventory.Server.Services;
using Microsoft.AspNetCore.Mvc;

namespace Inventory.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BrandsController : ControllerBase
    {
        private readonly IBrandService _brandService;
        private readonly IMapper _mapper;

        public BrandsController(IBrandService brandService, IMapper mapper)
        {
            _brandService = brandService;
            _mapper = mapper;
        }

        // GET: api/Brands
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BrandDto>>> GetBrands()
        {
            var brands = await _brandService.GetAllAsync();
            return Ok(_mapper.Map<IEnumerable<BrandDto>>(brands));
        }

        // GET: api/Brands/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BrandDto>> GetBrand(int id)
        {
            var brand = await _brandService.GetByIdAsync(id);

            if (brand == null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<BrandDto>(brand));
        }

        // GET: api/Brands/dropdown
        [HttpGet("dropdown")]
        public async Task<ActionResult<IEnumerable<BrandNameDto>>> GetBrandNames()
        {
            var brands = await _brandService.GetAllAsync();
            return Ok(_mapper.Map<IEnumerable<BrandNameDto>>(brands));
        }

        // POST: api/Brands
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<BrandDto>> PostBrand(CreateBrandDto createDto)
        {
            var brand = _mapper.Map<Brand>(createDto);
            brand.CreatedDate = DateTime.Now;

            var createdBrand = await _brandService.CreateAsync(brand);

            var returnDto = _mapper.Map<BrandDto>(createdBrand);

            return CreatedAtAction(nameof(GetBrand), new { id = createdBrand.BrandId }, returnDto);
        }

        // PUT: api/Brands/5
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> PutBrand(int id, UpdateBrandDto updateDto)
        {
            var brandToUpdate = await _brandService.GetByIdAsync(id);

            if (brandToUpdate == null)
            {
                return NotFound();
            }

            _mapper.Map(updateDto, brandToUpdate);
            await _brandService.UpdateAsync(brandToUpdate);

            return NoContent();
        }

        // DELETE: api/Brands/5
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteBrand(int id)
        {
            if (!await _brandService.ExistsAsync(id))
            {
                return NotFound();
            }

            await _brandService.DeleteAsync(id);

            return NoContent();
        }
    }
}