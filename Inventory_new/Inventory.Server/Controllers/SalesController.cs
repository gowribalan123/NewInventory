using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Inventory.Server.Data;
using Inventory.Server.Models;

namespace Inventory.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SalesController : ControllerBase
    {
        private readonly InventoryDbContext _context;

        public SalesController(InventoryDbContext context)
        {
            _context = context;
        }

        // GET: api/Sales
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SalesMaster>>> GetSales()
        {
            if (_context.SalesMasters == null)
            {
                return NotFound();
            }
            return await _context.SalesMasters.ToListAsync();
        }

        // GET: api/Sales/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SalesMaster>> GetSale(int id)
        {
            if (_context.SalesMasters == null)
            {
                return NotFound();
            }
            var sale = await _context.SalesMasters.FindAsync(id);

            if (sale == null)
            {
                return NotFound();
            }

            return sale;
        }

        // POST: api/Sales
        [HttpPost]
        public async Task<ActionResult<SalesMaster>> PostSale(SalesMaster sale)
        {
            if (_context.SalesMasters == null)
            {
                return Problem("Entity set 'InventoryDbContext.SalesMasters' is null.");
            }
            _context.SalesMasters.Add(sale);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetSale), new { id = sale.SalesID }, sale);
        }

        // PUT: api/Sales/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSale(int id, SalesMaster sale)
        {
            if (id != sale.SalesID)
            {
                return BadRequest();
            }

            _context.Entry(sale).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SaleExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/Sales/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSale(int id)
        {
            if (_context.SalesMasters == null)
            {
                return NotFound();
            }
            var sale = await _context.SalesMasters.FindAsync(id);
            if (sale == null)
            {
                return NotFound();
            }

            _context.SalesMasters.Remove(sale);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SaleExists(int id)
        {
            return (_context.SalesMasters?.Any(e => e.SalesID == id)).GetValueOrDefault();
        }
    }
}