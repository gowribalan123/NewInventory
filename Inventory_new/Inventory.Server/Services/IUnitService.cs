using Inventory.Server.Models;

namespace Inventory.Server.Services
{
    public interface IUnitService
    {
        Task<IEnumerable<Unit>> GetAllAsync();
        Task<Unit?> GetByIdAsync(int id);
        Task<Unit> CreateAsync(Unit unit);
        Task UpdateAsync(Unit unit);
        Task DeleteAsync(int id);
        Task<bool> ExistsAsync(int id);
    }
}