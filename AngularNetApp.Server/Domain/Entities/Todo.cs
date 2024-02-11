using System.ComponentModel.DataAnnotations;

namespace AngularNetApp.Server.Domain.Entities
{
    public class Todo
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public required string Title { get; set; }

        [Required]
        public bool IsCompleted { get; set; }

        [Required]
        public required string Description { get; set; }
    }
}
