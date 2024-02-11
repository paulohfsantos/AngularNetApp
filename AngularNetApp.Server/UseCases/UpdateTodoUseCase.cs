using AngularNetApp.Server.Domain.Database;
using AngularNetApp.Server.Infra.Controllers.DTOs;

namespace AngularNetApp.Server.UseCases
{
    public class UpdateTodoUseCase(DatabaseContext databaseContext)
    {
        private readonly DatabaseContext _databaseContext = databaseContext;

        public async Task<UpdateTodoRequest> UpdateTodo(int id, UpdateTodoRequest request)
        {
            var existingTodo = await _databaseContext.Todos.FindAsync(id)
                ?? throw new Exception("Todo not found");

            existingTodo.Title = request.Title;
            existingTodo.IsCompleted = request.IsCompleted;
            existingTodo.Description = request.Description;

            await _databaseContext.SaveChangesAsync();

            return request;
        }
    }
}
