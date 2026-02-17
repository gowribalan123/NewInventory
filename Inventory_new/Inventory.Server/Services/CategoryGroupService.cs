using Inventory.Server.Data;
using Inventory.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace Inventory.Server.Services
{
    public class CategoryGroupService : ICategoryGroupService
    {
        private readonly InventoryDbContext _context;

        public CategoryGroupService(InventoryDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<CategoryGroup>> GetAllAsync()
        {
            return await _context.CategoryGroups.ToListAsync();
        }

        public async Task<CategoryGroup?> GetByIdAsync(int id)
        {
            return await _context.CategoryGroups.FindAsync(id);
        }

        public async Task<CategoryGroup> CreateAsync(CategoryGroup categoryGroup)
        {
            _context.CategoryGroups.Add(categoryGroup);
            await _context.SaveChangesAsync();
            return categoryGroup;
        }

        public async Task UpdateAsync(CategoryGroup categoryGroup)
        {
            _context.Entry(categoryGroup).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var categoryGroup = await _context.CategoryGroups.FindAsync(id);
            if (categoryGroup != null)
            {
                _context.CategoryGroups.Remove(categoryGroup);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<bool> ExistsAsync(int id)
        {
            return await _context.CategoryGroups.AnyAsync(e => e.CategoryGroupId == id);
        }
    }
}