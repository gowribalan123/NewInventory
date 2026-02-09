using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Inventory.Server.Models
{
    [Table("PurchaseMaster")]
    public class PurchaseMaster
    {
        [Key]
        public int PurchaseNo { get; set; }
        
        public DateTime? PurchaseDate { get; set; }
        
        [StringLength(10)]
        public string? PurchaseMode { get; set; }
        
        public int? OrderNo { get; set; }
        
        public DateTime? OrderDate { get; set; }
        
        [StringLength(30)]
        public string? InvoiceNo { get; set; }
        
        public DateTime? InvoiceDate { get; set; }
        
        public int? GodownID { get; set; }
        
        [StringLength(10)]
        public string? BillType { get; set; }
        
        public int? PurchaseType { get; set; }
        
        public int? PartyID { get; set; }
        
        [StringLength(100)]
        public string? PartyName { get; set; }
        
        [StringLength(100)]
        public string? Narration { get; set; }
        
        public double? Freight { get; set; }
        
        public double? Cess { get; set; }
        
        [StringLength(50)]
        public string? LorryNo { get; set; }
        
        public double? Cooli { get; set; }
        
        public double? TotalDiscount { get; set; }
        
        public double? AddDiscount { get; set; }
        
        public double? TotalExciseDuty { get; set; }
        
        public double? TotalTax { get; set; }
        
        public double? Totalamount { get; set; }
        
        public double? NetAmount { get; set; }
        
        public double? Roundoff { get; set; }
        
        public double? GrandTotal { get; set; }
        
        public int? UserId { get; set; }
        
        public DateTime? UserDate { get; set; }
        
        public bool EditFlag { get; set; }
        
        public DateTime? EditDate { get; set; }
        
        public bool CancelFlag { get; set; }
        
        public DateTime? CancelDate { get; set; }
        
        public bool ReturnedFlag { get; set; }
        
        public int? FinancialYearID { get; set; }
        
        public bool? isEstimate { get; set; }
        
        public int? CategoryType { get; set; }
        
        public bool? FreightAfter { get; set; }
        
        public int? FormType { get; set; }
        
        public double? OtherCharges { get; set; }
        
        public double? CustomsDuty { get; set; }
        
        public double? Clearing { get; set; }
        
        public double? Unloading { get; set; }
        
        public decimal? OtherChargesBill { get; set; }
        
        public decimal? OtherChargesExtra { get; set; }
        
        [StringLength(50)]
        public string? BENo { get; set; }
        
        public int? CashVoucherID { get; set; }
        
        public int? JournelVoucherID { get; set; }
        
        [StringLength(50)]
        public string? BatchNo { get; set; }
    }
}