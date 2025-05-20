using Entities.Helpers;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Entities.Models
{
    public class Employee : IIdEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string Id { get; set; }

        //[Required]
        //public string UserId { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }
        public string Image { get; set; }

        public DateTime DateOfEmployment { get; set; }

        public virtual ICollection<Service>? Services { get; set; }

        public Employee()
        {
        }

        public Employee(string id, string firstname, string lastname, string username, string email, string phoneNumber, string address, DateTime dateOfEmployment, string image)
        {
            Id = id;
            Firstname = firstname;
            Lastname = lastname;
            Username = username;
            Email = email;
            PhoneNumber = phoneNumber;
            Address = address;
            DateOfEmployment = dateOfEmployment;
            Image = image;
        }
    }
}
