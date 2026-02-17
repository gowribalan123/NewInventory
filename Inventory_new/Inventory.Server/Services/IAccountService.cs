using Inventory.Server.Models.Core;

namespace Inventory.Server.Services
{
    public interface IAccountService
    {
        Task<IEnumerable<Account>> GetAllAsync();
        Task<Account?> GetByIdAsync(int id);
        Task<Account> CreateAsync(Account account);
        Task UpdateAsync(Account account);
        Task DeleteAsync(int id);
        Task<bool> ExistsAsync(int id);
    }
}