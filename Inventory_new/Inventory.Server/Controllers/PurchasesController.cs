using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Inventory.Server.Data;
using Inventory.Server.Models;

namespace Inventory.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PurchasesController : ControllerBase
    {
        private readonly InventoryDbContext _context;

        public PurchasesController(InventoryDbContext context)
        {
            _context = context;
        }

        // GET: api/Purchases
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PurchaseMaster>>> GetPurchases()
        {
            if (_context.PurchaseMasters == null)
            {
                return NotFound();
            }
            return await _context.PurchaseMasters.ToListAsync();
        }

        // GET: api/Purchases/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PurchaseMaster>> GetPurchase(int id)
        {
            if (_context.PurchaseMasters == null)
            {
                return NotFound();
            }
            var purchase = await _context.PurchaseMasters.FindAsync(id);

            if (purchase == null)
            {
                return NotFound();
            }

            return purchase;
        }

        // POST: api/Purchases
        [HttpPost]
        public async Task<ActionResult<PurchaseMaster>> PostPurchase(PurchaseMaster purchase)
        {
            if (_context.PurchaseMasters == null)
            {
                return Problem("Entity set 'InventoryDbContext.PurchaseMasters' is null.");
            }
            _context.PurchaseMasters.Add(purchase);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetPurchase), new { id = purchase.PurchaseNo }, purchase);
        }

        // PUT: api/Purchases/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPurchase(int id, PurchaseMaster purchase)
        {
            if (id != purchase.PurchaseNo)
            {
                return BadRequest();
            }

            _context.Entry(purchase).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PurchaseExists(id))
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

        // DELETE: api/Purchases/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePurchase(int id)
        {
            if (_context.PurchaseMasters == null)
            {
                return NotFound();
            }
            var purchase = await _context.PurchaseMasters.FindAsync(id);
            if (purchase == null)
            {
                return NotFound();
            }

            _context.PurchaseMasters.Remove(purchase);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PurchaseExists(int id)
        {
            return (_context.PurchaseMasters?.Any(e => e.PurchaseNo == id)).GetValueOrDefault();
        }
    }
}