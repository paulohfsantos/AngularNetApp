import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { TodoService } from '../../services/todo/todo.service';
import { ITodoRequest } from '../../DTOs/todo-request';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrl: './add-todo.component.css'
})
export class AddTodoComponent {
  @Input() addTodoPopupVisible: boolean = false;
  @Output() todoAdded = new EventEmitter<boolean>();

  todoService = inject(TodoService);

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

  constructor() { }

  handleAddTodo() {
    if (this.todoFormGroup.invalid) {
      return;
    }

    this.todoService
      .addTodo(this.todoFormGroup.value as ITodoRequest)
      .subscribe(() => {
        this.todoFormGroup.reset();
        this.todoAdded.emit(true);
      });
  }
}
