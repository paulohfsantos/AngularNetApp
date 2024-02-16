import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import notify from 'devextreme/ui/notify';
import { confirm, custom } from 'devextreme/ui/dialog';
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
  // TODO: implement the SOLID pattern and split
  // between different components with their own responsibilities

  addTodoPopupVisible = false;
  updateTodoPopupVisible = false;
  todos: ITodo[] = [];

  private todoService = inject(TodoService);

  constructor(private formBuilder: FormBuilder) {}

  todoFormGroup = new FormGroup({
    title: new FormControl(
      '',
      [Validators.required]
    ),
    description: new FormControl(
      '',
      [Validators.required]
    ),
    isCompleted: new FormControl(
      false
    )
  });

  updateTodoFormGroup = new FormGroup({
    id: new FormControl(0),
    title: new FormControl(''),
    description: new FormControl(''),
    isCompleted: new FormControl(false)
  });

  getItemStyle(item: ITodo): any {
    return item.isCompleted
      ? {
          'background-color': 'lightgreen',
          'text-decoration': 'line-through',
          'color': '#333'
        }
      : {
          'background-color': 'lightcoral',
          'text-decoration': 'none',
          'color': '#333'
        };
  }

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

  // select a todo from the list
  onTodoChecked(e: ITodo) {
    this.todoService.getTodoById(e?.id)
      .subscribe((todo) => {
        this.updateTodoFormGroup.patchValue(todo);
      });
  }

  // submit update todo
  handleTodoUpdate() {
    const id = this.updateTodoFormGroup.value?.id as number;
    const body = this.updateTodoFormGroup.value as ITodoRequest;

    this.todoService.updateTodo(id, body)
      .subscribe({
        next: () => {
          notify('Todo updated successfully', 'success', 3000);
          this.todoFormGroup.reset();
          this.fetchTodoList();
          this.updateTodoPopupVisible = false;
        },
        error: () => {
          notify('An error occurred while updating the todo', 'error', 3000);
        }
      });
  }

  // submit add todo
  handleAddTodo() {
    if (this.todoFormGroup.invalid) {
      notify('Please fill in the required fields', 'error', 4000);
      return;
    }

    this.todoService
      .addTodo(this.todoFormGroup.value as ITodoRequest)
      .subscribe({
        next: () => {
          notify('Todo added successfully', 'success', 3000);
          this.todoFormGroup.reset();
          this.fetchTodoList();
          this.toggleAddTodo();
        },
        error: () => {
          notify('An error occurred while adding the todo', 'error', 3000);
        }
      })
  }

  // submit delete todo
  onTodoHandleDelete(todo: ITodo) {
    confirm('Are you sure you want to delete this todo?', 'Confirm delete')
      .then((result) => {
        result && this.onTodoDeleted(todo);
      });

    this.fetchTodoList();
  }

  // todo delete method
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

  ngOnInit() {
    this.fetchTodoList();

    this.updateTodoFormGroup = this.formBuilder.group({
      id: [0],
      title: [''],
      description: [''],
      isCompleted: [false]
    });
  }
}
