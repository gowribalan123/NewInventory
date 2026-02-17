using System.ComponentModel.DataAnnotations;

namespace Inventory.Server.Dtos
{
    public class UnitDto
    {
        public int UnitId { get; set; }
        public string UnitName { get; set; } = null!;
        public decimal? Multiplier { get; set; }
        public int? CommissionSalesNo { get; set; }
    }

    public class CreateUnitDto
    {
        [Required]
        [StringLength(100)]
        public string UnitName { get; set; } = null!;
        public decimal? Multiplier { get; set; }
        public int? CommissionSalesNo { get; set; }
        
        public int CompanyId { get; set; }
        public int? UserId { get; set; }
    }

    public class UpdateUnitDto
    {
        [StringLength(100)]
        public string? UnitName { get; set; }
        public decimal? Multiplier { get; set; }
        public int? CommissionSalesNo { get; set; }
    }
}