using AutoMapper;
using Inventory.Server.Dtos;
using Inventory.Server.Models;
using Inventory.Server.Services;
using Microsoft.AspNetCore.Mvc;

namespace Inventory.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeesController : ControllerBase
    {
        private readonly IEmployeeService _employeeService;
        private readonly IMapper _mapper;

        public EmployeesController(IEmployeeService employeeService, IMapper mapper)
        {
            _employeeService = employeeService;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<EmployeeDto>>> GetEmployees()
        {
            var employees = await _employeeService.GetAllAsync();
            return Ok(_mapper.Map<IEnumerable<EmployeeDto>>(employees));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<EmployeeDto>> GetEmployee(int id)
        {
            var employee = await _employeeService.GetByIdAsync(id);
            if (employee == null) return NotFound();
            return Ok(_mapper.Map<EmployeeDto>(employee));
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<EmployeeDto>> PostEmployee(CreateEmployeeDto createDto)
        {
            var employee = _mapper.Map<Employee>(createDto);
            var createdEmployee = await _employeeService.CreateAsync(employee);
            var returnDto = _mapper.Map<EmployeeDto>(createdEmployee);
            return CreatedAtAction(nameof(GetEmployee), new { id = createdEmployee.EmpId }, returnDto);
        }

        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> PutEmployee(int id, UpdateEmployeeDto updateDto)
        {
            var employeeToUpdate = await _employeeService.GetByIdAsync(id);
            if (employeeToUpdate == null) return NotFound();

            _mapper.Map(updateDto, employeeToUpdate);
            await _employeeService.UpdateAsync(employeeToUpdate);
            return NoContent();
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            if (!await _employeeService.ExistsAsync(id)) return NotFound();
            await _employeeService.DeleteAsync(id);
            return NoContent();
        }
    }
}