-- ============================================
-- CREATE NEW DATABASE WITH ORGANIZED STRUCTURE
-- ============================================

 
-- Create new database with organized naming
CREATE DATABASE [Inventory]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'Inventory', FILENAME = N'D:\Program Files\MSSQL\DATA\Inventory.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'Inventory_log', FILENAME = N'D:\Program Files\MSSQL\DATA\Inventory_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO

USE [Inventory]
GO

-- ============================================
-- CREATE SCHEMAS FOR BETTER ORGANIZATION
-- ============================================

CREATE SCHEMA [Core]          -- Core business entities
GO
CREATE SCHEMA [Transaction]   -- Transactional data
GO
CREATE SCHEMA [Inventory]     -- Inventory operations
GO
CREATE SCHEMA [Accounting]    -- Accounting operations
GO
CREATE SCHEMA [Reference]     -- Reference/lookup data
GO
CREATE SCHEMA [Configuration] -- System configuration
GO
CREATE SCHEMA [Security]      -- Security and access control
GO
CREATE SCHEMA [Production]    -- Production module
GO
CREATE SCHEMA [View]          -- All views
GO
CREATE SCHEMA [Function]      -- All functions
GO

-- ============================================
-- CORE BUSINESS ENTITIES (Main Tables)
-- ============================================

-- Company and Organization
CREATE TABLE [Core].[Company](
    [CompanyId] [int] IDENTITY(1,1) NOT FOR REPLICATION NOT NULL,
    [CompanyName] [varchar](100) NOT NULL,
    [Address1] [varchar](100) NULL,
    [Address2] [varchar](100) NULL,
    [Address3] [varchar](100) NULL,
    [PinCode] [char](10) NULL,
    [PhoneOffice] [varchar](100) NULL,
    [PhoneResidence] [varchar](100) NULL,
    [Email] [char](50) NULL,
    [Website] [char](50) NULL,
    [IncomeTaxNo] [char](20) NULL,
    [SalesTaxNo] [char](20) NULL,
    [ServiceTaxNo] [char](20) NULL,
    [Currency] [char](20) NULL,
    [BaseCurrency] [char](20) NULL,
    [CurrencySymbol] [char](20) NULL,
    [CompanyType] [tinyint] NOT NULL,
    [AllowBarcode] [bit] NULL,
    [IsSalesMultiGodown] [bit] NULL,
    [IsPurchaseMultiGodown] [bit] NULL,
    [IsItemCodeVisible] [bit] NULL,
    [IsItemCodeTyping] [bit] NULL,
    [AllowSalesPoint] [bit] NULL,
    [BarcodeType] [int] NULL,
    [SalesBillFormat] [int] NULL
) ON [PRIMARY]brand



GO

-- Financial Year
CREATE TABLE [Core].[FinancialYear](
    [FinancialYearId] [int] IDENTITY(1,1) NOT FOR REPLICATION NOT NULL,
    [CompanyId] [int] NOT NULL,
    [FromDate] [datetime] NULL,
    [ToDate] [datetime] NULL,
    [IsDefault] [bit] NOT NULL
) ON [PRIMARY]
GO

-- Account Group Structure
CREATE TABLE [Core].[AccountGroup](
    [GroupId] [int] IDENTITY(1,1) NOT FOR REPLICATION NOT NULL,
    [GroupName] [char](100) NULL,
    [ParentGroupId] [int] NOT NULL,
    [IsBalanceSheet] [bit] NOT NULL,
    [UserId] [int] NULL,
    [CreatedDate] [datetime] NULL,
    [CompanyId] [int] NOT NULL,
    [GroupLevel] [int] NULL,
    [GroupPosition] [int] NULL,
    [GroupType] [int] NULL
) ON [PRIMARY]
GO

-- Chart of Accounts/Party Master
CREATE TABLE [Core].[Account](
    [AccountId] [int] IDENTITY(1,1) NOT FOR REPLICATION NOT NULL,
    [AccountName] [char](100) NOT NULL,
    [GroupId] [int] NOT NULL,
    [UserId] [int] NULL,
    [CreatedDate] [datetime] NULL,
    [AccountType] [char](1) NULL,
    [CompanyId] [int] NOT NULL,
    [Address1] [char](100) NULL,
    [Address2] [char](100) NULL,
    [Address3] [char](100) NULL,
    [Address4] [char](100) NULL,
    [PinCode] [char](20) NULL,
    [PhoneNo] [char](100) NULL,
    [MobileNo] [char](100) NULL,
    [Email] [char](30) NULL,
    [TIN] [char](50) NULL,
    [CSTNo] [char](50) NULL,
    [GoodsType] [int] NULL,
    [CreditLimit] [decimal](18, 2) NULL,
    [EmployeeId] [int] NULL,
    [DueDays] [int] NULL,
    [RouteId] [int] NULL,
    [FormId] [int] NULL,
    [AccountTypeId] [int] NULL,
    [RateType] [int] NULL,
    [PurchaseSalesTypeId] [int] NULL,
    [CollectionAgentId] [int] NULL,
    [PartyType] [int] NULL
) ON [PRIMARY]
GO

-- Product/Item Master
CREATE TABLE [Core].[Product](
    [ProductId] [int] IDENTITY(1,1) NOT FOR REPLICATION NOT NULL,
    [ProductCode] [varchar](75) NULL,
    [ProductName] [varchar](150) NULL,
    [CategoryId] [int] NULL,
    [SizeId] [int] NULL,
    [CommodityCode] [char](30) NULL,
    [BrandId] [int] NULL,
    [SalesRate] [float] NULL,
    [SalesDiscount] [float] NULL,
    [PurchaseRate] [float] NULL,
    [PurchaseDiscount] [float] NULL,
    [ReorderLevel] [float] NULL,
    [MinimumLevel] [float] NULL,
    [DefaultSalesUnitId] [int] NULL,
    [DefaultPurchaseUnitId] [int] NULL,
    [SalesTaxHead] [int] NULL,
    [SalesTaxRate] [float] NULL,
    [PurchaseTaxHead] [int] NULL,
    [PurchaseTaxRate] [float] NULL,
    [CSTPurchaseTaxHead] [int] NULL,
    [CSTPurchaseTaxRate] [float] NULL,
    [UserId] [int] NULL,
    [CreatedDate] [datetime] NULL,
    [CompanyId] [int] NOT NULL,
    [Margin] [float] NULL,
    [ProductType] [int] NULL,
    [CategoryType] [int] NULL,
    [MRP] [float] NULL,
    [IsStockItem] [bit] NULL,
    [WholeSaleRate] [float] NULL,
    [InterStateRate] [float] NULL,
    [Rack] [varchar](50) NULL,
    [SalesPoint] [decimal](18, 2) NULL
) ON [PRIMARY]
GO

-- Warehouse/Storage Locations
CREATE TABLE [Core].[Warehouse](
    [WarehouseId] [int] IDENTITY(1,1) NOT FOR REPLICATION NOT NULL,
    [WarehouseName] [char](100) NULL,
    [Location] [char](100) NULL,
    [IsWarehouse] [bit] NULL,
    [VehicleRegNo] [char](100) NULL,
    [Make] [char](100) NULL,
    [Model] [char](100) NULL,
    [Insurance] [char](100) NULL,
    [InsuranceFrom] [datetime] NULL,
    [InsuranceTo] [datetime] NULL,
    [TaxFrom] [datetime] NULL,
    [TaxTo] [datetime] NULL,
    [IsClosed] [bit] NULL,
    [UserId] [int] NOT NULL,
    [CreatedDate] [datetime] NOT NULL,
    [CompanyId] [int] NOT NULL
) ON [PRIMARY]
GO

