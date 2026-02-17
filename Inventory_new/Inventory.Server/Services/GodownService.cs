using Inventory.Server.Data;
using Inventory.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace Inventory.Server.Services
{
    public class GodownService : IGodownService
    {
        private readonly InventoryDbContext _context;

        public GodownService(InventoryDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Godown>> GetAllAsync()
        {
            return await _context.Godowns.ToListAsync();
        }

        public async Task<Godown?> GetByIdAsync(int id)
        {
            return await _context.Godowns.FindAsync(id);
        }

        public async Task<Godown> CreateAsync(Godown godown)
        {
            _context.Godowns.Add(godown);
            await _context.SaveChangesAsync();
            return godown;
        }

        public async Task UpdateAsync(Godown godown)
        {
            _context.Entry(godown).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var godown = await _context.Godowns.FindAsync(id);
            if (godown != null)
            {
                _context.Godowns.Remove(godown);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<bool> ExistsAsync(int id)
        {
            return await _context.Godowns.AnyAsync(e => e.GodownID == id);
        }
    }
}