using Entities.Models;

namespace Entities.Dto.Order
{
    public class OrderUpdateDto
    {
        public OrderStatus Status { get; set; } = OrderStatus.Pending;
    }
}
