using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Inventory.Server.Models
{
    [Table("Unit", Schema = "Reference")]
    public class Unit
    {
        [Key]
        public int UnitId { get; set; }

        [Required]
        [StringLength(100)]
        public string UnitName { get; set; } = null!;

        [Column(TypeName = "numeric(18, 3)")]
        public decimal? Multiplier { get; set; }

        public int? UserId { get; set; }

        public DateTime? CreatedDate { get; set; }

        public int CompanyId { get; set; }

        public int? CommissionSalesNo { get; set; }
    }
}