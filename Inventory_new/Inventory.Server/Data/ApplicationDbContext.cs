using Inventory.Server.Models.Core;
using Inventory.Server.Models;
using Microsoft.EntityFrameworkCore;
using Inventory.Server.Dtos;


namespace Inventory.Server.Data
{
    public class InventoryDbContext : DbContext
    {
        public InventoryDbContext(DbContextOptions<InventoryDbContext> options) : base(options)
        {
        }

        public DbSet<Brand> Brands { get; set; }
        public DbSet<Unit> Units { get; set; }
        public DbSet<Designation> Designations { get; set; }
        
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Account> Accounts { get; set; }
        public DbSet<Item> Items { get; set; }
        public DbSet<AccountHead> AccountHeads { get; set; }
        public DbSet<PurchaseMaster> PurchaseMasters { get; set; }
        public DbSet<InventoryTransaction> InventoryTransactions { get; set; }
        public DbSet<SalesMaster> SalesMasters { get; set; }
        public DbSet<Godown> Godowns { get; set; }
        public DbSet<CategoryGroup> CategoryGroups { get; set; }
        public DbSet<Category> Categories { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure decimal properties for SalesMaster to remove warnings
            // and ensure data precision. Using (18, 2) is a common standard for currency.
            modelBuilder.Entity<SalesMaster>(entity =>
            {
                entity.Property(e => e.OtherCharge).HasPrecision(18, 2);
                entity.Property(e => e.OtherChargesBill).HasPrecision(18, 2);
                entity.Property(e => e.OtherChargesExtra).HasPrecision(18, 2);
                entity.Property(e => e.PendingAmt).HasPrecision(18, 2);
                entity.Property(e => e.TotalPoint).HasPrecision(18, 2);
                entity.Property(e => e.CashRecieved).HasPrecision(18, 2);
                entity.Property(e => e.CashBalance).HasPrecision(18, 2);
            });

            modelBuilder.Entity<AccountHead>(entity =>
            {
                entity.Property(e => e.CreditLimit).HasPrecision(18, 2);
            });

            modelBuilder.Entity<Item>(entity =>
            {
                entity.Property(e => e.SalesPoint).HasPrecision(18, 2);
            });

            modelBuilder.Entity<PurchaseMaster>(entity =>
            {
                entity.Property(e => e.OtherChargesBill).HasPrecision(18, 2);
                entity.Property(e => e.OtherChargesExtra).HasPrecision(18, 2);
            });

            modelBuilder.Entity<InventoryTransaction>(entity =>
            {
                entity.Property(p => p.Quantity).HasPrecision(18, 2);
                entity.Property(p => p.FreeQuantity).HasPrecision(18, 2);
                entity.Property(p => p.BillQty).HasPrecision(18, 2);
                entity.Property(p => p.BillFreeQty).HasPrecision(18, 2);
                entity.Property(p => p.Multiplier).HasPrecision(18, 2);
                entity.Property(p => p.FreeMultiplier).HasPrecision(18, 2);
                entity.Property(p => p.PurchaseRate).HasPrecision(18, 2);
                entity.Property(p => p.SalesRate).HasPrecision(18, 2);
                entity.Property(p => p.BillRate).HasPrecision(18, 2);
                entity.Property(p => p.MRP).HasPrecision(18, 2);
                entity.Property(p => p.CostPrice).HasPrecision(18, 2);
                entity.Property(p => p.GrossAmount).HasPrecision(18, 2);
                entity.Property(p => p.Discount).HasPrecision(18, 2);
                entity.Property(p => p.DiscountAmt).HasPrecision(18, 2);
                entity.Property(p => p.Tax).HasPrecision(18, 2);
                entity.Property(p => p.TaxAmount).HasPrecision(18, 2);
                entity.Property(p => p.Cess).HasPrecision(18, 2);
                entity.Property(p => p.Total).HasPrecision(18, 2);
                entity.Property(p => p.GrandTotal).HasPrecision(18, 2);
            });
        }
    }
}