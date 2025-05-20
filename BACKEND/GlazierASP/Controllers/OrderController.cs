using Entities.Dto.Order;
using Logic.Helpers;
using Logic.Logic;
using Microsoft.AspNetCore.Mvc;

namespace Endpoint.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly OrderLogic orderLogic;
        //private readonly UserManager<AppUser> userManager;

        public OrderController(OrderLogic orderLogic/*, UserManager<AppUser> userManager*/)
        {
            this.orderLogic = orderLogic;
            //this.userManager = userManager;
        }

        [HttpPost]
        public IActionResult CreateOrder([FromBody] OrderCreateDto dto)
        {
            try
            {
                var created = orderLogic.CreateOrder(dto);
                return Ok(created);
            }
            catch (BusinessException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Szerverhiba történt: " + ex.Message);
            }
        }

        [HttpGet]
        public IEnumerable<OrderViewDto> GetAllOrders()
        {
            return orderLogic.GetAllOrders();
        }

        [HttpPut("{id}")]
        public void UpdateOrderStatus(string id, [FromBody] OrderUpdateDto status)
        {
            orderLogic.UpdateOrderStatus(id, status);
        }

        [HttpDelete("{id}")]
        public void DeleteOrder(string id)
        {
            orderLogic.DeleteOrder(id);
        }

        [HttpGet("adminview/{id}")]
        public OrderViewDto GetOrder(string id)
        {
            return orderLogic.GetOrderById(id);
        }

        [HttpGet("guestview/{id}")]
        public OrderShortViewDto GetShortOrder(string id)
        {
            return orderLogic.GetShortOrderById(id);
        }

        //[HttpGet("userorders/{userid}")]
        //public IEnumerable<OrderShortViewDto> GetOrdersByUserId(string userId)
        //{
        //    return orderLogic.GetOrdersByUserId(userId);
        //}
    }
}
