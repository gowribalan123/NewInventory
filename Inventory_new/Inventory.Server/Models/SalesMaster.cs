using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Inventory.Server.Models
{
    [Table("SalesMaster")]
    public class SalesMaster
    {
        [Key]
        public int SalesID { get; set; }
        
        public int SalesCode { get; set; }
        
        public DateTime? SalesDate { get; set; }
        
        public int? OrderNo { get; set; }
        
        public DateTime? OrderDate { get; set; }
        
        public bool? SalesmanGodownFlag { get; set; }
        
        [StringLength(10)]
        public string? BillType { get; set; }
        
        public int? PartyID { get; set; }
        
        public int? AgentId { get; set; }
        
        [StringLength(100)]
        public string? Narration { get; set; }
        
        public int? FormType { get; set; }
        
        public int? ItemType { get; set; }
        
        public int? SalesType { get; set; }
        
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
        
        [StringLength(100)]
        public string? PartyName { get; set; }
        
        public double? Cess { get; set; }
        
        [StringLength(100)]
        public string? Address { get; set; }
        
        public decimal? OtherCharge { get; set; }
        
        public int? VoucherId { get; set; }
        
        public decimal? CashRecieved { get; set; }
        
        public decimal? CashBalance { get; set; }
        
        public decimal? PendingAmt { get; set; }
        
        public int? RateType { get; set; }
        
        [StringLength(100)]
        public string? Narration1 { get; set; }
        
        public int? GodownID { get; set; }
        
        [StringLength(100)]
        public string? Address2 { get; set; }
        
        [StringLength(20)]
        public string? PONo { get; set; }
        
        public DateTime? PODate { get; set; }
        
        public decimal? OtherChargesBill { get; set; }
        
        public decimal? OtherChargesExtra { get; set; }
        
        public int? CashVoucherID { get; set; }
        
        public int? JournelVoucherID { get; set; }
        
        public int? Counter { get; set; }
        
        public decimal? TotalPoint { get; set; }
        
        [StringLength(100)]
        public string? PhoneNo { get; set; }
        
        public int? SCODE { get; set; }
        
        public double? UPIAmount { get; set; }
        
        public double? CardAmount { get; set; }
    }
}