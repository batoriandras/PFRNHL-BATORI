﻿namespace Entities.Dto.User
{
    public class UserViewDto
    {
        public string Id { get; set; } = "";
        public string Firstname { get; set; } = "";
        public string Lastname { get; set; } = "";
        public string Username { get; set; } = "";
        public string Email { get; set; } = "";
        public string PhoneNumber { get; set; } = "";
        public string Address { get; set; } = "";
        public bool IsAdmin { get; set; }
    }
}
