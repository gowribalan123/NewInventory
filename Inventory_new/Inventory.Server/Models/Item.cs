using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Inventory.Server.Models
{
    [Table("Item")]
    public class Item
    {
        [Key]
        public int ItemId { get; set; }
        
        [StringLength(75)]
        public string? ItemCode { get; set; }
        
        [StringLength(150)]
        public string? ItemName { get; set; }
        
        public int? CategoryId { get; set; }
        
        public int? SizeId { get; set; }
        
        [StringLength(30)]
        public string? CommodityCode { get; set; }
        
        public int? CompanyNameID { get; set; }
        
        public double? SalesRate { get; set; }
        
        public double? SalesDiscount { get; set; }
        
        public double? PurchaseRate { get; set; }
        
        public double? PurchaseDiscount { get; set; }
        
        public double? ReorderLevel { get; set; }
        
        public double? MinimumLevel { get; set; }
        
        public int? DefaultSalesUnit { get; set; }
        
        public int? DefaultPurchaseUnit { get; set; }
        
        public int? SalesTaxHead { get; set; }
        
        public double? SalesTaxRate { get; set; }
        
        public int? PurchaseTaxHead { get; set; }
        
        public double? PurchaseTaxRate { get; set; }
        
        public int? CSTPurchaseTaxHead { get; set; }
        
        public double? CSTPurchaseTaxRate { get; set; }
        
        public int? UserID { get; set; }
        
        public DateTime? UserDate { get; set; }
        
        public int CompanyID { get; set; }
        
        public double? Margin { get; set; }
        
        public int? ItemType { get; set; }
        
        public int? CategoryType { get; set; }
        
        public double? MRP { get; set; }
        
        public bool? StockType { get; set; }
        
        public double? WholeSaleRate { get; set; }
        
        public double? InterStateRate { get; set; }
        
        [StringLength(50)]
        public string? Rack { get; set; }
        
        public decimal? SalesPoint { get; set; }
    }
}