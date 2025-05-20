using Entities.Dto.Employee;
using Logic.Helpers;
using Logic.Logic;
using Microsoft.AspNetCore.Mvc;

namespace Endpoint.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly EmployeeLogic employeeLogic;
        //private readonly UserManager<AppUser> userManager;

        public EmployeeController(EmployeeLogic employeeLogic/*, UserManager<AppUser> userManager*/)
        {
            this.employeeLogic = employeeLogic;
            //this.userManager = userManager;
        }

        [HttpPost]
        public IActionResult CreateEmployee([FromBody] EmployeeCreateDto dto)
        {
            try
            {
                var created = employeeLogic.CreateEmployee(dto);
                return Ok(created);
            }
            catch (BusinessException ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }

        [HttpGet]
        public async Task<IEnumerable<EmployeeViewDto>> GetAllEmployees()
        {
            return await employeeLogic.GetAllEmployees();
        }

        [HttpDelete("{id}")]
        public void DeleteEmployee(string id)
        {
            employeeLogic.DeleteEmployee(id);
        }

        [HttpGet("{id}")]
        public EmployeeViewDto GetOrder(string id)
        {
            return employeeLogic.GetEmployeeById(id);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateEmployee(string id, [FromBody] EmployeeCreateDto dto)
        {
            try
            {
                var updated = employeeLogic.UpdateEmployee(id, dto);
                return Ok(updated);
            }
            catch (BusinessException ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }
    }
}
