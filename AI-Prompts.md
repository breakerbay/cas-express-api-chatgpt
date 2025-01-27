## Model Prompt 1

Following the pattern of the above code can you also provide FollowupAction code for the operations defined in the attached followupactions.yaml file?
Use the database table "followupaction" and place the database code within the controller.
Place the Typescript interface classes that match the component schemas defined in the OpenAPI specifications in the models directory.
JSON Array returned by functions such as getFollowupActions take the form:

[
{ ... },
{ ... }
]

## Model Prompt 2

A RESTful API is being developed using Node.js, Express and Typescript to match OpenAPI specfications.
The project containing the Typescript code is structured as follows

├── src
│   ├── controllers
│   ├── routes
│   ├── models
│   ├── config
│   ├── app.ts
├── .env
├── package.json
└── tsconfig.json

The models directory contains the Typescript interface classes that match the component schemas defined in the OpenAPI specifications.

Routes are defined using the Express Router

const router = express.Router();
router.get('/accounts', getAccounts);

with Controllers creating the functions (e.g. getAccounts) that query a MySqL Database and create JSON responses.

JSON Array returned by functions such as getAccounts take the form:

[
{ ... },
{ ... }
]

Following the pattern described above code can you provide ChecklistType code for the operations defined in the attached checklist-types.yaml file?
