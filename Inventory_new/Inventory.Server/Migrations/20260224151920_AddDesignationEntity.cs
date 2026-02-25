using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Inventory.Server.Migrations
{
    /// <inheritdoc />
    public partial class AddDesignationEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "Reference");

            migrationBuilder.EnsureSchema(
                name: "dbo");

            migrationBuilder.RenameTable(
                name: "Item",
                newName: "Item",
                newSchema: "Reference");

            migrationBuilder.CreateTable(
                name: "Account",
                columns: table => new
                {
                    AccountId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AccountName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Account", x => x.AccountId);
                });

            // migrationBuilder.CreateTable(
            //     name: "Brand",
            //     schema: "Reference",
            //     columns: table => new
            //     {
            //         BrandId = table.Column<int>(type: "int", nullable: false)
            //             .Annotation("SqlServer:Identity", "1, 1"),
            //         BrandName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
            //         UserId = table.Column<int>(type: "int", nullable: false),
            //         CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
            //         CompanyId = table.Column<int>(type: "int", nullable: false)
            //     },
            //     constraints: table =>
            //     {
            //         table.PrimaryKey("PK_Brand", x => x.BrandId);
            //     });

            // migrationBuilder.CreateTable(
            //     name: "CategoryGroup",
            //     schema: "Reference",
            //     columns: table => new
            //     {
            //         CategoryGroupId = table.Column<int>(type: "int", nullable: false)
            //             .Annotation("SqlServer:Identity", "1, 1"),
            //         CategoryGroupName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false)
            //     },
            //     constraints: table =>
            //     {
            //         table.PrimaryKey("PK_CategoryGroup", x => x.CategoryGroupId);
            //     });

            // migrationBuilder.CreateTable(
            //     name: "Designation",
            //     schema: "Reference",
            //     columns: table => new
            //     {
            //         DesignationId = table.Column<int>(type: "int", nullable: false)
            //             .Annotation("SqlServer:Identity", "1, 1"),
            //         DesignationName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
            //         FinancialYearId = table.Column<int>(type: "int", nullable: true)
            //     },
            //     constraints: table =>
            //     {
            //         table.PrimaryKey("PK_Designation", x => x.DesignationId);
            //     });

            // migrationBuilder.CreateTable(
            //     name: "Godown",
            //     schema: "Reference",
            //     columns: table => new
            //     {
            //         GodownID = table.Column<int>(type: "int", nullable: false)
            //             .Annotation("SqlServer:Identity", "1, 1"),
            //         GodownName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
            //         Location = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
            //         IsGodown = table.Column<bool>(type: "bit", nullable: true),
            //         VanRegNo = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
            //         Make = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
            //         Model = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
            //         Insurance = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
            //         InsuranceFrom = table.Column<DateTime>(type: "datetime2", nullable: true),
            //         InsuranceTo = table.Column<DateTime>(type: "datetime2", nullable: true),
            //         TaxFrom = table.Column<DateTime>(type: "datetime2", nullable: true),
            //         TaxTo = table.Column<DateTime>(type: "datetime2", nullable: true),
            //         IsClosed = table.Column<bool>(type: "bit", nullable: true),
            //         UserID = table.Column<int>(type: "int", nullable: false),
            //         UserDate = table.Column<DateTime>(type: "datetime2", nullable: false),
            //         CompanyID = table.Column<int>(type: "int", nullable: false)
            //     },
            //     constraints: table =>
            //     {
            //         table.PrimaryKey("PK_Godown", x => x.GodownID);
            //     });

            // migrationBuilder.CreateTable(
            //     name: "Unit",
            //     schema: "Reference",
            //     columns: table => new
            //     {
            //         UnitId = table.Column<int>(type: "int", nullable: false)
            //             .Annotation("SqlServer:Identity", "1, 1"),
            //         UnitName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
            //         Multiplier = table.Column<decimal>(type: "numeric(18,3)", nullable: true),
            //         UserId = table.Column<int>(type: "int", nullable: true),
            //         CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
            //         CompanyId = table.Column<int>(type: "int", nullable: false),
            //         CommissionSalesNo = table.Column<int>(type: "int", nullable: true)
            //     },
            //     constraints: table =>
            //     {
            //         table.PrimaryKey("PK_Unit", x => x.UnitId);
            //     });

            // migrationBuilder.CreateTable(
            //     name: "Category",
            //     schema: "Reference",
            //     columns: table => new
            //     {
            //         CategoryId = table.Column<int>(type: "int", nullable: false)
            //             .Annotation("SqlServer:Identity", "1, 1"),
            //         CategoryName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
            //         CategoryGroupId = table.Column<int>(type: "int", nullable: false),
            //         UserId = table.Column<int>(type: "int", nullable: false),
            //         CompanyId = table.Column<int>(type: "int", nullable: false),
            //         CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false)
            //     },
            //     constraints: table =>
            //     {
            //         table.PrimaryKey("PK_Category", x => x.CategoryId);
            //         table.ForeignKey(
            //             name: "FK_Category_CategoryGroup_CategoryGroupId",
            //             column: x => x.CategoryGroupId,
            //             principalSchema: "Reference",
            //             principalTable: "CategoryGroup",
            //             principalColumn: "CategoryGroupId",
            //             onDelete: ReferentialAction.Cascade);
            //     });

            // migrationBuilder.CreateTable(
            //     name: "EMPLOYEEMASTER",
            //     schema: "dbo",
            //     columns: table => new
            //     {
            //         EmpId = table.Column<int>(type: "int", nullable: false)
            //             .Annotation("SqlServer:Identity", "1, 1"),
            //         EmpCode = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false),
            //         EmpName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
            //         DOB = table.Column<DateTime>(type: "datetime2", nullable: true),
            //         Age = table.Column<int>(type: "int", nullable: true),
            //         GuardianName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
            //         Address1 = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
            //         Address2 = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
            //         Address3 = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
            //         PinCode = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
            //         Mobile = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
            //         EmailId = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
            //         IsPermanent = table.Column<bool>(type: "bit", nullable: true),
            //         Salary = table.Column<double>(type: "float", nullable: true),
            //         JoiningDate = table.Column<DateTime>(type: "datetime2", nullable: true),
            //         IsRemoved = table.Column<bool>(type: "bit", nullable: true),
            //         RemovalDate = table.Column<DateTime>(type: "datetime2", nullable: true),
            //         Reason = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
            //         CompanyID = table.Column<int>(type: "int", nullable: false),
            //         Counter = table.Column<int>(type: "int", nullable: true),
            //         DA = table.Column<double>(type: "float", nullable: true),
            //         IsSalesman = table.Column<bool>(type: "bit", nullable: true),
            //         DesignationId = table.Column<int>(type: "int", nullable: true),
            //         UnderNameId = table.Column<int>(type: "int", nullable: true)
            //     },
            //     constraints: table =>
            //     {
            //         table.PrimaryKey("PK_EMPLOYEEMASTER", x => x.EmpId);
            //         table.ForeignKey(
            //             name: "FK_EMPLOYEEMASTER_Designation_DesignationId",
            //             column: x => x.DesignationId,
            //             principalSchema: "Reference",
            //             principalTable: "Designation",
            //             principalColumn: "DesignationId");
            //     });

            migrationBuilder.CreateIndex(
                name: "IX_Category_CategoryGroupId",
                schema: "Reference",
                table: "Category",
                column: "CategoryGroupId");

            migrationBuilder.CreateIndex(
                name: "IX_EMPLOYEEMASTER_DesignationId",
                schema: "Reference",
                table: "EMPLOYEEMASTER",
                column: "DesignationId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Account");

            migrationBuilder.DropTable(
                name: "Brand",
                schema: "Reference");

            migrationBuilder.DropTable(
                name: "Category",
                schema: "Reference");

            migrationBuilder.DropTable(
                name: "EMPLOYEEMASTER",
                schema: "Reference");

            migrationBuilder.DropTable(
                name: "Godown",
                schema: "Reference");

            migrationBuilder.DropTable(
                name: "Unit",
                schema: "Reference");

            migrationBuilder.DropTable(
                name: "CategoryGroup",
                schema: "Reference");

            migrationBuilder.DropTable(
                name: "Designation",
                schema: "Reference");

            migrationBuilder.RenameTable(
                name: "Item",
                schema: "Reference",
                newName: "Item");
        }
    }
}
