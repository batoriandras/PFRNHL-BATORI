using System.ComponentModel.DataAnnotations;

namespace Entities.Dto.User
{
    public class UserRegisterDto
    {
        [MinLength(6)]
        public required string Username { get; set; } = "";
        [MinLength(6)]
        public required string Password { get; set; } = "";
        [MinLength(2)]
        public required string FirstName { get; set; } = "";
        [MinLength(2)]
        public required string LastName { get; set; } = "";
        [MinLength(6)]
        public required string Email { get; set; } = "";
        [MinLength(6)]
        public required string PhoneNumber { get; set; } = "";
        [MinLength(6)]
        public required string Address { get; set; } = "";
    }
}