-- Employee Master
CREATE TABLE [Core].[Employee](
    [EmployeeId] [int] IDENTITY(1,1) NOT FOR REPLICATION NOT NULL,
    [EmployeeCode] [char](10) NOT NULL,
    [EmployeeName] [char](100) NOT NULL,
    [DateOfBirth] [datetime] NULL,
    [Age] [int] NULL,
    [GuardianName] [char](100) NULL,
    [Address1] [char](100) NULL,
    [Address2] [char](100) NULL,
    [Address3] [char](100) NULL,
    [PinCode] [char](20) NULL,
    [PhoneResidence] [char](20) NULL,
    [Mobile] [char](20) NULL,
    [Email] [char](50) NULL,
    [IsPermanent] [bit] NULL,
    [Designation] [char](100) NULL,
    [Salary] [float] NULL,
    [JoiningDate] [datetime] NULL,
    [IsRemoved] [bit] NULL,
    [RemovalDate] [datetime] NULL,
    [Reason] [char](100) NULL,
    [CompanyId] [int] NOT NULL,
    [Counter] [int] NULL,
    [DA] [float] NULL,
    [IsSalesman] [bit] NULL,
    [DesignationId] [int] NULL,
    [SupervisorId] [int] NULL
) ON [PRIMARY]
GO

-- Bank Account Details
CREATE TABLE [Core].[BankAccount](
    [BankAccountId] [int] IDENTITY(1,1) NOT FOR REPLICATION NOT NULL,
    [AccountId] [int] NOT NULL,
    [BankName] [char](100) NOT NULL,
    [Address1] [char](100) NULL,
    [Address2] [char](100) NULL,
    [Address3] [char](100) NULL,
    [Address4] [char](100) NULL,
    [AccountNo] [char](20) NULL,
    [AccountType] [char](20) NULL,
    [PhoneNo] [char](100) NULL,
    [UserId] [int] NULL,
    [CreatedDate] [datetime] NULL,
    [CompanyId] [int] NULL
) ON [PRIMARY]
GO

-- ============================================
-- SALES TRANSACTIONS
-- ============================================

-- Sales Invoice Header
CREATE TABLE [Transaction].[SalesInvoice](
    [SalesInvoiceId] [int] IDENTITY(1,1) NOT FOR REPLICATION NOT NULL,
    [InvoiceNo] [int] NOT NULL,
    [InvoiceDate] [datetime] NULL,
    [OrderNo] [int] NULL,
    [OrderDate] [datetime] NULL,
    [IsSalesmanWarehouse] [bit] NULL,
    [PaymentType] [char](10) NULL,
    [CustomerId] [int] NULL,
    [AgentId] [int] NULL,
    [Narration] [char](100) NULL,
    [FormType] [int] NULL,
    [ItemType] [int] NULL,
    [SalesType] [int] NULL,
    [TotalDiscount] [float] NULL,
    [AdditionalDiscount] [float] NULL,
    [TotalExciseDuty] [float] NULL,
    [TotalTax] [float] NULL,
    [TotalAmount] [float] NULL,
    [NetAmount] [float] NULL,
    [RoundOff] [float] NULL,
    [GrandTotal] [float] NULL,
    [UserId] [int] NULL,
    [CreatedDate] [datetime] NULL,
    [IsEdited] [bit] NOT NULL,
    [EditDate] [datetime] NULL,
    [IsCancelled] [bit] NOT NULL,
    [CancelDate] [datetime] NULL,
    [IsReturned] [bit] NOT NULL,
    [FinancialYearId] [int] NULL,
    [IsEstimate] [bit] NULL,
    [CustomerName] [char](100) NULL,
    [Cess] [float] NULL,
    [Address] [varchar](100) NULL,
    [OtherCharges] [decimal](18, 2) NULL,
    [VoucherId] [int] NULL,
    [CashReceived] [decimal](18, 2) NULL,
    [CashBalance] [decimal](18, 2) NULL,
    [PendingAmount] [decimal](18, 2) NULL,
    [RateType] [int] NULL,
    [Narration1] [varchar](100) NULL,
    [WarehouseId] [int] NULL,
    [Address2] [varchar](100) NULL,
    [PONumber] [varchar](20) NULL,
    [PODate] [datetime] NULL,
    [OtherChargesBill] [decimal](18, 3) NULL,
    [OtherChargesExtra] [decimal](18, 3) NULL,
    [CashVoucherId] [int] NULL,
    [JournalVoucherId] [int] NULL,
    [Counter] [int] NULL,
    [TotalPoints] [decimal](18, 2) NULL,
    [PhoneNo] [varchar](100) NULL,
    [SCode] [int] NULL,
    [UPIAmount] [float] NULL,
    [CardAmount] [float] NULL
) ON [PRIMARY]
GO

-- Sales Invoice Line Items
CREATE TABLE [Transaction].[SalesInvoiceDetail](
    [SalesInvoiceDetailId] [int] IDENTITY(1,1) NOT FOR REPLICATION NOT NULL,
    [SalesInvoiceId] [int] NOT NULL,
    [LineNo] [int] NULL,
    [ProductId] [int] NULL,
    [UnitId] [int] NULL,
    [Multiplier] [decimal](18, 3) NULL,
    [Quantity] [decimal](18, 3) NULL,
    [FreeQuantity] [decimal](18, 3) NULL,
    [PurchaseRate] [decimal](18, 2) NULL,
    [SalesRate] [decimal](18, 2) NULL,
    [InvoiceRate] [decimal](18, 2) NULL,
    [InvoiceQuantity] [decimal](18, 3) NULL,
    [InvoiceFreeQuantity] [decimal](18, 3) NULL,
    [GrossAmount] [decimal](18, 2) NULL,
    [DiscountPercent] [decimal](18, 2) NULL,
    [DiscountAmount] [decimal](18, 2) NULL,
    [TaxPercent] [decimal](18, 2) NULL,
    [TaxAmount] [decimal](18, 2) NULL,
    [RoundOff] [float] NULL,
    [ExpiryDate] [datetime] NULL,
    [TotalAmount] [decimal](18, 2) NULL,
    [Mode] [char](10) NULL,
    [TaxableHead] [int] NULL,
    [IsSalesmanWarehouse] [bit] NOT NULL,
    [IsCancelled] [bit] NOT NULL,
    [CancelDate] [datetime] NULL,
    [IsDefective] [bit] NOT NULL,
    [FinancialYearId] [int] NOT NULL,
    [IsEstimate] [bit] NULL,
    [TransactionType] [bit] NULL,
    [Shortage] [decimal](18, 2) NULL,
    [MRP] [decimal](18, 2) NULL,
    [Cess] [decimal](18, 2) NULL,
    [AdjustedGrossAmount] [decimal](18, 2) NULL,
    [BatchNo1] [varchar](50) NULL,
    [Quantity1] [decimal](18, 3) NULL,
    [BatchNo2] [varchar](50) NULL,
    [Quantity2] [decimal](18, 3) NULL,
    [BatchNo3] [varchar](50) NULL,
    [Quantity3] [decimal](18, 3) NULL,
    [FreeUnitId] [int] NULL,
    [FreeMultiplier] [decimal](18, 2) NULL,
    [WarehouseId] [int] NULL,
    [SalesPoints] [decimal](18, 2) NULL,
    [TotalPoints] [decimal](18, 2) NULL
) ON [PRIMARY]
GO

