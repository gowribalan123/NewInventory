using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Inventory.Server.Models
{
    [Table("AccountHead")]
    public class AccountHead
    {
        [Key]
        public int AccountCode { get; set; }
        
        [Required]
        [StringLength(100)]
        public string AccountName { get; set; } = string.Empty;
        
        public int GroupUnder { get; set; }
        
        public int? UserId { get; set; }
        
        public DateTime? UserDate { get; set; }
        
        [StringLength(1)]
        public string? AccountType { get; set; }
        
        public int CompanyID { get; set; }
        
        [StringLength(100)]
        public string? Address1 { get; set; }
        
        [StringLength(100)]
        public string? Address2 { get; set; }
        
        [StringLength(100)]
        public string? Address3 { get; set; }
        
        [StringLength(100)]
        public string? Address4 { get; set; }
        
        [StringLength(20)]
        public string? Pincode { get; set; }
        
        [StringLength(100)]
        public string? PhoneNo { get; set; }
        
        [StringLength(100)]
        public string? MobileNo { get; set; }
        
        [StringLength(30)]
        public string? email { get; set; }
        
        [StringLength(50)]
        public string? TIN { get; set; }
        
        [StringLength(50)]
        public string? CSTNo { get; set; }
        
        public int? GoodsType { get; set; }
        
        public decimal? CreditLimit { get; set; }
        
        public int? EmpId { get; set; }
        
        public int? DueDays { get; set; }
        
        public int? RouteID { get; set; }
        
        public int? FormID { get; set; }
        
        public int? Type { get; set; }
        
        public int? RateType { get; set; }
        
        public int? PurchaseSalesTypeId { get; set; }
        
        public int? CollAgentID { get; set; }
        
        public int? PartyType { get; set; }
    }
}