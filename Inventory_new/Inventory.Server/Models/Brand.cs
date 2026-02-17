using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Inventory.Server.Models.Core
{
    [Table("Brand", Schema = "Reference")]
    public class Brand
    {
        [Key]
        public int BrandId { get; set; }

        [StringLength(100)]
        public string? BrandName { get; set; }

        public int UserId { get; set; }

        public DateTime CreatedDate { get; set; }

        public int CompanyId { get; set; }
    }
}