# AspAngularApp1

This project demonstrates how to create a new project with an Angular front-end and an ASP Core back-end.

Includes database support using Entity Framework, and authentication using Azure AD.

## Steps to create

Update Angular (if required)

> npm i -g @angular/cli@latest

Create ASP Angular project using `Angular and ASP.NET Core` Visual Studio project template

Disable nullable for service project

> project properties -> Build -> General

Disable Launch Browser for service project

> project properties -> Debug -> Open debug launch profiles UI

Update client proxy config

- In client project `proxy.conf.js` set context to `/api`
- In service project add `api/` to any controller route attributes

Create model in service project

- Create model class in `Model/Entities`

Scaffold controller

- Right click Controllers and select `Add -> New Scaffolded Item...`
- Select `API controller with actions, using Entity Framework`
- Select model class, select new DbContext in `Model/Data`
- Change generated DbContext name from full application name to `AppDbContext`
- Change Database name in `appsettings.json` from application name and guild to just application name
- Run `add-migration InitialCreate`
- Run `update-database`

Ignore service dependencies

- Add `serviceDependencies.json` and `serviceDependencies.local.json` to `.gitignore`

Add authentication

- Create Azure Application Registration
	- Add redirect https://localhost:55959/
	- Leave `Access tokens` and `ID tokens` option unchecked
	- Select `Accounts in this organizational directory only`
- In client project install msal-browser `npm i @azure/msal-browser`
- Add AuthService, update tenantId and clientId.
- Call `AuthService.init` in `AppComponent.ngOnInit`
- Wire up login/logout buttons





