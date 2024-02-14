import { Component, OnInit, inject } from '@angular/core';
import { TodoService } from '../../services/todo/todo.service';
import { ITodo } from '../../model/todo';

interface TodoCheckedEvent {
  addedItems: ITodo[];
  // component?: Component;
  // element?: Element;
  removedItems: ITodo[];
}

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent implements OnInit {
  todoService = inject(TodoService);
  todos: ITodo[] = [];

  constructor() {}

  handleGetTodos() {
    this.todoService.getTodos()
      .subscribe((todos: ITodo[]) => {
        this.todos = todos;
      });
  }

  onTodoChecked(event1: TodoCheckedEvent, event2: TodoCheckedEvent) {
    console.log(event1, event2);
  }

  onTaskOptionsClick(task: ITodo) {
    console.log('Options clicked for task:', task);
  }

  ngOnInit() {
    this.handleGetTodos();
  }
}
