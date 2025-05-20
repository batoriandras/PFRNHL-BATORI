using System.ComponentModel.DataAnnotations;

namespace Entities.Dto.User
{
    public class UserLoginDto
    {
        [MinLength(6)]
        public required string Username { get; set; } = "";
        [MinLength(6)]
        public required string Password { get; set; } = "";
    }
}
