using AngularNetApp.Server.Domain.Database;
using AngularNetApp.Server.Domain.Entities;

namespace AngularNetApp.Server.UseCases.TodoUseCase
{
    public class RemoveTodoUseCase(DatabaseContext databaseContext)
    {
        private readonly DatabaseContext _databaseContext = databaseContext;

        public async Task<Todo> DeleteTodoById(int id)
        {
            var existingTodo = await _databaseContext.Todos.FindAsync(id)
                ?? throw new Exception("Todo not found");

            _databaseContext.Todos.Remove(existingTodo);
            await _databaseContext.SaveChangesAsync();

            return existingTodo;
        }
    }
}
