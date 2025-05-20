using Entities.Dto.Employee;
using Entities.Dto.Order;
using Entities.Dto.Service;

namespace Entities.Dto.Admin
{
    public class AdminDashboardDto
    {
        public int ActiveProjects { get; set; }
        public int CompletedOrders { get; set; }
        //public int TotalUsers { get; set; }
        public int TotalOrders { get; set; }
        public int TotalServices { get; set; }
        public int TotalEmployees { get; set; }

        public double AverageCompletionTime { get; set; }

        public List<ServiceOrderStatDto> TopServices { get; set; } = new();
        public List<ServiceEmployeeCountDto> EmployeeCountByService { get; set; } = new();
        public List<MonthlyOrderStatDto> MonthlyOrderStats { get; set; } = new();
        public TopEmployeeDto TopEmployee { get; set; }
    }
}
