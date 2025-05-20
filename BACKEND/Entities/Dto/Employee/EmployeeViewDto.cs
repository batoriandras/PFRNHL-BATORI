using Entities.Dto.Service;

namespace Entities.Dto.Employee
{
    public class EmployeeViewDto
    {
        public string Id { get; set; } = "";
        public string Firstname { get; set; } = "";
        public string Lastname { get; set; } = "";
        public string Username { get; set; } = "";
        public string Email { get; set; } = "";
        public string PhoneNumber { get; set; } = "";
        public string Address { get; set; } = "";
        public string Image { get; set; } = "";
        public required DateTime DateOfEmployment { get; set; } = DateTime.Now;
        public IEnumerable<ServiceViewDto> Services { get; set; }
        //public UserViewDto User { get; set; }
    }
}
