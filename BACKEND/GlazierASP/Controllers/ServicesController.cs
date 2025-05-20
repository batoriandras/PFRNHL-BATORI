using Entities.Dto.Service;
using Logic.Helpers;
using Logic.Logic;
using Microsoft.AspNetCore.Mvc;

namespace Endpoint.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ServicesController : ControllerBase
    {
        private readonly ServiceLogic serviceLogic;

        public ServicesController(ServiceLogic serviceLogic)
        {
            this.serviceLogic = serviceLogic;
        }

        [HttpGet]
        public IEnumerable<ServiceViewDto> GetAllServices()
        {
            return serviceLogic.GetAllServices();
        }

        [HttpPost]
        public IActionResult CreateService(ServiceCreateUpdateDto dto)
        {
            try
            {
                var created = serviceLogic.CreateService(dto);
                return Ok(created);
            }
            catch (BusinessException ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }

        [HttpPut("{id}")]
        public void UpdateService(string id, [FromBody] ServiceCreateUpdateDto dto)
        {
            serviceLogic.UpdateService(id, dto);
        }

        [HttpGet("{id}")]
        public void GetService(string id)
        {
            serviceLogic.GetServiceById(id);
        }

        [HttpDelete("{id}")]
        public void DeleteService(string id)
        {
            serviceLogic.deleteService(id);
        }


    }
}