-- Sales Return
CREATE TABLE [Transaction].[SalesReturn](
    [SalesReturnId] [int] IDENTITY(1,1) NOT FOR REPLICATION NOT NULL,
    [ReturnNo] [int] NULL,
    [ReturnDate] [datetime] NULL,
    [SalesInvoiceId] [int] NULL,
    [PaymentType] [char](10) NULL,
    [NetAmount] [float] NULL,
    [UserId] [int] NULL,
    [CreatedDate] [datetime] NULL,
    [IsEdited] [bit] NULL,
    [EditDate] [datetime] NULL,
    [FinancialYearId] [int] NULL,
    [IsEstimate] [bit] NULL,
    [Cess] [decimal](18, 2) NULL,
    [SalesType] [int] NULL,
    [CustomerId] [int] NULL,
    [TotalTax] [decimal](18, 2) NULL,
    [TotalAmount] [decimal](18, 2) NULL,
    [ItemType] [int] NULL,
    [WarehouseId] [int] NULL,
    [TotalPoints] [decimal](18, 2) NULL
) ON [PRIMARY]
GO

-- Opening Sales Balance
CREATE TABLE [Transaction].[SalesOpeningBalance](
    [SalesOpeningId] [int] IDENTITY(1,1) NOT FOR REPLICATION NOT NULL,
    [InvoiceDate] [datetime] NULL,
    [InvoiceNo] [char](10) NULL,
    [CustomerId] [int] NULL,
    [PaymentType] [char](10) NULL,
    [GrandTotal] [float] NULL,
    [UserId] [int] NULL,
    [CreatedDate] [datetime] NULL,
    [FinancialYearId] [int] NULL,
    [Counter] [int] NULL,
    [Narration] [varchar](200) NULL
) ON [PRIMARY]
GO

-- ============================================
-- PURCHASE TRANSACTIONS
-- ============================================

-- Purchase Invoice Header
CREATE TABLE [Transaction].[PurchaseInvoice](
    [PurchaseInvoiceId] [int] IDENTITY(1,1) NOT FOR REPLICATION NOT NULL,
    [PurchaseDate] [datetime] NULL,
    [PurchaseMode] [char](10) NULL,
    [OrderNo] [int] NULL,
    [OrderDate] [datetime] NULL,
    [SupplierInvoiceNo] [char](30) NULL,
    [SupplierInvoiceDate] [datetime] NULL,
    [WarehouseId] [int] NULL,
    [PaymentType] [char](10) NULL,
    [PurchaseType] [int] NULL,
    [SupplierId] [int] NULL,
    [SupplierName] [char](100) NULL,
    [Narration] [char](100) NULL,
    [Freight] [float] NULL,
    [Cess] [float] NULL,
    [VehicleNo] [char](50) NULL,
    [Coolie] [float] NULL,
    [TotalDiscount] [float] NULL,
    [AdditionalDiscount] [float] NULL,
    [TotalExciseDuty] [float] NULL,
    [TotalTax] [float] NULL,
    [TotalAmount] [float] NULL,
    [NetAmount] [float] NULL,
    [RoundOff] [float] NULL,
    [GrandTotal] [float] NULL,
    [UserId] [int] NULL,
    [CreatedDate] [datetime] NULL,
    [IsEdited] [bit] NOT NULL,
    [EditDate] [datetime] NULL,
    [IsCancelled] [bit] NOT NULL,
    [CancelDate] [datetime] NULL,
    [IsReturned] [bit] NOT NULL,
    [FinancialYearId] [int] NULL,
    [IsEstimate] [bit] NULL,
    [CategoryType] [int] NULL,
    [IsFreightAfter] [bit] NULL,
    [FormType] [int] NULL,
    [OtherCharges] [float] NULL,
    [CustomsDuty] [float] NULL,
    [Clearing] [float] NULL,
    [Unloading] [float] NULL,
    [OtherChargesBill] [decimal](18, 3) NULL,
    [OtherChargesExtra] [decimal](18, 3) NULL,
    [BENo] [varchar](50) NULL,
    [CashVoucherId] [int] NULL,
    [JournalVoucherId] [int] NULL,
    [BatchNo] [varchar](50) NULL
) ON [PRIMARY]
GO

-- Purchase Return
CREATE TABLE [Transaction].[PurchaseReturn](
    [PurchaseReturnId] [int] IDENTITY(1,1) NOT FOR REPLICATION NOT NULL,
    [ReturnNo] [int] NULL,
    [ReturnDate] [datetime] NULL,
    [PurchaseInvoiceId] [int] NULL,
    [PaymentType] [char](10) NULL,
    [NetAmount] [float] NULL,
    [UserId] [int] NULL,
    [CreatedDate] [datetime] NULL,
    [IsEdited] [bit] NULL,
    [EditDate] [datetime] NULL,
    [FinancialYearId] [int] NULL,
    [IsEstimate] [bit] NULL,
    [Cess] [decimal](18, 2) NULL,
    [SupplierId] [int] NULL,
    [PurchaseType] [int] NULL,
    [ReturnMode] [varchar](2) NULL,
    [TotalTax] [decimal](18, 2) NULL,
    [WarehouseId] [int] NULL
) ON [PRIMARY]
GO

-- Opening Purchase Balance
CREATE TABLE [Transaction].[PurchaseOpeningBalance](
    [PurchaseOpeningId] [int] IDENTITY(1,1) NOT FOR REPLICATION NOT NULL,
    [SupplierInvoiceNo] [char](30) NULL,
    [SupplierInvoiceDate] [datetime] NULL,
    [SupplierId] [int] NULL,
    [PaymentType] [char](10) NULL,
    [GrandTotal] [float] NULL,
    [PurchaseMode] [char](10) NULL,
    [UserId] [int] NULL,
    [CreatedDate] [datetime] NULL,
    [FinancialYearId] [int] NULL,
    [Counter] [int] NULL,
    [Narration] [varchar](200) NULL
) ON [PRIMARY]
GO

-- ============================================
-- INVENTORY TRANSACTIONS
-- ============================================

