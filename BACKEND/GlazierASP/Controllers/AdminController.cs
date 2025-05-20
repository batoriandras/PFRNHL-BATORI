using Entities.Dto.Admin;
using Logic.Logic;
using Microsoft.AspNetCore.Mvc;

namespace Endpoint.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly AdminDashboardLogic adminDashboardLogic;

        public AdminController(AdminDashboardLogic adminDashboardLogic)
        {
            this.adminDashboardLogic = adminDashboardLogic;
        }

        [HttpGet]
        public AdminDashboardDto GetAdminDashboard()
        {
            return adminDashboardLogic.GetDashboardData();
        }

    }
}
