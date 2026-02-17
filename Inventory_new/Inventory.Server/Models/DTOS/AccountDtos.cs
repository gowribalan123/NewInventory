using System.ComponentModel.DataAnnotations;

namespace Inventory.Server.Dtos
{
    // DTO for returning account data
    public class AccountDto
    {
        public int AccountId { get; set; }
        public string AccountName { get; set; } = null!;
        public int GroupId { get; set; }
        public string? PhoneNo { get; set; }
        public string? Email { get; set; }
        public decimal? CreditLimit { get; set; }
        public int CompanyId { get; set; }
    }

    // DTO for creating a new account
    public class CreateAccountDto
    {
        [Required]
        [StringLength(100)]
        public string AccountName { get; set; } = null!;

        [Required]
        public int GroupId { get; set; }

        [Required]
        public int CompanyId { get; set; }

        [StringLength(100)]
        public string? Address1 { get; set; }

        [StringLength(100)]
        public string? PhoneNo { get; set; }

        [StringLength(30)]
        public string? Email { get; set; }

        public decimal? CreditLimit { get; set; }
    }

    // DTO for updating an existing account
    public class UpdateAccountDto
    {
        [StringLength(100)]
        public string? AccountName { get; set; }
        public int? GroupId { get; set; }
        [StringLength(100)]
        public string? Address1 { get; set; }
        [StringLength(100)]
        public string? PhoneNo { get; set; }
        [StringLength(30)]
        public string? Email { get; set; }
        public decimal? CreditLimit { get; set; }
    }
}