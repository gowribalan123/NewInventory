using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Inventory.Server.Models.Core
{
    [Table("Account")]
    public class Account
    {
        [Key]
        public int AccountId { get; set; }

        [Required]
        [StringLength(100)]
        public string AccountName { get; set; } = string.Empty;

        public DateTime CreatedDate { get; set; }

        public bool IsActive { get; set; }
    }
}