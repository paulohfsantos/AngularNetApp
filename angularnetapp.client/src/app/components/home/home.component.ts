import { Component, OnInit, inject } from '@angular/core';
import { TodoService } from '../../services/todo/todo.service';
import { ITodo } from '../../model/todo';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ITodoRequest } from '../../DTOs/todo-request';
// import { AuthService } from '../../services/auth/auth.service';
// import { CookieService } from 'ngx-cookie-service';

interface TodoCheckedEvent {
  addedItems: ITodo[];
  // component?: Component;
  // element?: Element;
  removedItems: ITodo[];
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  addTodoPopupVisible = false;
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

  toggleAddTodo() {
    this.addTodoPopupVisible = !this.addTodoPopupVisible;
  }

  fetchTodoList() {
    this.todoService.getTodos().subscribe((todos) => {
      this.todos = todos;
    });
  }

  onTodoAdded() {
    this.toggleAddTodo();
  }

  onTodoChecked(event1: TodoCheckedEvent, event2: TodoCheckedEvent) {
    console.log(event1, event2);
  }

  onTaskOptionsClick(task: ITodo) {
    console.log('Options clicked for task:', task);
  }

  handleAddTodo() {
    if (this.todoFormGroup.invalid) {
      return;
    }

    this.todoService
      .addTodo(this.todoFormGroup.value as ITodoRequest)
      .subscribe(() => {
        this.todoFormGroup.reset();
        this.fetchTodoList();
        this.toggleAddTodo();
      });
  }

  ngOnInit() {
    this.fetchTodoList();
  }
}
