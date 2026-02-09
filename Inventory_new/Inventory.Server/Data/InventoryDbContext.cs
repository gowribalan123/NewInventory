using Microsoft.EntityFrameworkCore;
using Inventory.Server.Models;

namespace Inventory.Server.Data
{
    public class InventoryDbContext : DbContext
    {
        public InventoryDbContext(DbContextOptions<InventoryDbContext> options) : base(options)
        {
        }

        public DbSet<Item> Items { get; set; }
        public DbSet<PurchaseMaster> PurchaseMasters { get; set; }
        public DbSet<SalesMaster> SalesMasters { get; set; }
        public DbSet<InventoryTransaction> InventoryTransactions { get; set; }
        public DbSet<AccountHead> AccountHeads { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configure Item entity
            modelBuilder.Entity<Item>(entity =>
            {
                entity.HasKey(e => e.ItemId);
                entity.Property(e => e.ItemId).ValueGeneratedOnAdd();
                entity.Property(e => e.SalesPoint).HasPrecision(18, 2);
            });

            // Configure PurchaseMaster entity
            modelBuilder.Entity<PurchaseMaster>(entity =>
            {
                entity.HasKey(e => e.PurchaseNo);
                entity.Property(e => e.PurchaseNo).ValueGeneratedOnAdd();
                entity.Property(e => e.OtherChargesBill).HasPrecision(18, 3);
                entity.Property(e => e.OtherChargesExtra).HasPrecision(18, 3);
            });

            // Configure SalesMaster entity
            modelBuilder.Entity<SalesMaster>(entity =>
            {
                entity.HasKey(e => e.SalesID);
                entity.Property(e => e.SalesID).ValueGeneratedOnAdd();
                entity.Property(e => e.CashBalance).HasPrecision(18, 2);
                entity.Property(e => e.CashRecieved).HasPrecision(18, 2);
                entity.Property(e => e.OtherCharge).HasPrecision(18, 2);
                entity.Property(e => e.OtherChargesBill).HasPrecision(18, 3);
                entity.Property(e => e.OtherChargesExtra).HasPrecision(18, 3);
                entity.Property(e => e.PendingAmt).HasPrecision(18, 2);
                entity.Property(e => e.TotalPoint).HasPrecision(18, 2);
            });

            // Configure InventoryTransaction entity
            modelBuilder.Entity<InventoryTransaction>(entity =>
            {
                entity.HasKey(e => e.TempId);
                entity.Property(e => e.TempId).ValueGeneratedOnAdd();
                entity.Property(e => e.Multiplier).HasPrecision(18, 3);
                entity.Property(e => e.PurchaseRate).HasPrecision(18, 2);
                entity.Property(e => e.Quantity).HasPrecision(18, 3);
                entity.Property(e => e.Quantity1).HasPrecision(18, 3);
                entity.Property(e => e.Quantity2).HasPrecision(18, 3);
                entity.Property(e => e.Quantity3).HasPrecision(18, 3);
                entity.Property(e => e.SalesRate).HasPrecision(18, 2);
                entity.Property(e => e.Services).HasPrecision(18, 2);
                entity.Property(e => e.Shortage).HasPrecision(18, 2);
                entity.Property(e => e.Tax).HasPrecision(18, 2);
                entity.Property(e => e.TaxAmount).HasPrecision(18, 2);
                entity.Property(e => e.Total).HasPrecision(18, 2);
            });

            // Configure AccountHead entity
            modelBuilder.Entity<AccountHead>(entity =>
            {
                entity.HasKey(e => e.AccountCode);
                entity.Property(e => e.AccountCode).ValueGeneratedOnAdd();
            });

            base.OnModelCreating(modelBuilder);
        }
    }
}