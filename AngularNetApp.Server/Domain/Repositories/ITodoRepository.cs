using AngularNetApp.Server.Domain.Entities;
using AngularNetApp.Server.Infra.Controllers.DTOs;

namespace AngularNetApp.Server.Domain.Repositories
{
    public interface ITodoRepository
    {
        Task<Todo> CreateTodo(AddTodoRequest request);
        Task<IEnumerable<Todo>> GetAllTodos();
        Task<Todo> GetTodoById(int id);
        Task<UpdateTodoRequest> UpdateTodo(int id, UpdateTodoRequest request);
        Task<Todo> DeleteTodoById(int id);
    }
}
