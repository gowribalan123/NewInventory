using Inventory.Server.Models;

namespace Inventory.Server.Services
{
    public interface ICategoryGroupService
    {
        Task<IEnumerable<CategoryGroup>> GetAllAsync();
        Task<CategoryGroup?> GetByIdAsync(int id);
        Task<CategoryGroup> CreateAsync(CategoryGroup categoryGroup);
        Task UpdateAsync(CategoryGroup categoryGroup);
        Task DeleteAsync(int id);
        Task<bool> ExistsAsync(int id);
    }
}