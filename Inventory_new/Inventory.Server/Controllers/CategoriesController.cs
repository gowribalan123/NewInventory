using AutoMapper;
using Inventory.Server.Dtos;
using Inventory.Server.Models;
using Inventory.Server.Services;
using Microsoft.AspNetCore.Mvc;

namespace Inventory.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoryService _categoryService;
        private readonly IMapper _mapper;

        public CategoriesController(ICategoryService categoryService, IMapper mapper)
        {
            _categoryService = categoryService;
            _mapper = mapper;
        }

        // GET: api/Categories
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CategoryDto>>> GetCategories()
        {
            var categories = await _categoryService.GetAllAsync();
            return Ok(_mapper.Map<IEnumerable<CategoryDto>>(categories));
        }

        // GET: api/Categories/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CategoryDto>> GetCategory(int id)
        {
            var category = await _categoryService.GetByIdAsync(id);

            if (category == null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<CategoryDto>(category));
        }

        // POST: api/Categories
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<CategoryDto>> PostCategory(CreateCategoryDto createDto)
        {
            var category = _mapper.Map<Category>(createDto);
            category.CreatedDate = DateTime.Now;
            
            var createdCategory = await _categoryService.CreateAsync(category);

            var returnDto = _mapper.Map<CategoryDto>(createdCategory);

            return CreatedAtAction(nameof(GetCategory), new { id = createdCategory.CategoryId }, returnDto);
        }

        // PUT: api/Categories/5
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> PutCategory(int id, UpdateCategoryDto updateDto)
        {
            var categoryToUpdate = await _categoryService.GetByIdAsync(id);

            if (categoryToUpdate == null)
            {
                return NotFound();
            }

            _mapper.Map(updateDto, categoryToUpdate);
            await _categoryService.UpdateAsync(categoryToUpdate);

            return NoContent();
        }

        // DELETE: api/Categories/5
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteCategory(int id)
        {
            if (!await _categoryService.ExistsAsync(id))
            {
                return NotFound();
            }

            await _categoryService.DeleteAsync(id);

            return NoContent();
        }
    }
}