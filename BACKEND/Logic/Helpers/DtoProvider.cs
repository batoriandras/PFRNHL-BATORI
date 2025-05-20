using AutoMapper;
using Entities.Dto.Employee;
using Entities.Dto.Order;
using Entities.Dto.Service;
//using Entities.Dto.User;
using Entities.Models;

namespace Logic.Helpers
{
    public class DtoProvider
    {
        //UserManager<AppUser> userManager;
        public Mapper Mapper { get; }

        public DtoProvider(/*UserManager<AppUser> userManager*/)
        {
            //this.userManager = userManager;
            var config = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<Order, OrderShortViewDto>();


                //cfg.CreateMap<AppUser, UserViewDto>()
                //.AfterMap(async (src, dest) =>
                //{
                //    dest.IsAdmin = userManager.IsInRoleAsync(src, "Admin").Result;
                //});


                //cfg.CreateMap<Order, OrderViewDto>()
                //.AfterMap((src, dest) =>
                //{
                //    var user = userManager.Users.First(u => u.Id == src.UserId);
                //    dest.UserFullName = user.LastName! + " " + user.FirstName;
                //    dest.Username = user.UserName;
                //});
                cfg.CreateMap<Order, OrderViewDto>();
                cfg.CreateMap<OrderCreateDto, Order>();
                cfg.CreateMap<ServiceCreateUpdateDto, Service>();
                cfg.CreateMap<EmployeeCreateDto, Employee>();
                cfg.CreateMap<Service, ServiceViewDto>();
                cfg.CreateMap<Employee, EmployeeViewDto>()
                .ForMember(dest => dest.Services, opt => opt.MapFrom(src => src.Services));
                //.ForMember(dest => dest.User, opt => opt.MapFrom(src => userManager.Users.FirstOrDefault(u => u.Id == src.UserId)));
                cfg.CreateMap<MonthlyOrderStatDto, Order>();
                cfg.CreateMap<ServiceEmployeeCountDto, Service>();
                cfg.CreateMap<TopEmployeeDto, Employee>();

            });

            Mapper = new Mapper(config);
        }
    }
}
