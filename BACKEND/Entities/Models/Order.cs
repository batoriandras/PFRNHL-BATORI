using Entities.Helpers;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Entities.Models
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum OrderStatus
    {
        Pending,
        InProgress,
        Completed,
        Declined
    }
    public class Order : IIdEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string Id { get; set; }
        public string ServiceId { get; set; }
        public virtual Service? Service { get; set; }
        [StringLength(250)]
        public string Description { get; set; }
        public DateTime OrderDate { get; set; } = DateTime.Now;
        public DateTime DueDate { get; set; }
        public DateTime? CompletionDate { get; set; }
        public OrderStatus Status { get; set; } = OrderStatus.Pending;
        [StringLength(100)]
        public string Address { get; set; }
        [StringLength(25)]
        public string PhoneNumber { get; set; }
        [StringLength(100)]
        public string Email { get; set; }

        public Order(string serviceId, string description, DateTime orderDate, DateTime dueDate, DateTime? completionDate, OrderStatus status, string address, string phoneNumber, string email)
        {
            Id = Guid.NewGuid().ToString();
            ServiceId = serviceId;
            Description = description;
            OrderDate = orderDate;
            DueDate = dueDate;
            CompletionDate = completionDate;
            Status = status;
            Address = address;
            PhoneNumber = phoneNumber;
            Email = email;
        }

        public Order()
        {
        }
    }
}