-- Stock Ledger (Combined Inventory Transactions)
CREATE TABLE [Inventory].[StockLedger](
    [TransactionId] [bigint] IDENTITY(1,1) NOT FOR REPLICATION NOT NULL,
    [DocumentId] [int] NOT NULL,
    [DocumentNo] [char](30) NULL,
    [TransactionDate] [datetime] NULL,
    [TransactionType] [char](2) NULL,
    [LineNo] [int] NULL,
    [ReferenceNo] [int] NULL,
    [BatchNo] [varchar](50) NULL,
    [ProductId] [int] NULL,
    [UnitId] [int] NULL,
    [Multiplier] [decimal](18, 3) NULL,
    [Quantity] [decimal](18, 3) NULL,
    [FreeQuantity] [decimal](18, 3) NULL,
    [PurchaseRate] [decimal](18, 2) NULL,
    [SalesRate] [decimal](18, 2) NULL,
    [InvoiceRate] [decimal](18, 2) NULL,
    [InvoiceQuantity] [decimal](18, 3) NULL,
    [InvoiceFreeQuantity] [decimal](18, 3) NULL,
    [GrossAmount] [decimal](18, 2) NULL,
    [DiscountPercent] [decimal](18, 2) NULL,
    [DiscountAmount] [decimal](18, 2) NULL,
    [TaxPercent] [decimal](18, 2) NULL,
    [TaxAmount] [decimal](18, 2) NULL,
    [RoundOff] [float] NULL,
    [ExpiryDate] [datetime] NULL,
    [TotalAmount] [decimal](18, 2) NULL,
    [Mode] [char](10) NULL,
    [TaxableHead] [int] NULL,
    [IsSalesmanWarehouse] [bit] NOT NULL,
    [IsCancelled] [bit] NOT NULL,
    [CancelDate] [datetime] NULL,
    [IsDefective] [bit] NOT NULL,
    [FinancialYearId] [int] NOT NULL,
    [IsEstimate] [bit] NULL,
    [TransactionFlow] [bit] NULL,
    [Shortage] [decimal](18, 2) NULL,
    [MRP] [decimal](18, 2) NULL,
    [Cess] [decimal](18, 2) NULL,
    [AdjustedGrossAmount] [decimal](18, 2) NULL,
    [BatchNo1] [varchar](50) NULL,
    [Quantity1] [decimal](18, 3) NULL,
    [BatchNo2] [varchar](50) NULL,
    [Quantity2] [decimal](18, 3) NULL,
    [BatchNo3] [varchar](50) NULL,
    [Quantity3] [decimal](18, 3) NULL,
    [FreeUnitId] [int] NULL,
    [FreeMultiplier] [decimal](18, 2) NULL,
    [WarehouseId] [int] NULL,
    [CostPrice] [decimal](18, 2) NULL,
    [ModelId] [int] NULL,
    [ReturnType] [varchar](50) NULL,
    [Narration] [varchar](50) NULL,
    [Services] [decimal](18, 2) NULL,
    [GrandTotal] [decimal](18, 2) NULL
) ON [PRIMARY]
GO

-- Opening Stock
CREATE TABLE [Inventory].[OpeningStock](
    [OpeningStockId] [int] IDENTITY(1,1) NOT FOR REPLICATION NOT NULL,
    [OpeningNo] [int] NULL,
    [OpeningDate] [datetime] NULL,
    [TotalStockValue] [float] NULL,
    [WarehouseId] [int] NULL,
    [UserId] [int] NULL,
    [CreatedDate] [datetime] NULL,
    [IsEdited] [bit] NOT NULL,
    [FinancialYearId] [int] NULL,
    [IsEstimate] [bit] NULL
) ON [PRIMARY]
GO

CREATE TABLE [Inventory].[OpeningStockDetail](
    [OpeningStockDetailId] [int] IDENTITY(1,1) NOT FOR REPLICATION NOT NULL,
    [OpeningStockId] [int] NOT NULL,
    [BatchNo] [char](10) NULL,
    [ProductId] [int] NOT NULL,
    [UnitId] [int] NULL,
    [Multiplier] [float] NULL,
    [ExpiryDate] [datetime] NULL,
    [GoodQuantity] [decimal](18, 3) NULL,
    [DefectiveQuantity] [decimal](18, 3) NULL,
    [PurchaseRate] [float] NULL,
    [SalesRate] [float] NULL,
    [TaxPercent] [float] NULL,
    [TaxHead] [int] NULL,
    [FinancialYearId] [int] NULL,
    [IsEstimate] [bit] NULL,
    [WarehouseId] [int] NULL
) ON [PRIMARY]
GO

-- Stock Adjustment
CREATE TABLE [Inventory].[StockAdjustment](
    [AdjustmentId] [int] IDENTITY(1,1) NOT FOR REPLICATION NOT NULL,
    [AdjustmentNo] [int] NULL,
    [AdjustmentDate] [datetime] NULL,
    [AdjustmentType] [char](10) NULL,
    [PartyId] [int] NULL,
    [Discount] [float] NULL,
    [AdditionalDiscount] [float] NULL,
    [NetAmount] [float] NULL,
    [WarehouseId] [int] NULL,
    [UserId] [int] NULL,
    [CreatedDate] [datetime] NULL,
    [IsEdited] [bit] NULL,
    [EditDate] [datetime] NULL,
    [FinancialYearId] [int] NULL,
    [Counter] [int] NULL,
    [Narration] [varchar](50) NULL,
    [StockType] [int] NULL
) ON [PRIMARY]
GO

-- Stock Transfer
CREATE TABLE [Inventory].[StockTransfer](
    [TransferId] [int] IDENTITY(1,1) NOT FOR REPLICATION NOT NULL,
    [TransferNo] [int] NOT NULL,
    [TransferDate] [datetime] NULL,
    [FromWarehouseId] [int] NULL,
    [ToWarehouseId] [int] NULL,
    [UserId] [int] NULL,
    [CreatedDate] [datetime] NULL,
    [IsCancelled] [bit] NOT NULL,
    [CancelDate] [datetime] NULL,
    [FinancialYearId] [int] NULL,
    [Counter] [int] NULL,
    [IsEstimate] [int] NULL
) ON [PRIMARY]
GO

CREATE TABLE [Inventory].[StockTransferDetail](
    [TransferDetailId] [int] IDENTITY(1,1) NOT NULL,
    [TransferId] [int] NULL,
    [ProductId] [int] NULL,
    [Quantity] [float] NULL,
    [FinancialYearId] [int] NULL,
    [IsDefective] [bit] NULL,
    [Rate] [decimal](18, 2) NULL,
    [LineNo] [int] NULL,
    [UnitId] [int] NULL,
    [Multiplier] [float] NULL,
    [BatchNo] [char](50) NULL,
    [Total] [decimal](18, 2) NULL
) ON [PRIMARY]
GO

-- ============================================
-- ACCOUNTING TRANSACTIONS
-- ============================================

-- General Ledger Transactions
CREATE TABLE [Accounting].[GeneralLedger](
    [TransactionId] [int] IDENTITY(1,1) NOT FOR REPLICATION NOT NULL,
    [TransactionDate] [datetime] NULL,
    [DocumentId] [int] NOT NULL,
    [DocumentNo] [char](30) NULL,
    [DocumentType] [char](2) NOT NULL,
    [AccountId] [int] NOT NULL,
    [Amount] [decimal](18, 2) NOT NULL,
    [Narration] [char](100) NULL,
    [Particulars] [char](100) NULL,
    [IsCancelled] [bit] NULL,
    [CancelDate] [datetime] NULL,
    [UserId] [int] NULL,
    [CreatedDate] [datetime] NULL,
    [FinancialYearId] [int] NULL,
    [IsEstimate] [bit] NULL,
    [CommissionSalesNo] [int] NULL,
    [IsOpeningCommissionStock] [bit] NULL
) ON [PRIMARY]
GO

