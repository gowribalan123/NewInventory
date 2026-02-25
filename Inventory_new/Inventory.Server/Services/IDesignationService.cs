using Inventory.Server.Models.Core;

namespace Inventory.Server.Services
{
    public interface IDesignationService
    {
        Task<IEnumerable<Designation>> GetAllAsync();
        Task<Designation?> GetByIdAsync(int id);
        Task<Designation> CreateAsync(Designation designation);
        Task UpdateAsync(Designation designation);
        Task DeleteAsync(int id);
        Task<bool> ExistsAsync(int id);
    }
}