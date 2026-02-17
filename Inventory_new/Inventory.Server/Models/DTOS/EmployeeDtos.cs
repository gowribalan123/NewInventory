using System.ComponentModel.DataAnnotations;

namespace Inventory.Server.Dtos
{
    public class EmployeeDto
    {
        public int EmpId { get; set; }
        public string EmpCode { get; set; } = null!;
        public string EmpName { get; set; } = null!;
        public string? Mobile { get; set; }
        public string? Designation { get; set; }
        public string? Address1 { get; set; }
        public string? Address2 { get; set; }
        public string? Address3 { get; set; }
        public string? PinCode { get; set; }
        public string? EmailId { get; set; }
        public double? Salary { get; set; }
        public bool? IsSalesman { get; set; }
        public bool? IsRemoved { get; set; }
    }

    public class CreateEmployeeDto
    {
        [Required]
        [StringLength(10)]
        public string EmpCode { get; set; } = null!;

        [Required]
        [StringLength(100)]
        public string EmpName { get; set; } = null!;

        public DateTime? DOB { get; set; }
        public int? Age { get; set; }
        public string? GuardianName { get; set; }
        public string? Address1 { get; set; }
        public string? Address2 { get; set; }
        public string? Address3 { get; set; }
        public string? PinCode { get; set; }
        public string? Mobile { get; set; }
        public string? EmailId { get; set; }
        public bool? IsPermanent { get; set; }
        public string? Designation { get; set; }
        public double? Salary { get; set; }
        public DateTime? JoiningDate { get; set; }
        public bool? IsRemoved { get; set; }
        public int CompanyID { get; set; }
        public bool? IsSalesman { get; set; }
        public int? DesignationId { get; set; }
    }

    public class UpdateEmployeeDto
    {
        [StringLength(10)]
        public string? EmpCode { get; set; }
        [StringLength(100)]
        public string? EmpName { get; set; }
        public DateTime? DOB { get; set; }
        public int? Age { get; set; }
        public string? GuardianName { get; set; }
        public string? Address1 { get; set; }
        public string? Address2 { get; set; }
        public string? Address3 { get; set; }
        public string? PinCode { get; set; }
        public string? Mobile { get; set; }
        public string? EmailId { get; set; }
        public bool? IsPermanent { get; set; }
        public string? Designation { get; set; }
        public double? Salary { get; set; }
        public DateTime? JoiningDate { get; set; }
        public bool? IsRemoved { get; set; }
        public bool? IsSalesman { get; set; }
        public int? DesignationId { get; set; }
    }
}