import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';

import { AppRoutingModule } from './app-routing.module';

import { AuthenticationHandler } from './common/getToken';

import { AppComponent } from './app.component';
import { ContainerComponent } from './components/container/container.component';
import { HomeComponent } from './components/home/home.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { AddTodoComponent } from './components/add-todo/add-todo.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

// dev extreme modules
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxFormModule } from 'devextreme-angular/ui/form';
import { DxiItemModule } from 'devextreme-angular/ui/nested';
import { DxiValidationRuleModule } from 'devextreme-angular/ui/nested';
import { DxToastModule } from 'devextreme-angular/ui/toast';
import { DxListModule } from 'devextreme-angular/ui/list';
import { DxCheckBoxModule } from 'devextreme-angular/ui/check-box';

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    LoginFormComponent,
    RegisterFormComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ContainerComponent,
    AddTodoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    DxButtonModule,
    DxiItemModule,
    DxFormModule,
    ReactiveFormsModule,
    DxiValidationRuleModule,
    DxToastModule,
    DxListModule,
    DxCheckBoxModule
  ],
  providers: [CookieService, AuthenticationHandler],
  bootstrap: [AppComponent]
})
export class AppModule { }
