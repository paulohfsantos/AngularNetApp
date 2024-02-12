import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
// dev extreme modules
// import { DxButtonModule } from 'devextreme-angular';
import { DxButtonModule } from 'devextreme-angular/ui/button';

@NgModule({
  declarations: [
    AppComponent,
    TodoItemComponent,
    TodoListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    DxButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
