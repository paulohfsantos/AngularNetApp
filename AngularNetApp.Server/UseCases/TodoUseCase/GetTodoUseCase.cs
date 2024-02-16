using AngularNetApp.Server.Domain.Database;
using AngularNetApp.Server.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace AngularNetApp.Server.UseCases.TodoUseCase
{
    public class GetTodoUseCase(DatabaseContext databaseContext)
    {
        private readonly DatabaseContext _databaseContext = databaseContext;

        public async Task<Todo> GetTodoById(int id)
        {
            if (id <= 0)
            {
                throw new Exception("Todo not found");
            }
            var TodoId = await _databaseContext.Todos.FirstOrDefaultAsync(x => x.Id == id);

            return TodoId ?? throw new Exception("Todo not found");
        }
    }
}