-- Opening Account Balances
CREATE TABLE [Accounting].[OpeningBalance](
    [OpeningBalanceId] [int] IDENTITY(1,1) NOT FOR REPLICATION NOT NULL,
    [AccountId] [int] NULL,
    [Amount] [float] NULL,
    [UserId] [int] NULL,
    [CreatedDate] [datetime] NULL,
    [FinancialYearId] [int] NULL,
    [IsEstimate] [bit] NULL
) ON [PRIMARY]
GO

-- Cash Transactions
CREATE TABLE [Accounting].[CashTransaction](
    [CashTransactionId] [int] IDENTITY(1,1) NOT FOR REPLICATION NOT NULL,
    [TransactionNo] [int] NULL,
    [TransactionDate] [datetime] NULL,
    [TransactionType] [bit] NULL,
    [Remarks] [varchar](100) NULL,
    [PartyId] [int] NULL,
    [Amount] [float] NULL,
    [UserId] [int] NULL,
    [CreatedDate] [datetime] NULL,
    [FinancialYearId] [int] NULL,
    [IsEdited] [bit] NOT NULL,
    [IsEstimate] [bit] NULL
) ON [PRIMARY]
GO

-- Bank Transactions
CREATE TABLE [Accounting].[BankTransaction](
    [BankTransactionId] [int] IDENTITY(1,1) NOT FOR REPLICATION NOT NULL,
    [TransactionNo] [int] NULL,
    [TransactionDate] [datetime] NULL,
    [TransactionType] [bit] NULL,
    [Remarks] [varchar](100) NULL,
    [BankAccountId] [int] NULL,
    [PartyId] [int] NULL,
    [ChequeNo] [char](50) NULL,
    [ChequeDate] [datetime] NULL,
    [BankName] [char](50) NULL,
    [Amount] [float] NULL,
    [IsCleared] [bit] NOT NULL,
    [IsBounced] [bit] NOT NULL,
    [ClearingDate] [datetime] NULL,
    [UserId] [int] NULL,
    [CreatedDate] [datetime] NULL,
    [FinancialYearId] [int] NULL,
    [IsEdited] [bit] NOT NULL,
    [IsEstimate] [bit] NULL
) ON [PRIMARY]
GO

-- Journal Voucher
CREATE TABLE [Accounting].[JournalVoucher](
    [JournalVoucherId] [int] IDENTITY(1,1) NOT FOR REPLICATION NOT NULL,
    [VoucherNo] [int] NULL,
    [VoucherDate] [datetime] NULL,
    [Remarks] [varchar](100) NULL,
    [UserId] [int] NULL,
    [CreatedDate] [datetime] NULL,
    [FinancialYearId] [int] NULL,
    [IsEdited] [bit] NOT NULL,
    [IsEstimate] [bit] NULL,
    [Narration] [varchar](100) NULL
) ON [PRIMARY]
GO

-- ============================================
-- PRODUCTION MODULE
-- ============================================

-- Production Order
CREATE TABLE [Production].[ProductionOrder](
    [ProductionOrderId] [int] IDENTITY(1,1) NOT FOR REPLICATION NOT NULL,
    [ProductionNo] [char](30) NULL,
    [RawMaterialId] [int] NOT NULL,
    [RawMaterialQuantity] [float] NOT NULL,
    [RawMaterialUnitId] [int] NOT NULL,
    [ProductionDate] [datetime] NOT NULL,
    [FormulaId] [int] NOT NULL,
    [UserId] [int] NOT NULL,
    [CreatedDate] [datetime] NOT NULL,
    [CounterId] [int] NOT NULL,
    [CompanyId] [int] NULL,
    [WarehouseId] [int] NULL,
    [FinancialYearId] [int] NULL,
    [IsProduction] [bit] NULL,
    [ProducedQuantity] [decimal](18, 2) NULL,
    [TotalRate] [decimal](18, 2) NULL,
    [ProductionCost] [decimal](18, 2) NULL,
    [TotalCost] [decimal](18, 2) NULL
) ON [PRIMARY]
GO

-- Production Order Details
CREATE TABLE [Production].[ProductionOrderDetail](
    [ProductionDetailId] [int] IDENTITY(1,1) NOT FOR REPLICATION NOT NULL,
    [ProductionOrderId] [int] NOT NULL,
    [ProductId] [int] NULL,
    [Quantity] [float] NULL,
    [Percentage] [float] NULL,
    [UnitId] [int] NULL,
    [IsFinished] [bit] NULL,
    [LineNo] [int] NULL,
    [Rate] [float] NULL,
    [BatchNo] [varchar](50) NULL,
    [StockType] [char](2) NULL,
    [Wastage] [decimal](18, 2) NULL,
    [Balance] [decimal](18, 2) NULL,
    [ProducedQuantity] [decimal](18, 3) NULL,
    [PurchaseRate] [decimal](18, 2) NULL
) ON [PRIMARY]
GO

-- Production Formula
CREATE TABLE [Production].[ProductionFormula](
    [FormulaId] [int] IDENTITY(1,1) NOT FOR REPLICATION NOT NULL,
    [FormulaName] [char](100) NULL,
    [CounterId] [int] NOT NULL,
    [CompanyId] [int] NULL,
    [IsActive] [bit] NULL,
    [ProductCode] [varchar](50) NULL
) ON [PRIMARY]
GO

-- ============================================
-- REFERENCE/Lookup Tables
-- ============================================

-- Product Category
CREATE TABLE [Reference].[ProductCategory](
    [CategoryId] [int] IDENTITY(1,1) NOT FOR REPLICATION NOT NULL,
    [CategoryName] [char](100) NOT NULL,
    [ParentCategoryId] [int] NOT NULL,
    [CompanyId] [int] NULL,
    [UserId] [int] NULL,
    [CreatedDate] [datetime] NULL
) ON [PRIMARY]
GO

-- Measurement Unit
CREATE TABLE [Reference].[Unit](
    [UnitId] [int] IDENTITY(1,1) NOT FOR REPLICATION NOT NULL,
    [UnitName] [char](100) NOT NULL,
    [Multiplier] [numeric](18, 3) NULL,
    [UserId] [int] NULL,
    [CreatedDate] [datetime] NULL,
    [CompanyId] [int] NOT NULL,
    [SalesRate] [numeric](18, 2) NULL,
    [UnitCode] [char](100) NULL,
    [CommissionSalesNo] [int] NULL
) ON [PRIMARY]
GO

-- Product Size
CREATE TABLE [Reference].[ProductSize](
    [SizeId] [int] IDENTITY(1,1) NOT FOR REPLICATION NOT NULL,
    [CategoryId] [int] NOT NULL,
    [SizeName] [char](50) NOT NULL,
    [UserId] [int] NULL,
    [CreatedDate] [datetime] NULL,
    [CompanyId] [int] NULL,
    [Counter] [int] NULL
) ON [PRIMARY]
GO

-- Brand/Manufacturer
CREATE TABLE [Reference].[Brand](
    [BrandId] [int] IDENTITY(1,1) NOT FOR REPLICATION NOT NULL,
    [BrandName] [char](100) NULL,
    [UserId] [int] NOT NULL,
    [CreatedDate] [datetime] NOT NULL,
    [CompanyId] [int] NOT NULL
) ON [PRIMARY]
GO

