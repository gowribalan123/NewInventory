using System.ComponentModel.DataAnnotations;

namespace Inventory.Server.Dtos
{
    public class CategoryGroupDto
    {
        public int CategoryGroupId { get; set; }
        public string CategoryGroupName { get; set; } = null!;
    }

    public class CreateCategoryGroupDto
    {
        [Required]
        [StringLength(100)]
        public string CategoryGroupName { get; set; } = null!;
    }

    public class UpdateCategoryGroupDto
    {
        [StringLength(100)]
        public string? CategoryGroupName { get; set; }
    }

    public class CategoryGroupNameDto
    {
        public int CategoryGroupId { get; set; }
        public string CategoryGroupName { get; set; } = null!;
    }
}