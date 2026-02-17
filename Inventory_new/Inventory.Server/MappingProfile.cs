using AutoMapper;
using Inventory.Server.Dtos;
using Inventory.Server.Models;
using Inventory.Server.Models.Core;

namespace Inventory.Server
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Brand Mappings
            CreateMap<Brand, BrandDto>();
            CreateMap<CreateBrandDto, Brand>();
            CreateMap<UpdateBrandDto, Brand>();
            CreateMap<Brand, BrandNameDto>();

            // Unit Mappings
            CreateMap<Unit, UnitDto>()
                .ForMember(dest => dest.Multiplier, opt => opt.MapFrom(src => src.Multiplier));
            CreateMap<CreateUnitDto, Unit>();
            CreateMap<UpdateUnitDto, Unit>();

            // CategoryGroup Mappings
            CreateMap<CategoryGroup, CategoryGroupDto>();
            CreateMap<CreateCategoryGroupDto, CategoryGroup>();
            CreateMap<UpdateCategoryGroupDto, CategoryGroup>();
            CreateMap<CategoryGroup, CategoryGroupNameDto>();

            // Category Mappings
            CreateMap<Category, CategoryDto>()
                .ForMember(dest => dest.CategoryGroupName, opt => opt.MapFrom(src => src.CategoryGroup != null ? src.CategoryGroup.CategoryGroupName : null));
            CreateMap<CreateCategoryDto, Category>();
            CreateMap<UpdateCategoryDto, Category>();

            // Godown Mappings
            CreateMap<Godown, GodownDto>();
            CreateMap<CreateGodownDto, Godown>();
            CreateMap<UpdateGodownDto, Godown>();

            // Employee Mappings
            CreateMap<Employee, EmployeeDto>();
            CreateMap<CreateEmployeeDto, Employee>();
            CreateMap<UpdateEmployeeDto, Employee>();
        }
    }
}