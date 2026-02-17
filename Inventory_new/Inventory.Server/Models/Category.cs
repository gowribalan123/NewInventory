using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Inventory.Server.Models
{
    [Table("Category", Schema = "Reference")]
    public class Category
    {
        [Key]
        public int CategoryId { get; set; }

        [Required]
        [StringLength(100)]
        public string CategoryName { get; set; } = string.Empty;

        public int CategoryGroupId { get; set; }

        [ForeignKey("CategoryGroupId")]
        public CategoryGroup? CategoryGroup { get; set; }

        public int UserId { get; set; }

        public int CompanyId { get; set; }

        public DateTime CreatedDate { get; set; }
    }
}