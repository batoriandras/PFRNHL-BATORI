using Database;
using Entities.Dto.Employee;
using Entities.Models;
using Logic.Helpers;
using Microsoft.EntityFrameworkCore;

namespace Logic.Logic
{
    public interface IEmployeeLogic
    {
        EmployeeViewDto CreateEmployee(EmployeeCreateDto dto);
        Task<IEnumerable<EmployeeViewDto>> GetAllEmployees();
        void DeleteEmployee(string employeeId);
    }

    public class EmployeeLogic : IEmployeeLogic
    {
        Repository<Employee> _employeeRepo;
        Repository<Service> _serviceRepo;
        DtoProvider _dtoProvider;
        //UserManager<AppUser> userManager;

        public EmployeeLogic(Repository<Employee> Repository, DtoProvider dtoProvider, Repository<Service> serviceRepo/*, UserManager<AppUser> userManager*/)
        {
            _employeeRepo = Repository;
            _dtoProvider = dtoProvider;
            _serviceRepo = serviceRepo;
            //this.userManager = userManager;
        }

        public EmployeeViewDto CreateEmployee(EmployeeCreateDto dto)
        {
            var employee = _dtoProvider.Mapper.Map<Employee>(dto);

            employee.Services = new List<Service>();
            if (dto.ServiceIds != null)
            {
                foreach (var item in dto.ServiceIds)
                {
                    var service = _serviceRepo.FindById(item);
                    if (service != null)
                    {
                        employee.Services.Add(service);
                    }
                    else
                    {
                        throw new BusinessException($"Service ID not found: {item}");
                    }
                }
            }

            _employeeRepo.Create(employee);

            return _dtoProvider.Mapper.Map<EmployeeViewDto>(employee);
        }

        public async Task<IEnumerable<EmployeeViewDto>> GetAllEmployees()
        {
            var employees = await _employeeRepo.GetAll().Include(e => e.Services).ToListAsync();

            var employeeDtos = new List<EmployeeViewDto>();

            foreach (var employee in employees)
            {
                var employeeDto = _dtoProvider.Mapper.Map<EmployeeViewDto>(employee);
                //var user = await userManager.FindByIdAsync(employee.UserId);
                //employeeDto.User = _dtoProvider.Mapper.Map<UserViewDto>(user);

                employeeDtos.Add(employeeDto);
            }

            return employeeDtos;
        }

        public void DeleteEmployee(string employeeId)
        {
            var employee = _employeeRepo.FindById(employeeId);

            if (employee == null)
            {
                throw new Exception("Employee not found");
            }
            else
            {
                _employeeRepo.Delete(employee);
            }
        }

        public EmployeeViewDto GetEmployeeById(string id)
        {
            return _dtoProvider.Mapper.Map<EmployeeViewDto>(_employeeRepo.FindById(id));
        }

        public EmployeeViewDto UpdateEmployee(string id, EmployeeCreateDto dto)
        {
            var existing = _employeeRepo.FindById(id);
            _dtoProvider.Mapper.Map(dto, existing);

            if (dto.ServiceIds != null)
            {
                var services = new List<Service>();
                foreach (var serviceId in dto.ServiceIds)
                {
                    var service = _serviceRepo.FindById(serviceId);
                    if (service != null)
                        services.Add(service);
                }
                existing.Services.Clear();
                foreach (var service in services)
                {
                    existing.Services.Add(service);
                }
            }

            _employeeRepo.Update(existing);

            return _dtoProvider.Mapper.Map<EmployeeViewDto>(existing);
        }
    }
}
