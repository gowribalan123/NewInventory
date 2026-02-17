using Inventory.Server.Data;
using Inventory.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace Inventory.Server.Services
{
    public class UnitService : IUnitService
    {
        private readonly InventoryDbContext _context;

        public UnitService(InventoryDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Unit>> GetAllAsync()
        {
            return await _context.Units.ToListAsync();
        }

        public async Task<Unit?> GetByIdAsync(int id)
        {
            return await _context.Units.FindAsync(id);
        }

        public async Task<Unit> CreateAsync(Unit unit)
        {
            _context.Units.Add(unit);
            await _context.SaveChangesAsync();
            return unit;
        }

        public async Task UpdateAsync(Unit unit)
        {
            _context.Entry(unit).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var unit = await _context.Units.FindAsync(id);
            if (unit != null)
            {
                _context.Units.Remove(unit);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<bool> ExistsAsync(int id)
        {
            return await _context.Units.AnyAsync(e => e.UnitId == id);
        }
    }
}