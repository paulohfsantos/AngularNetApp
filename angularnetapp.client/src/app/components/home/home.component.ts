import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import notify from 'devextreme/ui/notify';
import { confirm } from 'devextreme/ui/dialog';
import { TodoService } from '../../services/todo/todo.service';
import { ITodo } from '../../model/todo';
import { ITodoRequest } from '../../DTOs/todo-request';

interface TodoCheckedEvent {
  addedItems: ITodo[];
  removedItems: ITodo[];
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  addTodoPopupVisible = false;
  updateTodoPopupVisible = false;
  todos: ITodo[] = [];

  private todoService = inject(TodoService);

  constructor() {}

  todoFormGroup = new FormGroup({
    title: new FormControl(
      '',
      [Validators.required]
    ),
    description: new FormControl(
      '',
      [Validators.required]
    ),
    isComplete: new FormControl(
      false
    )
  });

  updateTodoFormGroup = new FormGroup({
    id: new FormControl(0),
    title: new FormControl(
      '',
      [Validators.required]
    ),
    description: new FormControl(
      '',
      [Validators.required]
    ),
    isComplete: new FormControl(
      false
    )
  });

  toggleAddTodo() {
    this.addTodoPopupVisible = !this.addTodoPopupVisible;
  }

  toggleUpdateTodo() {
    this.updateTodoPopupVisible = !this.updateTodoPopupVisible;
  }

  fetchTodoList() {
    this.todoService.getTodos()
      .subscribe((todos) => {
        this.todos = todos;
      });
  }

  // select a todo from the list and returning it
  onTodoChecked(e: ITodo) {
    this.todoService.getTodoById(e?.id)
      .subscribe((todo) => {
        this.updateTodoFormGroup.patchValue(todo);
      });
  }

  todoUpdate(id: number, body: ITodoRequest) {
    console.log('todoUpdate', id, body);

    this.todoService.updateTodo(id, body)
      .subscribe(() => {
        this.fetchTodoList();
      });
  }

  // add todo then update list
  handleAddTodo() {
    if (this.todoFormGroup.invalid) {
      notify('Please fill in the required fields', 'error', 4000);
      return;
    }

    this.todoService
      .addTodo(this.todoFormGroup.value as ITodoRequest)
      .subscribe(() => {
        notify('Todo added successfully', 'success', 3000);
        this.todoFormGroup.reset();
        this.fetchTodoList();
        this.toggleAddTodo();
      });
  }

  // todo delete with confirmation
  onTodoHandleDelete(todo: ITodo) {
    confirm('Are you sure you want to delete this todo?', 'Confirm delete')
      .then((result) => {
        if (result) {
          this.onTodoDeleted(todo);
        }
      });

    this.fetchTodoList();
  }

  // todo delete handler
  onTodoDeleted(todo: ITodo) {
    this.todoService.deleteTodo(todo.id)
      .subscribe({
        next: () => {
          notify('Todo deleted successfully', 'success', 3000);
          this.fetchTodoList();
        },
        error: () => {
          notify('An error occurred while deleting the todo', 'error', 3000);
        }
      })
  }

  handleUpdateTodo() {
    if (this.updateTodoFormGroup.invalid) {
      notify('Please fill in the required fields', 'error', 4000);
      return;
    }

    this.todoUpdate(
      this.updateTodoFormGroup.value?.id as number,
      this.updateTodoFormGroup.value as ITodoRequest
    );
    this.toggleUpdateTodo();
  }

  ngOnInit() {
    this.fetchTodoList();
  }
}
