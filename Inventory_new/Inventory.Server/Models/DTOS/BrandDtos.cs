using System.ComponentModel.DataAnnotations;

namespace Inventory.Server.Dtos
{
    public class BrandDto
    {
        public int BrandId { get; set; }
        public string? BrandName { get; set; }
        public int UserId { get; set; }
        public DateTime CreatedDate { get; set; }
        public int CompanyId { get; set; }
    }

    public class CreateBrandDto
    {
        [StringLength(100)]
        public string? BrandName { get; set; }

        public int UserId { get; set; }
        public int CompanyId { get; set; }
    }

    public class UpdateBrandDto
    {
        [StringLength(100)]
        public string? BrandName { get; set; }
    }

    public class BrandNameDto
    {
        public int BrandId { get; set; }
        public string BrandName { get; set; } = null!;
    }
}