-- Product Model
CREATE TABLE [Reference].[ProductModel](
    [ModelId] [int] IDENTITY(1,1) NOT NULL,
    [ModelName] [varchar](100) NULL,
    [ModelNo] [varchar](50) NULL,
    [ProductId] [int] NULL,
    [IsActive] [bit] NULL,
    [UserId] [int] NULL,
    [CreatedDate] [datetime] NULL,
    [CompanyId] [int] NULL,
    [Counter] [int] NULL,
    [FinancialYearId] [int] NULL,
    [Price] [decimal](18, 3) NULL
) ON [PRIMARY]
GO

-- Route Names
CREATE TABLE [Reference].[Route](
    [RouteId] [int] IDENTITY(1,1) NOT FOR REPLICATION NOT NULL,
    [RouteName] [char](100) NULL,
    [IsActive] [bit] NULL,
    [IsClosed] [bit] NULL,
    [UserId] [int] NOT NULL,
    [CreatedDate] [datetime] NOT NULL,
    [CompanyId] [int] NOT NULL
) ON [PRIMARY]
GO

-- Designation
CREATE TABLE [Reference].[Designation](
    [DesignationId] [int] IDENTITY(1,1) NOT FOR REPLICATION NOT NULL,
    [FinancialYearId] [int] NULL,
    [DesignationName] [varchar](50) NULL
) ON [PRIMARY]
GO

-- Account Type
CREATE TABLE [Reference].[AccountType](
    [AccountTypeId] [int] IDENTITY(1,1) NOT NULL,
    [AccountTypeName] [varchar](50) NULL
) ON [PRIMARY]
GO

-- Form Type
CREATE TABLE [Reference].[DocumentFormType](
    [FormId] [int] IDENTITY(1,1) NOT FOR REPLICATION NOT NULL,
    [FormName] [varchar](50) NULL,
    [PrefixCode] [varchar](50) NULL,
    [IsActive] [bit] NULL,
    [FinancialYearId] [int] NULL,
    [IsDefault] [bit] NULL
) ON [PRIMARY]
GO

-- Voucher Type
CREATE TABLE [Reference].[VoucherType](
    [AccountType] [nvarchar](50) NULL,
    [AccountName] [nvarchar](50) NULL,
    [Priority] [int] NULL
) ON [PRIMARY]
GO

-- ============================================
-- CONFIGURATION TABLES
-- ============================================

-- General System Settings
CREATE TABLE [Configuration].[SystemSettings](
    [SettingId] [int] IDENTITY(1,1) NOT FOR REPLICATION NOT NULL,
    [SettingCode] [int] NULL,
    [Narration] [char](50) NULL,
    [FrontLineFeed] [int] NULL,
    [RearSpaces] [int] NULL,
    [PrintText] [char](100) NULL,
    [SalesUnitId] [int] NULL,
    [PurchaseUnitId] [int] NULL,
    [CompanyId] [int] NULL,
    [RawMaterialUnitId] [int] NULL,
    [FinishedGoodsUnitId] [int] NULL,
    [Adjust] [int] NULL,
    [SalesBillCopies] [int] NULL,
    [FinancialYearId] [int] NULL,
    [IsCalculatedOpeningStock] [bit] NULL,
    [IsCalculatedClosingStock] [bit] NULL,
    [StockShowOption] [int] NULL,
    [IsSalesCess] [bit] NULL,
    [IsPurchaseCess] [bit] NULL,
    [SalesCess] [float] NULL,
    [PurchaseCess] [float] NULL,
    [IsDosPrint] [bit] NULL,
    [DefaultPurchaseType] [int] NULL,
    [DefaultSalesType] [int] NULL,
    [IsAllowNegativeStock] [bit] NULL,
    [DueDays] [int] NULL,
    [MinCashPayAmount] [int] NULL,
    [IsAllowPriceList] [bit] NULL,
    [SalesmanTypeId] [int] NULL,
    [IsFillUnit] [bit] NULL,
    [SalesCalculationType] [int] NULL,
    [IsAddressBook] [bit] NULL,
    [IsSmallPrint] [bit] NULL,
    [StockCalculationMethod] [int] NULL,
    [DefaultWarehouseId] [int] NULL,
    [DefaultBankId] [int] NULL,
    [RowsInExcelPage] [int] NULL,
    [DefaultSalesCashPartyType] [int] NULL
) ON [PRIMARY]
GO

-- Tax Settings
CREATE TABLE [Configuration].[TaxSetting](
    [TaxSettingId] [int] IDENTITY(1,1) NOT FOR REPLICATION NOT NULL,
    [TaxPercent] [float] NULL,
    [AccountId] [int] NULL,
    [TaxAccountId] [int] NULL,
    [SalesOrPurchaseType] [char](15) NULL,
    [IsSalesOrPurchase] [char](2) NULL,
    [FinancialYearId] [int] NULL,
    [IsEstimate] [bit] NULL,
    [ProductId] [int] NULL,
    [GoodsType] [char](20) NULL
) ON [PRIMARY]
GO

-- Default Tax Settings
CREATE TABLE [Configuration].[DefaultTaxSetting](
    [DefaultTaxId] [int] IDENTITY(1,1) NOT FOR REPLICATION NOT NULL,
    [TaxPercent] [float] NULL,
    [AccountId] [int] NULL,
    [TaxAccountId] [int] NULL,
    [SalesOrPurchaseType] [char](15) NULL,
    [IsSalesOrPurchase] [char](2) NULL,
    [FinancialYearId] [int] NULL,
    [IsEstimate] [bit] NULL
) ON [PRIMARY]
GO

-- System Presets
CREATE TABLE [Configuration].[SystemPreset](
    [PresetId] [int] IDENTITY(1,1) NOT FOR REPLICATION NOT NULL,
    [PresetCode] [int] NOT NULL,
    [Narration] [varchar](50) NULL,
    [PresetValue] [varchar](50) NULL,
    [IsEnabled] [bit] NULL,
    [AdditionalValue] [float] NULL,
    [PresetType] [char](1) NULL,
    [CompanyId] [int] NULL
) ON [PRIMARY]
GO

-- Price List
CREATE TABLE [Configuration].[PriceList](
    [PriceListId] [int] IDENTITY(1,1) NOT FOR REPLICATION NOT NULL,
    [ProductId] [int] NULL,
    [UnitId] [int] NULL,
    [Rate] [decimal](18, 2) NULL,
    [CompanyId] [int] NULL
) ON [PRIMARY]
GO

-- Product Settings
CREATE TABLE [Configuration].[ProductSetting](
    [ProductSettingId] [int] IDENTITY(1,1) NOT NULL,
    [ProductId] [int] NULL,
    [LineNo] [int] NULL,
    [IsFinishedGood] [bit] NULL,
    [UnitId] [int] NULL,
    [FinancialYearId] [int] NULL,
    [FormulaId] [int] NULL,
    [CompanyId] [int] NULL,
    [Quantity] [decimal](18, 3) NULL
) ON [PRIMARY]
GO

-- Server Settings
CREATE TABLE [Configuration].[ServerSetting](
    [SqlServerPath] [varchar](500) NULL,
    [ClientName] [varchar](500) NULL,
    [FileLocation] [varchar](500) NULL
) ON [PRIMARY]
GO

-- ============================================
-- SECURITY TABLES
-- ============================================

