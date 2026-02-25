using Inventory.Server.Data;
using Inventory.Server.Models.Core;
using Microsoft.EntityFrameworkCore;

namespace Inventory.Server.Services
{
    public class DesignationService : IDesignationService
    {
        private readonly InventoryDbContext _context;

        public DesignationService(InventoryDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Designation>> GetAllAsync()
        {
            return await _context.Designations.ToListAsync();
        }

        public async Task<Designation?> GetByIdAsync(int id)
        {
            return await _context.Designations.FindAsync(id);
        }

        public async Task<Designation> CreateAsync(Designation designation)
        {
            _context.Designations.Add(designation);
            await _context.SaveChangesAsync();
            return designation;
        }

        public async Task UpdateAsync(Designation designation)
        {
            _context.Entry(designation).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var designation = await _context.Designations.FindAsync(id);
            if (designation != null)
            {
                _context.Designations.Remove(designation);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<bool> ExistsAsync(int id)
        {
            return await _context.Designations.AnyAsync(e => e.DesignationId == id);
        }
    }
}