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
- Open the SOLUTION in Visual Studio 2022
- Open the terminal and navigate to the project folder

```bash
cd TodoAppNetAngular
```

- build the project:
Ctrl + F5

This will install dependencies on the client-side as well

- install required dependencies
(in case that Visual Studio haven't installed them)

```bash
dotnet restore
```

⚠ IMPORTANT: before running the app, make sure to update the connection string in the appsettings.json file to your local SQL Server instance.

```bash
ConnectionStrings": {
  "DefaultConnection": "Data Source=[server name];Initial Catalog=[db name];User ID=[login];Password=[password];Connect Timeout=30;Encrypt=False;Trust Server Certificate=True;Application Intent=ReadWrite;Multi Subnet Failover=False"
}
```

- create a new database in your local SQL Server instance
- run the following command in the terminal to apply the migrations and create the tables in the database

```bash
dotnet ef database update
```


## Usage

please, follow the steps on link below to use the app:
[Link](https://imgur.com/a/heNk2ty)


## To Do in future versions:
- Apply unit tests on front-end and back-end

- Add Custom Identity User in .NET Core

- Apply SOLID principles into the front-end and back-end

- Refactor the front-end Angular with a better folder
structure and code organization

- Add a new feature to filter tasks

- A new Design for the app (color scheme, layout, etc.)

- Deploy the app to Azure
