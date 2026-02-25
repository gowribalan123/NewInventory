using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Inventory.Server.Models.Core;

namespace Inventory.Server.Models
{
    [Table("EMPLOYEEMASTER", Schema = "Reference")]
    public class Employee
    {
        [Key]
        public int EmpId { get; set; }

        [Required]
        [StringLength(10)]
        public string EmpCode { get; set; } = null!;

        [Required]
        [StringLength(100)]
        public string EmpName { get; set; } = null!;

        public DateTime? DOB { get; set; }

        public int? Age { get; set; }

        [StringLength(100)]
        public string? GuardianName { get; set; }

        [StringLength(100)]
        public string? Address1 { get; set; }

        [StringLength(100)]
        public string? Address2 { get; set; }

        [StringLength(100)]
        public string? Address3 { get; set; }

        [StringLength(20)]
        public string? PinCode { get; set; }

        [StringLength(20)]
        public string? Mobile { get; set; }

        [StringLength(50)]
        public string? EmailId { get; set; }

        public bool? IsPermanent { get; set; }

        public double? Salary { get; set; }

        public DateTime? JoiningDate { get; set; }

        public bool? IsRemoved { get; set; }

        public DateTime? RemovalDate { get; set; }

        [StringLength(100)]
        public string? Reason { get; set; }

        public int CompanyID { get; set; }

        public int? Counter { get; set; }

        public double? DA { get; set; }

        public bool? IsSalesman { get; set; }

        public int? DesignationId { get; set; }

        [ForeignKey(nameof(DesignationId))]
        public virtual Designation? Designation { get; set; }

        public int? UnderNameId { get; set; }
    }
}