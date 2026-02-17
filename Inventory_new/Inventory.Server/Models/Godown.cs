using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Inventory.Server.Models
{
    [Table("Godown", Schema = "Reference")]
    public class Godown
    {
        [Key]
        public int GodownID { get; set; }

        [StringLength(100)]
        public string? GodownName { get; set; }

        [StringLength(100)]
        public string? Location { get; set; }
        
        public bool? IsGodown { get; set; }

        [StringLength(100)]
        public string? VanRegNo { get; set; }

        [StringLength(100)]
        public string? Make { get; set; }

        [StringLength(100)]
        public string? Model { get; set; }

        [StringLength(100)]
        public string? Insurance { get; set; }

        public DateTime? InsuranceFrom { get; set; }

        public DateTime? InsuranceTo { get; set; }

        public DateTime? TaxFrom { get; set; }

        public DateTime? TaxTo { get; set; }

        public bool? IsClosed { get; set; }

        public int UserID { get; set; }

        public DateTime UserDate { get; set; }

        public int CompanyID { get; set; }
    }
}