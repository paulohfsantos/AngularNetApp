# To Do App

- fullstack app made with ASP.NET Core and Angular 17

## Features
- Add a new task
- Updating a task by marking as completed
- Delete a task
- List all tasks

## Technologies
- .NET Core 8
- Angular 17
- Entity Framework Core
- SQL Server

## Installation
- Clone the repository
- Open the project in Visual Studio 2022
- Open the terminal and navigate to the project folder

```bash
cd TodoAppNetAngular
```

- build the project

```bash
dotnet build
```

- install required dependencies

```bash
dotnet restore
```

⚠ IMPORTANT: before running the app, make sure to update the connection string in the appsettings.json file to your local SQL Server instance.

- create a new database in your local SQL Server instance
- run the following command in the terminal to apply the migrations and create the tables in the database

```bash
dotnet ef database update
```


## Usage

please, follow the steps on link below to use the app:
[Link](https://imgur.com/a/heNk2ty)