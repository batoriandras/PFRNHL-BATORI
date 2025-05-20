//using Database;
//using Entities.Dto.User;
//using Logic.Helpers;
//using Microsoft.AspNetCore.Identity;
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.IdentityModel.Tokens;
//using System.IdentityModel.Tokens.Jwt;
//using System.Security.Claims;
//using System.Text;

//namespace Endpoint.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class UserController : ControllerBase
//    {
//        private readonly UserManager<AppUser> userManager;
//        private readonly RoleManager<IdentityRole> roleManager;
//        private readonly DtoProvider dtoProvider;

//        public UserController(UserManager<AppUser> userManager, RoleManager<IdentityRole> roleManager, DtoProvider dtoProvider)
//        {
//            this.userManager = userManager;
//            this.roleManager = roleManager;
//            this.dtoProvider = dtoProvider;
//        }

//        [HttpGet("grantadmin/{userid}")]
//        public async Task GrantAdmin(string userid)
//        {
//            var user = await userManager.FindByIdAsync(userid);
//            if (user == null) { throw new ArgumentException("User not found"); }
//            await userManager.AddToRoleAsync(user, "Admin");
//        }

//        [HttpGet("revokeadmin/{userid}")]
//        public async Task RevokeAdmin(string userid)
//        {
//            var user = await userManager.FindByIdAsync(userid);
//            if (user == null) { throw new ArgumentException("User not found"); }
//            await userManager.RemoveFromRoleAsync(user, "Admin");
//        }

//        [HttpDelete("{userid}")]
//        public async Task DeleteUser(string userid)
//        {
//            var user = await userManager.FindByIdAsync(userid);
//            if (user == null) { throw new ArgumentException("User not found"); }
//            await userManager.DeleteAsync(user);
//        }

//        [HttpGet]
//        public IEnumerable<UserViewDto> GetAllUsers()
//        {
//            return userManager.Users.Select(u => dtoProvider.Mapper.Map<UserViewDto>(u));
//        }

//        [HttpPost("register")]
//        public async Task RegisterUser(UserRegisterDto dto)
//        {
//            var user = new AppUser
//            {
//                UserName = dto.Username,
//                Email = dto.Email,
//                FirstName = dto.FirstName,
//                LastName = dto.LastName,
//                PhoneNumber = dto.PhoneNumber,
//                Address = dto.Address
//            };
//            var result = await userManager.CreateAsync(user, dto.Password);
//            if (!result.Succeeded) { throw new ArgumentException("Failed to create user"); }

//            if (userManager.Users.Count() == 1)
//            {
//                await roleManager.CreateAsync(new IdentityRole("Admin"));
//                await userManager.AddToRoleAsync(user, "Admin");
//            }
//        }

//        [HttpPost("login")]
//        public async Task<IActionResult> Login(UserLoginDto dto)
//        {
//            var user = await userManager.FindByNameAsync(dto.Username);
//            if (user == null) { throw new ArgumentException("User not found"); }
//            var result = await userManager.CheckPasswordAsync(user, dto.Password);
//            if (!result)
//            {
//                throw new ArgumentException("Invalid password");
//            }
//            else
//            {
//                var claim = new List<Claim>();
//                claim.Add(new Claim(ClaimTypes.Name, user.UserName!));
//                claim.Add(new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()));

//                foreach (var item in await userManager.GetRolesAsync(user))
//                {
//                    claim.Add(new Claim(ClaimTypes.Role, item));
//                }
//                int expireMinutes = 60 * 24;
//                var token = GenerateAccessToken(claim, expireMinutes);
//                return Ok(new UserLoginResultDto()
//                {
//                    Token = new JwtSecurityTokenHandler().WriteToken(token),
//                    Expiration = DateTime.Now.AddMinutes(expireMinutes)
//                });
//            }
//        }

//        private JwtSecurityToken GenerateAccessToken(IEnumerable<Claim>? claims, int expireMinutes)
//        {
//            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("superSecretKey@345superSecretKey@345superSecretKey@345superSecretKey@345"));
//            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

//            var token = new JwtSecurityToken(
//                issuer: "GlazierComp.com",
//                audience: "GlazierComp.com",
//                claims: claims?.ToArray(),
//                expires: DateTime.Now.AddMinutes(expireMinutes),
//                signingCredentials: creds
//                );

//            return token;
//        }
//    }
//}
