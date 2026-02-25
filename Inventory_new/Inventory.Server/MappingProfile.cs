using AutoMapper;
using Inventory.Server.Dtos;
using Inventory.Server.Models.Core;
using Inventory.Server.Models;

namespace Inventory.Server
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Designation Mappings
            CreateMap<Designation, DesignationDto>();
            CreateMap<CreateDesignationDto, Designation>();
            CreateMap<UpdateDesignationDto, Designation>();

            // Brand Mappings
            CreateMap<Brand, BrandDto>()
                .ForMember(dest => dest.BrandName, opt => opt.MapFrom(src => src.BrandName != null ? src.BrandName.Trim() : null));
            CreateMap<CreateBrandDto, Brand>();
            CreateMap<UpdateBrandDto, Brand>();
            CreateMap<Brand, BrandNameDto>()
                .ForMember(dest => dest.BrandName, opt => opt.MapFrom(src => src.BrandName != null ? src.BrandName.Trim() : null));

            // CategoryGroup Mappings
            CreateMap<CategoryGroup, CategoryGroupDto>()
                .ForMember(dest => dest.CategoryGroupName, opt => opt.MapFrom(src => src.CategoryGroupName != null ? src.CategoryGroupName.Trim() : null));
            CreateMap<CreateCategoryGroupDto, CategoryGroup>();
            CreateMap<UpdateCategoryGroupDto, CategoryGroup>();
            CreateMap<CategoryGroup, CategoryGroupNameDto>()
                .ForMember(dest => dest.CategoryGroupName, opt => opt.MapFrom(src => src.CategoryGroupName != null ? src.CategoryGroupName.Trim() : null));

            // Category Mappings
            CreateMap<Category, CategoryDto>()
                .ForMember(dest => dest.CategoryName, opt => opt.MapFrom(src => src.CategoryName != null ? src.CategoryName.Trim() : null))
                .ForMember(dest => dest.CategoryGroupName, opt => opt.MapFrom(src => src.CategoryGroup != null ? src.CategoryGroup.CategoryGroupName.Trim() : null));
            CreateMap<CreateCategoryDto, Category>();
            CreateMap<UpdateCategoryDto, Category>();

            // Unit Mappings
            CreateMap<Unit, UnitDto>()
                .ForMember(dest => dest.UnitName, opt => opt.MapFrom(src => src.UnitName != null ? src.UnitName.Trim() : null));
            CreateMap<CreateUnitDto, Unit>();
            CreateMap<UpdateUnitDto, Unit>();

            // Godown Mappings
            CreateMap<Godown, GodownDto>()
                .ForMember(dest => dest.GodownName, opt => opt.MapFrom(src => src.GodownName != null ? src.GodownName.Trim() : null));
            CreateMap<CreateGodownDto, Godown>();
            CreateMap<UpdateGodownDto, Godown>();

            // Employee Mappings
            CreateMap<Employee, EmployeeDto>()
                .ForMember(dest => dest.EmpName, opt => opt.MapFrom(src => src.EmpName != null ? src.EmpName.Trim() : null));
            CreateMap<CreateEmployeeDto, Employee>();
            CreateMap<UpdateEmployeeDto, Employee>();
        }
    }
}