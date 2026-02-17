using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Inventory.Server.Models
{
    [Table("CategoryGroup", Schema = "Reference")]
    public class CategoryGroup
    {
        [Key]
        public int CategoryGroupId { get; set; }

        [Required]
        [StringLength(100)]
        public string CategoryGroupName { get; set; } = string.Empty;
    }
}