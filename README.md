# AspAngularApp1

## Steps to create

Update Angular (if required)

> npm i -g @angular/cli@latest

Create ASP Angular project

Disable nullable
Disable Launch Browser for service project

Update proxy config - In proxy.conf.js set context to '/api' and add '/api' to any controller routes

Create model
	Create model class in Model/Entities

Scaffold controller
	Right click Controllers and select Add -> New Scaffolded Item...
	Select 'API controller with actions, using Entity Framework'
	Select model class, select new DbContext in Model/Data
	Change Database name in appsettings.json
	Run `add-migration InitialCreate`
	Run `update-database`

Ignore service dependencies

Add authentication