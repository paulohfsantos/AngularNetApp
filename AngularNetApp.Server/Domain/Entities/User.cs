using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace AngularNetApp.Server.Domain.Entities
{
    public class User: IdentityUser
    {
        [StringLength(100)]
        [MaxLength(100)]
        [Required]
        public string? Name { get; set; }

        public string? Email { get; set; }

        public string phoneNumber { get; set; }
    }
}
