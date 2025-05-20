using Database;
using Entities.Dto.Admin;
using Entities.Dto.Employee;
using Entities.Dto.Order;
using Entities.Dto.Service;
using Entities.Models;
using Microsoft.EntityFrameworkCore;

namespace Logic.Logic
{
    public class AdminDashboardLogic
    {
        AppDbContext _context;

        public AdminDashboardLogic(AppDbContext context)
        {
            _context = context;
        }

        public AdminDashboardDto GetDashboardData()
        {
            var activeProjects = _context.Orders.Count(x => x.Status == OrderStatus.InProgress);
            var completedOrders = _context.Orders.Count(x => x.Status == OrderStatus.Completed);
            var totalOrders = _context.Orders.Count();
            var totalServices = _context.Services.Count();
            var totalEmployees = _context.Employees.Count();

            double averageCompletionTime = 0;
            var completedOrdersQuery = _context.Orders
                .Where(o => o.CompletionDate.HasValue);

            if (completedOrdersQuery.Any())
            {
                averageCompletionTime = completedOrdersQuery
                    .Average(o => EF.Functions.DateDiffDay(o.OrderDate, o.CompletionDate.Value));
            }

            var topServices = _context.Orders
                .GroupBy(o => o.Service.Name)
                .Select(g => new ServiceOrderStatDto
                {
                    ServiceName = g.Key,
                    OrderCount = g.Count()
                })
                .OrderByDescending(x => x.OrderCount)
                .ToList();

            var employeeCountByService = _context.Services
                .Select(s => new ServiceEmployeeCountDto
                {
                    ServiceName = s.Name,
                    EmployeeCount = s.Employees.Count()
                })
                .ToList();

            var now = DateTime.Now;
            var lastSixMonths = now.AddMonths(-5);

            var monthlyOrderStats = _context.Orders
                .Where(o => o.OrderDate >= lastSixMonths)
                .GroupBy(o => new { o.OrderDate.Year, o.OrderDate.Month })
                .Select(g => new MonthlyOrderStatDto
                {
                    Year = g.Key.Year,
                    Month = g.Key.Month,
                    OrderCount = g.Count()
                })
                .OrderBy(x => x.Year).ThenBy(x => x.Month)
                .ToList();

            var topEmployee = _context.Employees
    .Select(e => new
    {
        Employee = e,
        ServiceCount = e.Services.Count
    })
    .OrderByDescending(x => x.ServiceCount)
    .FirstOrDefault();

            var topEmployeeDto = topEmployee != null
                ? new TopEmployeeDto
                {
                    FullName = $"{topEmployee.Employee.Firstname} {topEmployee.Employee.Lastname}",
                    ServiceCount = topEmployee.ServiceCount
                }
                : null;

            return new AdminDashboardDto
            {
                ActiveProjects = activeProjects,
                CompletedOrders = completedOrders,
                TotalOrders = totalOrders,
                TotalServices = totalServices,
                TotalEmployees = totalEmployees,

                AverageCompletionTime = averageCompletionTime,
                TopServices = topServices,
                EmployeeCountByService = employeeCountByService,
                MonthlyOrderStats = monthlyOrderStats,
                TopEmployee = topEmployeeDto
            };
        }
    }
}
