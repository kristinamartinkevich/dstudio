# Front end React developer challenge


## Section 1. Web application

A company needs an internal web application for employees to manage tasks. The API for this application has been built already, and the next step is to build a Ul using React.
API
APl is available via this URL: http://api.calmplete.net/swagger/index.html
You can create a new account using endpoint api/InternalLogin/sign-up, then get an access token using
endpoint api/InternalLogin with parameter state = "Internal". Then you can use api/Todos endpoints to
manage your tasks passing "Bearer ‹access
_token>" in the "Authorization" header of all HTTP requests.

## UI
Ul is to create in this developer challenge.

## Functional requirements:
There should be a page with tasks (todos), that displays tasks titles and due dates. There should be a button to create a new task. If the user clicks this button a dialog or a new page should open, where the user can enter a new task's title, description and select a due date. After the user saves the task, this task should be presented on the tasks page. Also, there should be a possibility to edit a previously created task and an option to mark a task as completed.

## Non-functional requirements:

The application should be well structured to allow a further extension and new features implementation.
The application should be built using one of existing React Ul frameworks of the developer choice. The application can use existing packages/libraries for sending HTTP requests, managing state, storing data in internal storage if needed, etc. The application can use a hard-coded access token to access the API.