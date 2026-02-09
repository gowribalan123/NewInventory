using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Inventory.Server.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AccountHead",
                columns: table => new
                {
                    AccountCode = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AccountName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    GroupUnder = table.Column<int>(type: "int", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: true),
                    UserDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    AccountType = table.Column<string>(type: "nvarchar(1)", maxLength: 1, nullable: true),
                    CompanyID = table.Column<int>(type: "int", nullable: false),
                    Address1 = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    Address2 = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    Address3 = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    Address4 = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    Pincode = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    PhoneNo = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    MobileNo = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    email = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: true),
                    TIN = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    CSTNo = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    GoodsType = table.Column<int>(type: "int", nullable: true),
                    CreditLimit = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    EmpId = table.Column<int>(type: "int", nullable: true),
                    DueDays = table.Column<int>(type: "int", nullable: true),
                    RouteID = table.Column<int>(type: "int", nullable: true),
                    FormID = table.Column<int>(type: "int", nullable: true),
                    Type = table.Column<int>(type: "int", nullable: true),
                    RateType = table.Column<int>(type: "int", nullable: true),
                    PurchaseSalesTypeId = table.Column<int>(type: "int", nullable: true),
                    CollAgentID = table.Column<int>(type: "int", nullable: true),
                    PartyType = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AccountHead", x => x.AccountCode);
                });

            migrationBuilder.CreateTable(
                name: "InventoryTransactions",
                columns: table => new
                {
                    TempId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    InventoryNo = table.Column<int>(type: "int", nullable: false),
                    BillCode = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: true),
                    InventoryDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    InventoryType = table.Column<string>(type: "nvarchar(2)", maxLength: 2, nullable: true),
                    SlNo = table.Column<int>(type: "int", nullable: true),
                    PurchaseNo = table.Column<int>(type: "int", nullable: true),
                    BatchNo = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    ItemID = table.Column<int>(type: "int", nullable: true),
                    UnitID = table.Column<int>(type: "int", nullable: true),
                    Multiplier = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Quantity = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    FreeQuantity = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    PurchaseRate = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    SalesRate = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    BillRate = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    BillQty = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    BillFreeQty = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    GrossAmount = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Discount = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    DiscountAmt = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    ExciseDuty = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    ExciseDutyAmt = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Tax = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    TaxAmount = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    RoundOff = table.Column<double>(type: "float", nullable: true),
                    OtherPur = table.Column<double>(type: "float", nullable: true),
                    ExpiryDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Total = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Mode = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: true),
                    TaxableHead = table.Column<int>(type: "int", nullable: true),
                    SalesmanGodownFlag = table.Column<bool>(type: "bit", nullable: false),
                    CancelFlag = table.Column<bool>(type: "bit", nullable: false),
                    CancelDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DefectiveFlag = table.Column<bool>(type: "bit", nullable: false),
                    FinancialYearID = table.Column<int>(type: "int", nullable: false),
                    isEstimate = table.Column<bool>(type: "bit", nullable: true),
                    TransType = table.Column<bool>(type: "bit", nullable: true),
                    Shortage = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    MRP = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Cess = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    AdjGrossAmount = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    BatchNo1 = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Quantity1 = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    BatchNo2 = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Quantity2 = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    BatchNo3 = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Quantity3 = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    FreeUnitId = table.Column<int>(type: "int", nullable: true),
                    FreeMultiplier = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    GodownID = table.Column<int>(type: "int", nullable: true),
                    CostPrice = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    ModelID = table.Column<int>(type: "int", nullable: true),
                    ReturnType = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Narration = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Services = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    GrandTotal = table.Column<decimal>(type: "decimal(18,2)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InventoryTransactions", x => x.TempId);
                });

            migrationBuilder.CreateTable(
                name: "Item",
                columns: table => new
                {
                    ItemId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ItemCode = table.Column<string>(type: "nvarchar(75)", maxLength: 75, nullable: true),
                    ItemName = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: true),
                    CategoryId = table.Column<int>(type: "int", nullable: true),
                    SizeId = table.Column<int>(type: "int", nullable: true),
                    CommodityCode = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: true),
                    CompanyNameID = table.Column<int>(type: "int", nullable: true),
                    SalesRate = table.Column<double>(type: "float", nullable: true),
                    SalesDiscount = table.Column<double>(type: "float", nullable: true),
                    PurchaseRate = table.Column<double>(type: "float", nullable: true),
                    PurchaseDiscount = table.Column<double>(type: "float", nullable: true),
                    ReorderLevel = table.Column<double>(type: "float", nullable: true),
                    MinimumLevel = table.Column<double>(type: "float", nullable: true),
                    DefaultSalesUnit = table.Column<int>(type: "int", nullable: true),
                    DefaultPurchaseUnit = table.Column<int>(type: "int", nullable: true),
                    SalesTaxHead = table.Column<int>(type: "int", nullable: true),
                    SalesTaxRate = table.Column<double>(type: "float", nullable: true),
                    PurchaseTaxHead = table.Column<int>(type: "int", nullable: true),
                    PurchaseTaxRate = table.Column<double>(type: "float", nullable: true),
                    CSTPurchaseTaxHead = table.Column<int>(type: "int", nullable: true),
                    CSTPurchaseTaxRate = table.Column<double>(type: "float", nullable: true),
                    UserID = table.Column<int>(type: "int", nullable: true),
                    UserDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CompanyID = table.Column<int>(type: "int", nullable: false),
                    Margin = table.Column<double>(type: "float", nullable: true),
                    ItemType = table.Column<int>(type: "int", nullable: true),
                    CategoryType = table.Column<int>(type: "int", nullable: true),
                    MRP = table.Column<double>(type: "float", nullable: true),
                    StockType = table.Column<bool>(type: "bit", nullable: true),
                    WholeSaleRate = table.Column<double>(type: "float", nullable: true),
                    InterStateRate = table.Column<double>(type: "float", nullable: true),
                    Rack = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    SalesPoint = table.Column<decimal>(type: "decimal(18,2)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Item", x => x.ItemId);
                });

            migrationBuilder.CreateTable(
                name: "PurchaseMaster",
                columns: table => new
                {
                    PurchaseNo = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PurchaseDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    PurchaseMode = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: true),
                    OrderNo = table.Column<int>(type: "int", nullable: true),
                    OrderDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    InvoiceNo = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: true),
                    InvoiceDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    GodownID = table.Column<int>(type: "int", nullable: true),
                    BillType = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: true),
                    PurchaseType = table.Column<int>(type: "int", nullable: true),
                    PartyID = table.Column<int>(type: "int", nullable: true),
                    PartyName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    Narration = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    Freight = table.Column<double>(type: "float", nullable: true),
                    Cess = table.Column<double>(type: "float", nullable: true),
                    LorryNo = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Cooli = table.Column<double>(type: "float", nullable: true),
                    TotalDiscount = table.Column<double>(type: "float", nullable: true),
                    AddDiscount = table.Column<double>(type: "float", nullable: true),
                    TotalExciseDuty = table.Column<double>(type: "float", nullable: true),
                    TotalTax = table.Column<double>(type: "float", nullable: true),
                    Totalamount = table.Column<double>(type: "float", nullable: true),
                    NetAmount = table.Column<double>(type: "float", nullable: true),
                    Roundoff = table.Column<double>(type: "float", nullable: true),
                    GrandTotal = table.Column<double>(type: "float", nullable: true),
                    UserId = table.Column<int>(type: "int", nullable: true),
                    UserDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    EditFlag = table.Column<bool>(type: "bit", nullable: false),
                    EditDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CancelFlag = table.Column<bool>(type: "bit", nullable: false),
                    CancelDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ReturnedFlag = table.Column<bool>(type: "bit", nullable: false),
                    FinancialYearID = table.Column<int>(type: "int", nullable: true),
                    isEstimate = table.Column<bool>(type: "bit", nullable: true),
                    CategoryType = table.Column<int>(type: "int", nullable: true),
                    FreightAfter = table.Column<bool>(type: "bit", nullable: true),
                    FormType = table.Column<int>(type: "int", nullable: true),
                    OtherCharges = table.Column<double>(type: "float", nullable: true),
                    CustomsDuty = table.Column<double>(type: "float", nullable: true),
                    Clearing = table.Column<double>(type: "float", nullable: true),
                    Unloading = table.Column<double>(type: "float", nullable: true),
                    OtherChargesBill = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    OtherChargesExtra = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    BENo = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    CashVoucherID = table.Column<int>(type: "int", nullable: true),
                    JournelVoucherID = table.Column<int>(type: "int", nullable: true),
                    BatchNo = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PurchaseMaster", x => x.PurchaseNo);
                });

            migrationBuilder.CreateTable(
                name: "SalesMaster",
                columns: table => new
                {
                    SalesID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SalesCode = table.Column<int>(type: "int", nullable: false),
                    SalesDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    OrderNo = table.Column<int>(type: "int", nullable: true),
                    OrderDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    SalesmanGodownFlag = table.Column<bool>(type: "bit", nullable: true),
                    BillType = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: true),
                    PartyID = table.Column<int>(type: "int", nullable: true),
                    AgentId = table.Column<int>(type: "int", nullable: true),
                    Narration = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    FormType = table.Column<int>(type: "int", nullable: true),
                    ItemType = table.Column<int>(type: "int", nullable: true),
                    SalesType = table.Column<int>(type: "int", nullable: true),
                    TotalDiscount = table.Column<double>(type: "float", nullable: true),
                    AddDiscount = table.Column<double>(type: "float", nullable: true),
                    TotalExciseDuty = table.Column<double>(type: "float", nullable: true),
                    TotalTax = table.Column<double>(type: "float", nullable: true),
                    Totalamount = table.Column<double>(type: "float", nullable: true),
                    NetAmount = table.Column<double>(type: "float", nullable: true),
                    Roundoff = table.Column<double>(type: "float", nullable: true),
                    GrandTotal = table.Column<double>(type: "float", nullable: true),
                    UserId = table.Column<int>(type: "int", nullable: true),
                    UserDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    EditFlag = table.Column<bool>(type: "bit", nullable: false),
                    EditDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CancelFlag = table.Column<bool>(type: "bit", nullable: false),
                    CancelDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ReturnedFlag = table.Column<bool>(type: "bit", nullable: false),
                    FinancialYearID = table.Column<int>(type: "int", nullable: true),
                    isEstimate = table.Column<bool>(type: "bit", nullable: true),
                    PartyName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    Cess = table.Column<double>(type: "float", nullable: true),
                    Address = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    OtherCharge = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    VoucherId = table.Column<int>(type: "int", nullable: true),
                    CashRecieved = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    CashBalance = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    PendingAmt = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    RateType = table.Column<int>(type: "int", nullable: true),
                    Narration1 = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    GodownID = table.Column<int>(type: "int", nullable: true),
                    Address2 = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    PONo = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    PODate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    OtherChargesBill = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    OtherChargesExtra = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    CashVoucherID = table.Column<int>(type: "int", nullable: true),
                    JournelVoucherID = table.Column<int>(type: "int", nullable: true),
                    Counter = table.Column<int>(type: "int", nullable: true),
                    TotalPoint = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    PhoneNo = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    SCODE = table.Column<int>(type: "int", nullable: true),
                    UPIAmount = table.Column<double>(type: "float", nullable: true),
                    CardAmount = table.Column<double>(type: "float", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SalesMaster", x => x.SalesID);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AccountHead");

            migrationBuilder.DropTable(
                name: "InventoryTransactions");

            migrationBuilder.DropTable(
                name: "Item");

            migrationBuilder.DropTable(
                name: "PurchaseMaster");

            migrationBuilder.DropTable(
                name: "SalesMaster");
        }
    }
}
