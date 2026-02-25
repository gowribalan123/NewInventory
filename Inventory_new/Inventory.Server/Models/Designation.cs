using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Inventory.Server.Models.Core
{
    [Table("Designation", Schema = "Reference")]
    public class Designation
    {
        [Key]
        public int DesignationId { get; set; }

        [StringLength(50)]
        public string? DesignationName { get; set; }

        public int? FinancialYearId { get; set; }
    }
}