-- User Account
CREATE TABLE [Security].[UserAccount](
    [UserId] [int] IDENTITY(1,1) NOT FOR REPLICATION NOT NULL,
    [Username] [char](100) NULL,
    [Password] [char](100) NOT NULL,
    [UserType] [bit] NOT NULL,
    [CompanyId] [int] NOT NULL
) ON [PRIMARY]
GO

-- User Privilege
CREATE TABLE [Security].[UserPrivilege](
    [UserPrivilegeId] [int] IDENTITY(1,1) NOT FOR REPLICATION NOT NULL,
    [UserId] [int] NULL,
    [PrivilegeId] [int] NULL,
    [CompanyId] [int] NULL,
    [CanSave] [int] NULL,
    [CanEdit] [int] NULL,
    [CanView] [int] NULL,
    [CanPrint] [int] NULL,
    [CanDelete] [int] NULL
) ON [PRIMARY]
GO

-- System Privilege
CREATE TABLE [Security].[SystemPrivilege](
    [PrivilegeId] [int] NOT NULL,
    [PrivilegeName] [char](50) NULL,
    [MenuName] [char](50) NULL,
    [MenuType] [tinyint] NULL,
    [ParentPrivilegeId] [int] NULL,
    [IsMenuVisible] [bit] NULL,
    [CompanyId] [int] NULL
) ON [PRIMARY]
GO

-- Login History
CREATE TABLE [Security].[LoginHistory](
    [LoginId] [int] IDENTITY(1,1) NOT FOR REPLICATION NOT NULL,
    [LoginTime] [datetime] NULL,
    [LogoutTime] [datetime] NULL,
    [UserId] [int] NOT NULL,
    [CompanyId] [int] NOT NULL
) ON [PRIMARY]
GO

-- ============================================
-- RELATIONAL/LINKING TABLES
-- ============================================

-- Account-Brand Relationship
CREATE TABLE [Reference].[AccountBrand](
    [AccountId] [int] NOT NULL,
    [BrandId] [int] NOT NULL,
    CONSTRAINT [PK_AccountBrand] PRIMARY KEY CLUSTERED 
    (
        [AccountId] ASC,
        [BrandId] ASC
    )
) ON [PRIMARY]
GO

-- Supplier-Product Relationship
CREATE TABLE [Reference].[SupplierProduct](
    [ProductId] [int] NULL,
    [SupplierId] [int] NULL,
    [SequenceId] [int] NULL
) ON [PRIMARY]
GO

-- Product-Unit Relationship
CREATE TABLE [Reference].[ProductUnit](
    [UnitId] [int] NOT NULL,
    [ProductId] [int] NOT NULL,
    [Quantity] [float] NOT NULL,
    [CompanyId] [int] NOT NULL
) ON [PRIMARY]
GO

-- Product-Formula Relationship
CREATE TABLE [Reference].[ProductFormula](
    [FormulaId] [int] NULL,
    [ProductId] [int] NULL,
    [Quantity] [float] NULL,
    [CompanyId] [int] NULL
) ON [PRIMARY]
GO

-- ============================================
-- AUDIT & LOGGING TABLES
-- ============================================

-- System Event Log
CREATE TABLE [Audit].[SystemEvent](
    [EventId] [bigint] IDENTITY(1,1) NOT FOR REPLICATION NOT NULL,
    [DocumentId] [int] NULL,
    [DocumentType] [char](20) NULL,
    [DocumentNo] [char](30) NULL,
    [DocumentDate] [datetime] NULL,
    [EventType] [char](20) NULL,
    [EventTime] [datetime] NULL,
    [GrandTotal] [decimal](18, 2) NULL,
    [PreviousGrandTotal] [decimal](18, 2) NULL,
    [IsEstimate] [bit] NULL,
    [UserId] [int] NULL,
    [Counter] [int] NULL,
    [CompanyId] [int] NULL,
    [GoldWeight] [decimal](18, 2) NULL,
    [PreviousGoldWeight] [decimal](18, 2) NULL,
    [FinancialYearId] [int] NULL
) ON [PRIMARY]
GO

-- Day Closing
CREATE TABLE [Audit].[DayClosing](
    [ClosingId] [int] IDENTITY(1,1) NOT FOR REPLICATION NOT NULL,
    [ClosingDate] [datetime] NULL,
    [IsDeleted] [bit] NULL,
    [DeletedDate] [datetime] NULL,
    [UserId] [int] NULL,
    [CreatedDate] [datetime] NULL,
    [IsEstimate] [bit] NULL,
    [FinancialYearId] [int] NULL,
    [IsClosed] [bit] NULL,
    [PrivilegeId] [int] NULL
) ON [PRIMARY]
GO

-- ============================================
-- ADD PRIMARY KEYS
-- ============================================

-- Add primary keys to core tables
ALTER TABLE [Core].[Company] ADD CONSTRAINT [PK_Company] PRIMARY KEY CLUSTERED ([CompanyId] ASC)
ALTER TABLE [Core].[FinancialYear] ADD CONSTRAINT [PK_FinancialYear] PRIMARY KEY CLUSTERED ([FinancialYearId] ASC)
ALTER TABLE [Core].[AccountGroup] ADD CONSTRAINT [PK_AccountGroup] PRIMARY KEY CLUSTERED ([GroupId] ASC)
ALTER TABLE [Core].[Account] ADD CONSTRAINT [PK_Account] PRIMARY KEY CLUSTERED ([AccountId] ASC)
ALTER TABLE [Core].[Product] ADD CONSTRAINT [PK_Product] PRIMARY KEY CLUSTERED ([ProductId] ASC)
ALTER TABLE [Core].[Warehouse] ADD CONSTRAINT [PK_Warehouse] PRIMARY KEY CLUSTERED ([WarehouseId] ASC)
ALTER TABLE [Core].[Employee] ADD CONSTRAINT [PK_Employee] PRIMARY KEY CLUSTERED ([EmployeeId] ASC)
ALTER TABLE [Core].[BankAccount] ADD CONSTRAINT [PK_BankAccount] PRIMARY KEY CLUSTERED ([BankAccountId] ASC)

-- Add primary keys to transaction tables
ALTER TABLE [Transaction].[SalesInvoice] ADD CONSTRAINT [PK_SalesInvoice] PRIMARY KEY CLUSTERED ([SalesInvoiceId] ASC)
ALTER TABLE [Transaction].[SalesInvoiceDetail] ADD CONSTRAINT [PK_SalesInvoiceDetail] PRIMARY KEY CLUSTERED ([SalesInvoiceDetailId] ASC)
ALTER TABLE [Transaction].[SalesReturn] ADD CONSTRAINT [PK_SalesReturn] PRIMARY KEY CLUSTERED ([SalesReturnId] ASC)
ALTER TABLE [Transaction].[SalesOpeningBalance] ADD CONSTRAINT [PK_SalesOpeningBalance] PRIMARY KEY CLUSTERED ([SalesOpeningId] ASC)
ALTER TABLE [Transaction].[PurchaseInvoice] ADD CONSTRAINT [PK_PurchaseInvoice] PRIMARY KEY CLUSTERED ([PurchaseInvoiceId] ASC)
ALTER TABLE [Transaction].[PurchaseReturn] ADD CONSTRAINT [PK_PurchaseReturn] PRIMARY KEY CLUSTERED ([PurchaseReturnId] ASC)
ALTER TABLE [Transaction].[PurchaseOpeningBalance] ADD CONSTRAINT [PK_PurchaseOpeningBalance] PRIMARY KEY CLUSTERED ([PurchaseOpeningId] ASC)

