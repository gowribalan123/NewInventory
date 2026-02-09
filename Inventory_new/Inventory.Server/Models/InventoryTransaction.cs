using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Inventory.Server.Models
{
    [Table("InventoryTransactions")]
    public class InventoryTransaction
    {
        public int InventoryNo { get; set; }
        
        [StringLength(30)]
        public string? BillCode { get; set; }
        
        public DateTime? InventoryDate { get; set; }
        
        [StringLength(2)]
        public string? InventoryType { get; set; }
        
        public int? SlNo { get; set; }
        
        public int? PurchaseNo { get; set; }
        
        [StringLength(50)]
        public string? BatchNo { get; set; }
        
        public int? ItemID { get; set; }
        
        public int? UnitID { get; set; }
        
        public decimal? Multiplier { get; set; }
        
        public decimal? Quantity { get; set; }
        
        public decimal? FreeQuantity { get; set; }
        
        public decimal? PurchaseRate { get; set; }
        
        public decimal? SalesRate { get; set; }
        
        public decimal? BillRate { get; set; }
        
        public decimal? BillQty { get; set; }
        
        public decimal? BillFreeQty { get; set; }
        
        public decimal? GrossAmount { get; set; }
        
        public decimal? Discount { get; set; }
        
        public decimal? DiscountAmt { get; set; }
        
        public decimal? ExciseDuty { get; set; }
        
        public decimal? ExciseDutyAmt { get; set; }
        
        public decimal? Tax { get; set; }
        
        public decimal? TaxAmount { get; set; }
        
        public double? RoundOff { get; set; }
        
        public double? OtherPur { get; set; }
        
        public DateTime? ExpiryDate { get; set; }
        
        public decimal? Total { get; set; }
        
        [StringLength(10)]
        public string? Mode { get; set; }
        
        public int? TaxableHead { get; set; }
        
        public bool SalesmanGodownFlag { get; set; }
        
        public bool CancelFlag { get; set; }
        
        public DateTime? CancelDate { get; set; }
        
        public bool DefectiveFlag { get; set; }
        
        public int FinancialYearID { get; set; }
        
        public bool? isEstimate { get; set; }
        
        public bool? TransType { get; set; }
        
        public decimal? Shortage { get; set; }
        
        public decimal? MRP { get; set; }
        
        public decimal? Cess { get; set; }
        
        public decimal? AdjGrossAmount { get; set; }
        
        [Key]
        public int TempId { get; set; }
        
        [StringLength(50)]
        public string? BatchNo1 { get; set; }
        
        public decimal? Quantity1 { get; set; }
        
        [StringLength(50)]
        public string? BatchNo2 { get; set; }
        
        public decimal? Quantity2 { get; set; }
        
        [StringLength(50)]
        public string? BatchNo3 { get; set; }
        
        public decimal? Quantity3 { get; set; }
        
        public int? FreeUnitId { get; set; }
        
        public decimal? FreeMultiplier { get; set; }
        
        public int? GodownID { get; set; }
        
        public decimal? CostPrice { get; set; }
        
        public int? ModelID { get; set; }
        
        [StringLength(50)]
        public string? ReturnType { get; set; }
        
        [StringLength(50)]
        public string? Narration { get; set; }
        
        public decimal? Services { get; set; }
        
        public decimal? GrandTotal { get; set; }
    }
}