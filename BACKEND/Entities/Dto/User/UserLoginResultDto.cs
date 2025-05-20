namespace Entities.Dto.User
{
    public class UserLoginResultDto
    {
        public string Token { get; set; } = "";
        public DateTime Expiration { get; set; }
    }
}
