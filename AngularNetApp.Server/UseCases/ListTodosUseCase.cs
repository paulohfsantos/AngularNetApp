using AngularNetApp.Server.Domain.Database;
using AngularNetApp.Server.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace AngularNetApp.Server.UseCases
{
    public class ListTodosUseCase(DatabaseContext databaseContext)
    {
        private readonly DatabaseContext _databaseContext = databaseContext;

        public async Task<IEnumerable<Todo>> GetAllTodos()
        {
            return await _databaseContext.Todos.ToListAsync();
        }
    }
}
