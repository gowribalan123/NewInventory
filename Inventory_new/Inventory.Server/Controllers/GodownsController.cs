using AutoMapper;
using Inventory.Server.Dtos;
using Inventory.Server.Models;
using Inventory.Server.Services;
using Microsoft.AspNetCore.Mvc;

namespace Inventory.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GodownsController : ControllerBase
    {
        private readonly IGodownService _godownService;
        private readonly IMapper _mapper;

        public GodownsController(IGodownService godownService, IMapper mapper)
        {
            _godownService = godownService;
            _mapper = mapper;
        }

        // GET: api/Godowns
        [HttpGet]
        public async Task<ActionResult<IEnumerable<GodownDto>>> GetGodowns()
        {
            var godowns = await _godownService.GetAllAsync();
            return Ok(_mapper.Map<IEnumerable<GodownDto>>(godowns));
        }

        // GET: api/Godowns/5
        [HttpGet("{id}")]
        public async Task<ActionResult<GodownDto>> GetGodown(int id)
        {
            var godown = await _godownService.GetByIdAsync(id);

            if (godown == null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<GodownDto>(godown));
        }

        // POST: api/Godowns
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<GodownDto>> PostGodown(CreateGodownDto createDto)
        {
            var godown = _mapper.Map<Godown>(createDto);
            godown.UserDate = DateTime.Now;
            
            var createdGodown = await _godownService.CreateAsync(godown);

            var returnDto = _mapper.Map<GodownDto>(createdGodown);

            return CreatedAtAction(nameof(GetGodown), new { id = createdGodown.GodownID }, returnDto);
        }

        // PUT: api/Godowns/5
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> PutGodown(int id, UpdateGodownDto updateDto)
        {
            var godownToUpdate = await _godownService.GetByIdAsync(id);

            if (godownToUpdate == null)
            {
                return NotFound();
            }

            _mapper.Map(updateDto, godownToUpdate);
            await _godownService.UpdateAsync(godownToUpdate);

            return NoContent();
        }

        // DELETE: api/Godowns/5
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteGodown(int id)
        {
            if (!await _godownService.ExistsAsync(id))
            {
                return NotFound();
            }

            await _godownService.DeleteAsync(id);

            return NoContent();
        }
    }
}