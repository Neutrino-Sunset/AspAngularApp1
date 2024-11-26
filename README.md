# AspAngularApp1

This project demonstrates how to create a new project with an Angular front-end and an ASP Core back-end.
Includes database support using Entity Framework, and authentication using Azure AD.

## Steps to create

Update Angular (if required)

> npm i -g @angular/cli@latest

Create ASP Angular project using `Angular and ASP.NET Core` Visual Studio project template

Disable nullable for service project, in project properties -> Build -> General

Disable Launch Browser for service project, in project properties -> Debug -> Open debug launch profiles UI

Update client proxy config - in proxy.conf.js set context to `/api` and add `/api` to any controller routes

Create model in service project

- Create model class in Model/Entities

Scaffold controller

- Right click Controllers and select Add -> New Scaffolded Item...
- Select `API controller with actions, using Entity Framework`
- Select model class, select new DbContext in Model/Data
- Change Database name in appsettings.json
- Run `add-migration InitialCreate`
- Run `update-database`

Ignore service dependencies

Add authentication

- Create Azure Application Registration
	- Add redirect https://localhost:55959/
	- Leave `Access tokens` and ID tokens` option unchecked
	- Accounts in this organizational directory only
- Install msal-browser `npm i @azure/msal-browser`
- Add AuthService, update tenantId and clientId.
- Call AuthService initialize in AppComponent.ngOnInit
- Wire up login/logout buttons





