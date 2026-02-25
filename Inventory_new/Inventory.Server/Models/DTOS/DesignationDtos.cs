using System.ComponentModel.DataAnnotations;

namespace Inventory.Server.Dtos
{
    public class DesignationDto
    {
        public int DesignationId { get; set; }
        public string? DesignationName { get; set; }
        public int? FinancialYearId { get; set; }
    }

    public class CreateDesignationDto
    {
        [Required(ErrorMessage = "Designation name is required.")]
        [StringLength(50)]
        public string DesignationName { get; set; } = null!;
        public int? FinancialYearId { get; set; }
    }

    public class UpdateDesignationDto
    {
        [Required(ErrorMessage = "Designation name is required.")]
        [StringLength(50)]
        public string DesignationName { get; set; } = null!;
        public int? FinancialYearId { get; set; }
    }
}