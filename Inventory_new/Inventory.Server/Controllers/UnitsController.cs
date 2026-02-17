using AutoMapper;
using Inventory.Server.Dtos;
using Inventory.Server.Models;
using Inventory.Server.Services;
using Microsoft.AspNetCore.Mvc;

namespace Inventory.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UnitsController : ControllerBase
    {
        private readonly IUnitService _unitService;
        private readonly IMapper _mapper;

        public UnitsController(IUnitService unitService, IMapper mapper)
        {
            _unitService = unitService;
            _mapper = mapper;
        }

        // GET: api/Units
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UnitDto>>> GetUnits()
        {
            var units = await _unitService.GetAllAsync();
            return Ok(_mapper.Map<IEnumerable<UnitDto>>(units));
        }

        // GET: api/Units/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UnitDto>> GetUnit(int id)
        {
            var unit = await _unitService.GetByIdAsync(id);

            if (unit == null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<UnitDto>(unit));
        }

        // POST: api/Units
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<UnitDto>> PostUnit(CreateUnitDto createDto)
        {
            var unit = _mapper.Map<Unit>(createDto);
            unit.CreatedDate = DateTime.Now;
            
            var createdUnit = await _unitService.CreateAsync(unit);

            var returnDto = _mapper.Map<UnitDto>(createdUnit);

            return CreatedAtAction(nameof(GetUnit), new { id = createdUnit.UnitId }, returnDto);
        }

        // PUT: api/Units/5
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> PutUnit(int id, UpdateUnitDto updateDto)
        {
            var unitToUpdate = await _unitService.GetByIdAsync(id);

            if (unitToUpdate == null)
            {
                return NotFound();
            }

            _mapper.Map(updateDto, unitToUpdate);
            await _unitService.UpdateAsync(unitToUpdate);

            return NoContent();
        }

        // DELETE: api/Units/5
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteUnit(int id)
        {
            if (!await _unitService.ExistsAsync(id))
            {
                return NotFound();
            }

            await _unitService.DeleteAsync(id);

            return NoContent();
        }
    }
}