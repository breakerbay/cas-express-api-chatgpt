# cas-express-api-chatgpt
Implements the Accounts API as per the OpenAPI specification using Node.js, Express, TypeScript, and MySQL.


## Typescript

```
npx tsc --init

Created a new tsconfig.json with:                                                                                    
                                                                                                                  TS 
  target: es2016
  module: commonjs
  strict: true
  esModuleInterop: true
  skipLibCheck: true
  forceConsistentCasingInFileNames: true


Details at https://aka.ms/tsconfig
```

## Project Structure

├── src
│   ├── controllers
│   ├── routes
│   ├── models
│   ├── config
│   ├── app.ts
├── .env
└── tsconfig.json

## Routes


* http://localhost:3000/api/actionCategories
  * http://localhost:3000/api/actionCategories/1
* http://localhost:3000/api/accounts
  * http://localhost:3000/api/accounts/1
* http://localhost:3000/api/checklists
  * http://localhost:3000/api/checklists/1
* http://localhost:3000/api/projects
  * http://localhost:3000/api/projects/4
* http://localhost:3000/api/users
  * http://localhost:3000/api/users/1

## MySQL

mysql> show tables;
+-----------------------------+
| Tables_in_checklist2        |
+-----------------------------+
| account_job_members         |
| account_plans               |
| account_types               |
| account_users               |
| accounts                    |
| actioncategory              |
| actiontype                  |
| audit_checkpointvalue       |
| checker                     |
| checker_location            |
| checklist                   |
| checklist_groups            |
| checklist_types             |
| checklistgroup              |
| checkpoint                  |
| checkpointvalue             |
| checkpointvalue_followup    |
| company                     |
| file                        |
| followupaction              |
| job                         |
| job_checker                 |
| job_progress                |
| job_project_checklist       |
| job_summary                 |
| job_workareas_position      |
| members                     |
| milestone                   |
| milestone_jobs              |
| milestone_subscriber        |
| organization                |
| people                      |
| places                      |
| places_projects             |
| places_workareas            |
| project                     |
| project_checker             |
| project_checklist_workareas |
| project_checklists          |
| project_checklists_view     |
| project_customer            |
| projectaction               |
| projecthistory              |
| projectstatus               |
| role                        |
| roles                       |
| user_checklist              |
| user_role                   |
| user_worklot                |
| users                       |
| users_roles                 |
| workarea                    |
| workarea_checker            |
| worklot                     |
+-----------------------------+

## TODO - Routes for Tables

+-----------------------------+
| Tables_in_checklist2        |
+-----------------------------+
| actiontype                  |
| checklist_groups            |
| checklist_types             |
| checkpoint                  |
| checkpointvalue             |
| checkpointvalue_followup    |
| file                        |
| followupaction              |
| job                         |
| job_checker                 |
| members                     |
| milestone                   |
| places                      |
| project_checker             |
| role                        |
| roles                       |
| users_roles                 |
| workarea                    |
| workarea_checker            |
| worklot                     |

## Sart MySQL

```
sudo /usr/local/mysql/support-files/mysql.server start
```

## Model Prompt 1

Following the pattern of the above code can you also provide ActionCategory code for the operations defined the attached action-categories.yaml file?

## User with Projects
```
{
  "id": "22",
  "name": "Richard Hancock",
  "username": "rich",
  "email": "breakerbay@hotmail.com",
  "mobile": "+64 272597224",
  "projects": [
    {
      "id": "292",
      "accountId": "22",
      "number": "6",
      "name": "Sunday2017-01-15",
      "descr": "Sunday2017-01-15 D",
      "accountName": "Richard Hancock 1",
      "accountUserId": "22",
      "accountOwner": "Richard Hancock"
    },
    {
      "id": "295",
      "accountId": "22",
      "number": "9",
      "name": "d12kai Objective Servers",
      "descr": "Systematically test DocumentServicesV1x , ecs-repository-services, ap1-invoice-web-services in order to collect information required to debug the javax.net.ssl.SSLException: java.lang.UnsupportedOperationException error that occurs when connecting to the ",
      "accountName": "Richard Hancock 1",
      "accountUserId": "22",
      "accountOwner": "Richard Hancock"
    },
    {
      "id": "299",
      "accountId": "22",
      "number": "10",
      "name": "project-2017-05-07",
      "descr": "project-2017-05-07",
      "accountName": "Richard Hancock 1",
      "accountUserId": "22",
      "accountOwner": "Richard Hancock"
    },
    {
      "id": "312",
      "accountId": "22",
      "number": "12",
      "name": "Hold Points Project - Test",
      "descr": "Test hold points\n",
      "accountName": "Richard Hancock 1",
      "accountUserId": "22",
      "accountOwner": "Richard Hancock"
    },
    {
      "id": "331",
      "accountId": "22",
      "number": "13",
      "name": "Storm Water Steps",
      "descr": "Storm Water Steps is a sub project of the overall development of 137 Breaker Bay. The steps up the northern side of the garage will provide access up that side of the property. The sub project is called Storm Water Steps as it will be built so as to allow",
      "accountName": "Richard Hancock 1",
      "accountUserId": "22",
      "accountOwner": "Richard Hancock"
    },
    {
      "id": "389",
      "accountId": "89",
      "number": "1",
      "name": "Feature List",
      "descr": "These the features and functionality of the Checklist Engine Web Site.",
      "accountName": "Checklist Engine Web Site",
      "accountUserId": "22",
      "accountOwner": "Richard Hancock"
    },
    {
      "id": "402",
      "accountId": "22",
      "number": "22",
      "name": "137 Breaker Bay Road - Landscaping and small Jobs",
      "descr": "Landscaping and small Jobs",
      "accountName": "Richard Hancock 1",
      "accountUserId": "22",
      "accountOwner": "Richard Hancock"
    },
    {
      "id": "416",
      "accountId": "13",
      "number": "5",
      "name": "Photo Testing Project",
      "descr": "Project based on house inspection",
      "accountName": "John Anderson",
      "accountUserId": "13",
      "accountOwner": "John Anderson"
    },
    {
      "id": "428",
      "accountId": "22",
      "number": "25",
      "name": "137A Breaker Bay Road - Garden",
      "descr": "The 137A Breaker Bay Road - Garden project describes work required for the garden.",
      "accountName": "Richard Hancock 1",
      "accountUserId": "22",
      "accountOwner": "Richard Hancock"
    },
    {
      "id": "430",
      "accountId": "22",
      "number": "26",
      "name": "Shopping List",
      "descr": "Shopping List - 2022-04-24",
      "accountName": "Richard Hancock 1",
      "accountUserId": "22",
      "accountOwner": "Richard Hancock"
    },
    {
      "id": "431",
      "accountId": "22",
      "number": "27",
      "name": "TODO List - Construction Assurance",
      "descr": "Screen Improvements for the main web site, currently http://brogo.net.au/checklist",
      "accountName": "Richard Hancock 1",
      "accountUserId": "22",
      "accountOwner": "Richard Hancock"
    },
    {
      "id": "437",
      "accountId": "116",
      "number": "1",
      "name": "To Do List  - 2022-06-13",
      "descr": "Things to do 2022-06-13",
      "accountName": "To Do",
      "accountUserId": "22",
      "accountOwner": "Richard Hancock"
    },
    {
      "id": "502",
      "accountId": "22",
      "number": "32",
      "name": "iPad Review",
      "descr": "Test that the iPad, Browser Web Site and Mobile  Web Site work together",
      "accountName": "Richard Hancock 1",
      "accountUserId": "22",
      "accountOwner": "Richard Hancock"
    }
  ]
}
```
