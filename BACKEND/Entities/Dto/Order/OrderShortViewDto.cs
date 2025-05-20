using Entities.Dto.Service;
using Entities.Models;

namespace Entities.Dto.Order
{
    public class OrderShortViewDto
    {
        public string Id { get; set; } = "";
        public ServiceViewDto Service { get; set; }
        public string Description { get; set; } = "";
        public string Address { get; set; } = "";
        public string PhoneNumber { get; set; } = "";
        public string Email { get; set; } = "";
        public DateTime OrderDate { get; set; }
        public DateTime DueDate { get; set; }
        public DateTime? CompletionDate { get; set; }
        public OrderStatus Status { get; set; } = OrderStatus.Pending;
    }
}
