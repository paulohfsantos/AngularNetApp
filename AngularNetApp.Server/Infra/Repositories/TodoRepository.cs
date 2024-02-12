using AngularNetApp.Server.Domain.Database;
using AngularNetApp.Server.Domain.Entities;
using AngularNetApp.Server.Domain.Repositories;
using AngularNetApp.Server.Infra.Controllers.DTOs;
using AngularNetApp.Server.UseCases;

namespace AngularNetApp.Server.Infra.Repositories
{
    public class TodoRepository(DatabaseContext databaseContext) : ITodoRepository
    {
        private readonly AddTodoUseCase _addTodo = new AddTodoUseCase(databaseContext);
        private readonly GetTodoUseCase _getTodo = new GetTodoUseCase(databaseContext);
        private readonly ListTodosUseCase _getAllTodos = new ListTodosUseCase(databaseContext);
        private readonly RemoveTodoUseCase _removeTodo = new RemoveTodoUseCase(databaseContext);
        private readonly UpdateTodoUseCase _updateTodo = new UpdateTodoUseCase(databaseContext);

        public async Task<Todo> CreateTodo(AddTodoRequest request)
        {
            return await _addTodo.CreateTodo(request);
        }

        public async Task<IEnumerable<Todo>> GetAllTodos()
        {
            return await _getAllTodos.GetAllTodos();
        }

        public async Task<Todo> GetTodoById(int id)
        {
            return await _getTodo.GetTodoById(id);
        }

        public async Task<UpdateTodoRequest> UpdateTodo(int id, UpdateTodoRequest request)
        {
            return await _updateTodo.UpdateTodo(id, request);
        }

        public async Task<Todo> DeleteTodoById(int id)
        {
            return await _removeTodo.DeleteTodoById(id);
        }
    }
}