-- Add primary keys to inventory tables
ALTER TABLE [Inventory].[StockLedger] ADD CONSTRAINT [PK_StockLedger] PRIMARY KEY CLUSTERED ([TransactionId] ASC)
ALTER TABLE [Inventory].[OpeningStock] ADD CONSTRAINT [PK_OpeningStock] PRIMARY KEY CLUSTERED ([OpeningStockId] ASC)
ALTER TABLE [Inventory].[OpeningStockDetail] ADD CONSTRAINT [PK_OpeningStockDetail] PRIMARY KEY CLUSTERED ([OpeningStockDetailId] ASC)
ALTER TABLE [Inventory].[StockAdjustment] ADD CONSTRAINT [PK_StockAdjustment] PRIMARY KEY CLUSTERED ([AdjustmentId] ASC)
ALTER TABLE [Inventory].[StockTransfer] ADD CONSTRAINT [PK_StockTransfer] PRIMARY KEY CLUSTERED ([TransferId] ASC)

-- Add primary keys to accounting tables
ALTER TABLE [Accounting].[GeneralLedger] ADD CONSTRAINT [PK_GeneralLedger] PRIMARY KEY CLUSTERED ([TransactionId] ASC)
ALTER TABLE [Accounting].[OpeningBalance] ADD CONSTRAINT [PK_OpeningBalance] PRIMARY KEY CLUSTERED ([OpeningBalanceId] ASC)
ALTER TABLE [Accounting].[CashTransaction] ADD CONSTRAINT [PK_CashTransaction] PRIMARY KEY CLUSTERED ([CashTransactionId] ASC)
ALTER TABLE [Accounting].[BankTransaction] ADD CONSTRAINT [PK_BankTransaction] PRIMARY KEY CLUSTERED ([BankTransactionId] ASC)
ALTER TABLE [Accounting].[JournalVoucher] ADD CONSTRAINT [PK_JournalVoucher] PRIMARY KEY CLUSTERED ([JournalVoucherId] ASC)

-- Add primary keys to production tables
ALTER TABLE [Production].[ProductionOrder] ADD CONSTRAINT [PK_ProductionOrder] PRIMARY KEY CLUSTERED ([ProductionOrderId] ASC)
ALTER TABLE [Production].[ProductionOrderDetail] ADD CONSTRAINT [PK_ProductionOrderDetail] PRIMARY KEY CLUSTERED ([ProductionDetailId] ASC)
ALTER TABLE [Production].[ProductionFormula] ADD CONSTRAINT [PK_ProductionFormula] PRIMARY KEY CLUSTERED ([FormulaId] ASC)

-- Add primary keys to reference tables
ALTER TABLE [Reference].[ProductCategory] ADD CONSTRAINT [PK_ProductCategory] PRIMARY KEY CLUSTERED ([CategoryId] ASC)
ALTER TABLE [Reference].[Unit] ADD CONSTRAINT [PK_Unit] PRIMARY KEY CLUSTERED ([UnitId] ASC)
ALTER TABLE [Reference].[ProductSize] ADD CONSTRAINT [PK_ProductSize] PRIMARY KEY CLUSTERED ([SizeId] ASC)
ALTER TABLE [Reference].[Brand] ADD CONSTRAINT [PK_Brand] PRIMARY KEY CLUSTERED ([BrandId] ASC)
ALTER TABLE [Reference].[ProductModel] ADD CONSTRAINT [PK_ProductModel] PRIMARY KEY CLUSTERED ([ModelId] ASC)
ALTER TABLE [Reference].[Route] ADD CONSTRAINT [PK_Route] PRIMARY KEY CLUSTERED ([RouteId] ASC)
ALTER TABLE [Reference].[Designation] ADD CONSTRAINT [PK_Designation] PRIMARY KEY CLUSTERED ([DesignationId] ASC)
ALTER TABLE [Reference].[AccountType] ADD CONSTRAINT [PK_AccountType] PRIMARY KEY CLUSTERED ([AccountTypeId] ASC)
ALTER TABLE [Reference].[DocumentFormType] ADD CONSTRAINT [PK_DocumentFormType] PRIMARY KEY CLUSTERED ([FormId] ASC)

-- Add primary keys to configuration tables
ALTER TABLE [Configuration].[SystemSettings] ADD CONSTRAINT [PK_SystemSettings] PRIMARY KEY CLUSTERED ([SettingId] ASC)
ALTER TABLE [Configuration].[TaxSetting] ADD CONSTRAINT [PK_TaxSetting] PRIMARY KEY CLUSTERED ([TaxSettingId] ASC)
ALTER TABLE [Configuration].[DefaultTaxSetting] ADD CONSTRAINT [PK_DefaultTaxSetting] PRIMARY KEY CLUSTERED ([DefaultTaxId] ASC)
ALTER TABLE [Configuration].[SystemPreset] ADD CONSTRAINT [PK_SystemPreset] PRIMARY KEY CLUSTERED ([PresetId] ASC)
ALTER TABLE [Configuration].[PriceList] ADD CONSTRAINT [PK_PriceList] PRIMARY KEY CLUSTERED ([PriceListId] ASC)
ALTER TABLE [Configuration].[ProductSetting] ADD CONSTRAINT [PK_ProductSetting] PRIMARY KEY CLUSTERED ([ProductSettingId] ASC)

-- Add primary keys to security tables
ALTER TABLE [Security].[UserAccount] ADD CONSTRAINT [PK_UserAccount] PRIMARY KEY CLUSTERED ([UserId] ASC)
ALTER TABLE [Security].[UserPrivilege] ADD CONSTRAINT [PK_UserPrivilege] PRIMARY KEY CLUSTERED ([UserPrivilegeId] ASC)
ALTER TABLE [Security].[SystemPrivilege] ADD CONSTRAINT [PK_SystemPrivilege] PRIMARY KEY CLUSTERED ([PrivilegeId] ASC)
ALTER TABLE [Security].[LoginHistory] ADD CONSTRAINT [PK_LoginHistory] PRIMARY KEY CLUSTERED ([LoginId] ASC)

-- Add primary keys to audit tables
ALTER TABLE [Audit].[SystemEvent] ADD CONSTRAINT [PK_SystemEvent] PRIMARY KEY CLUSTERED ([EventId] ASC)
ALTER TABLE [Audit].[DayClosing] ADD CONSTRAINT [PK_DayClosing] PRIMARY KEY CLUSTERED ([ClosingId] ASC)

PRINT 'Database schema created successfully with organized structure!'
PRINT 'Total tables created: '
PRINT '  - Core tables: 8'
PRINT '  - Transaction tables: 7'
PRINT '  - Inventory tables: 6'
PRINT '  - Accounting tables: 5'
PRINT '  - Production tables: 3'
PRINT '  - Reference tables: 10'
PRINT '  - Configuration tables: 6'
PRINT '  - Security tables: 4'
PRINT '  - Relational tables: 4'
PRINT '  - Audit tables: 2'
PRINT '  - Total: 55 tables'
GO