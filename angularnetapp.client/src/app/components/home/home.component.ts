import { Component, inject } from '@angular/core';
import { TodoService } from '../../services/todo/todo.service';
import { ITodo } from '../../model/todo';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  private todos: ITodo[] = [];
  private todoService = inject(TodoService);

  constructor() { }

  ngOnInit() {
    this.todoService.getTodos()
      .subscribe((data) => {
        this.todos = data;
      });
  }

}
