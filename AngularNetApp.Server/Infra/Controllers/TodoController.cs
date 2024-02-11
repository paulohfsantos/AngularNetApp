using AngularNetApp.Server.Infra.Controllers.DTOs;
using AngularNetApp.Server.Infra.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace AngularNetApp.Server.Infra.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodoController(TodoRepository todoRepository) : ControllerBase
    {
        private readonly TodoRepository _todoRepository = todoRepository;

        [HttpGet]
        public async Task<IActionResult> GetAllTodos()
        {
            try
            {
                var result = await _todoRepository.GetAllTodos();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTodoById(int id)
        {
            try
            {
                var result = await _todoRepository.GetTodoById(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateTodo([FromBody] AddTodoRequest request)
        {
            try
            {
                var result = await _todoRepository.CreateTodo(request);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTodo(int id, [FromBody] UpdateTodoRequest request)
        {
            try
            {
                var result = await _todoRepository.UpdateTodo(id, request);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTodoById(int id)
        {
            try
            {
                var result = await _todoRepository.DeleteTodoById(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}
