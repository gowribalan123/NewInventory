using AutoMapper;
using Inventory.Server.Dtos;
using Inventory.Server.Models;
using Inventory.Server.Services;
using Microsoft.AspNetCore.Mvc;

namespace Inventory.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoryGroupsController : ControllerBase
    {
        private readonly ICategoryGroupService _categoryGroupService;
        private readonly IMapper _mapper;

        public CategoryGroupsController(ICategoryGroupService categoryGroupService, IMapper mapper)
        {
            _categoryGroupService = categoryGroupService;
            _mapper = mapper;
        }

        // GET: api/CategoryGroups
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CategoryGroupDto>>> GetCategoryGroups()
        {
            var categoryGroups = await _categoryGroupService.GetAllAsync();
            return Ok(_mapper.Map<IEnumerable<CategoryGroupDto>>(categoryGroups));
        }

        // GET: api/CategoryGroups/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CategoryGroupDto>> GetCategoryGroup(int id)
        {
            var categoryGroup = await _categoryGroupService.GetByIdAsync(id);

            if (categoryGroup == null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<CategoryGroupDto>(categoryGroup));
        }

        // GET: api/CategoryGroups/dropdown
        [HttpGet("dropdown")]
        public async Task<ActionResult<IEnumerable<CategoryGroupNameDto>>> GetCategoryGroupNames()
        {
            var categoryGroups = await _categoryGroupService.GetAllAsync();
            return Ok(_mapper.Map<IEnumerable<CategoryGroupNameDto>>(categoryGroups));
        }

        // POST: api/CategoryGroups
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<CategoryGroupDto>> PostCategoryGroup(CreateCategoryGroupDto createDto)
        {
            var categoryGroup = _mapper.Map<CategoryGroup>(createDto);
            
            var createdCategoryGroup = await _categoryGroupService.CreateAsync(categoryGroup);

            var returnDto = _mapper.Map<CategoryGroupDto>(createdCategoryGroup);

            return CreatedAtAction(nameof(GetCategoryGroup), new { id = createdCategoryGroup.CategoryGroupId }, returnDto);
        }

        // PUT: api/CategoryGroups/5
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> PutCategoryGroup(int id, UpdateCategoryGroupDto updateDto)
        {
            var categoryGroupToUpdate = await _categoryGroupService.GetByIdAsync(id);

            if (categoryGroupToUpdate == null)
            {
                return NotFound();
            }

            _mapper.Map(updateDto, categoryGroupToUpdate);
            await _categoryGroupService.UpdateAsync(categoryGroupToUpdate);

            return NoContent();
        }

        // DELETE: api/CategoryGroups/5
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteCategoryGroup(int id)
        {
            if (!await _categoryGroupService.ExistsAsync(id))
            {
                return NotFound();
            }

            await _categoryGroupService.DeleteAsync(id);

            return NoContent();
        }
    }
}