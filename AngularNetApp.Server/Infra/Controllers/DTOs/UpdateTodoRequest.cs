namespace AngularNetApp.Server.Infra.Controllers.DTOs
{
    public class UpdateTodoRequest
    {
        public int Id { get; set; }
        public required string Title { get; set; }
        public bool IsCompleted { get; set; }
        public required string Description { get; set; }
    }
}
