namespace Entities.Dto.Employee
{
    public class EmployeeCreateDto
    {
        public string Firstname { get; set; } = "";
        public string Lastname { get; set; } = "";
        public string Username { get; set; } = "";
        public string Email { get; set; } = "";
        public string PhoneNumber { get; set; } = "";
        public string Address { get; set; } = "";
        public string Image { get; set; } = "";
        //public required string UserId { get; set; } = "";
        public required DateTime DateOfEmployment { get; set; } = DateTime.Now;
        public string[]? ServiceIds { get; set; } = null;
    }
}
