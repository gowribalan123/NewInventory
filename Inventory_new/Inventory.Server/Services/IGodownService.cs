using Inventory.Server.Models;

namespace Inventory.Server.Services
{
    public interface IGodownService
    {
        Task<IEnumerable<Godown>> GetAllAsync();
        Task<Godown?> GetByIdAsync(int id);
        Task<Godown> CreateAsync(Godown godown);
        Task UpdateAsync(Godown godown);
        Task DeleteAsync(int id);
        Task<bool> ExistsAsync(int id);
    }
}