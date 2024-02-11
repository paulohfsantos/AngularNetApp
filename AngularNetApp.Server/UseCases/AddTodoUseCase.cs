using AngularNetApp.Server.Domain.Database;
using AngularNetApp.Server.Domain.Entities;
using AngularNetApp.Server.Infra.Controllers.DTOs;

namespace AngularNetApp.Server.UseCases
{
    public class AddTodoUseCase(DatabaseContext databaseContext)
    {
        private readonly DatabaseContext _databaseContext = databaseContext;

        public async Task<AddTodoRequest> CreateTodo(AddTodoRequest request)
        {
            var todo = new Todo
            {
                Title = request.Title,
                IsCompleted = request.IsCompleted,
                Description = request.Description
            };

            if (string.IsNullOrEmpty(todo.Title))
            {
                throw new Exception("Title is required");
            }

            await _databaseContext.Todos.AddAsync(todo);
            await _databaseContext.SaveChangesAsync();

            return request;
        }
    }
}
