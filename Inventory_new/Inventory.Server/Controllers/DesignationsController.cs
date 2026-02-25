using AutoMapper;
using Inventory.Server.Dtos;
using Inventory.Server.Models.Core;
using Inventory.Server.Services;
using Microsoft.AspNetCore.Mvc;

namespace Inventory.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DesignationsController : ControllerBase
    {
        private readonly IDesignationService _designationService;
        private readonly IMapper _mapper;

        public DesignationsController(IDesignationService designationService, IMapper mapper)
        {
            _designationService = designationService;
            _mapper = mapper;
        }

        // GET: api/Designations
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DesignationDto>>> GetDesignations()
        {
            var designations = await _designationService.GetAllAsync();
            return Ok(_mapper.Map<IEnumerable<DesignationDto>>(designations));
        }

        // GET: api/Designations/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DesignationDto>> GetDesignation(int id)
        {
            var designation = await _designationService.GetByIdAsync(id);

            if (designation == null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<DesignationDto>(designation));
        }

        // POST: api/Designations
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<DesignationDto>> PostDesignation(CreateDesignationDto createDto)
        {
            var designation = _mapper.Map<Designation>(createDto);

            var createdDesignation = await _designationService.CreateAsync(designation);

            var returnDto = _mapper.Map<DesignationDto>(createdDesignation);

            return CreatedAtAction(nameof(GetDesignation), new { id = createdDesignation.DesignationId }, returnDto);
        }

        // PUT: api/Designations/5
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> PutDesignation(int id, UpdateDesignationDto updateDto)
        {
            var designationToUpdate = await _designationService.GetByIdAsync(id);

            if (designationToUpdate == null)
            {
                return NotFound();
            }

            _mapper.Map(updateDto, designationToUpdate);
            await _designationService.UpdateAsync(designationToUpdate);

            return NoContent();
        }

        // DELETE: api/Designations/5
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteDesignation(int id)
        {
            if (!await _designationService.ExistsAsync(id))
            {
                return NotFound();
            }

            await _designationService.DeleteAsync(id);

            return NoContent();
        }
    }
}