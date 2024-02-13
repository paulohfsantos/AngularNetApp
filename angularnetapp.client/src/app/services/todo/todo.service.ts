import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { ITodoRequest } from '../../DTOs/todo-request';
import { AuthenticationHandler } from '../../common/getToken';
import { ITodo } from '../../model/todo';

@Injectable({ providedIn: 'root' })
export class TodoService {
  private http = inject(HttpClient);
  private cookies = inject(CookieService);
  private authHandler = inject(AuthenticationHandler);
  private readonly token: string;

  constructor() {
    // refactor this later
    this.token = this.cookies.get('accessToken');
  }

  getTodos() {
    return this.http.get<ITodo[]>(
      'api/Todo',
      this.authHandler.setToken(this.token)
    );
  }

  getTodoById(id: number) {
    return this.http.get<ITodo>(
      `api/Todo/${id}`,
      this.authHandler.setToken(this.token)
    );
  }

  addTodo(todo: ITodoRequest) {
    return this.http.post<ITodo>(
      'api/Todo',
      todo,
      this.authHandler.setToken(this.token)
    );
  }

  updateTodo(id: number, todo: ITodoRequest) {
    return this.http.put<ITodo>(
      `api/Todo/${id}`,
      todo,
      this.authHandler.setToken(this.token)
    );
  }

  deleteTodo(id: string) {
    return this.http.delete(
      `api/Todo/${id}`,
      this.authHandler.setToken(this.token)
    );
  }
}
