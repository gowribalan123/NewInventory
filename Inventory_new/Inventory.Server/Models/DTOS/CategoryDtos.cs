using System.ComponentModel.DataAnnotations;

namespace Inventory.Server.Dtos
{
    public class CategoryDto
    {
        public int CategoryId { get; set; }
        public string CategoryName { get; set; } = null!;
        public int CategoryGroupId { get; set; }
        public string? CategoryGroupName { get; set; }
        public int UserId { get; set; }
        public int CompanyId { get; set; }
        public DateTime CreatedDate { get; set; }
    }

    public class CreateCategoryDto
    {
        [Required]
        [StringLength(100)]
        public string CategoryName { get; set; } = null!;

        [Required]
        public int CategoryGroupId { get; set; }

        public int UserId { get; set; }

        public int CompanyId { get; set; }
    }

    public class UpdateCategoryDto
    {
        [StringLength(100)]
        public string? CategoryName { get; set; }

        public int? CategoryGroupId { get; set; }
    }
}