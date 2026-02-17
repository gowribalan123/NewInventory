using Inventory.Server.Data;
using Inventory.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace Inventory.Server.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly InventoryDbContext _context;

        public CategoryService(InventoryDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Category>> GetAllAsync()
        {
            // Include CategoryGroup to display the group name in the list
            return await _context.Categories.Include(c => c.CategoryGroup).ToListAsync();
        }

        public async Task<Category?> GetByIdAsync(int id)
        {
            return await _context.Categories.Include(c => c.CategoryGroup).FirstOrDefaultAsync(c => c.CategoryId == id);
        }

        public async Task<Category> CreateAsync(Category category)
        {
            _context.Categories.Add(category);
            await _context.SaveChangesAsync();
            return category;
        }

        public async Task UpdateAsync(Category category)
        {
            _context.Entry(category).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var category = await _context.Categories.FindAsync(id);
            if (category != null)
            {
                _context.Categories.Remove(category);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<bool> ExistsAsync(int id)
        {
            return await _context.Categories.AnyAsync(e => e.CategoryId == id);
        }
    }
}