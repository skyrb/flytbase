### flytbase assignment

##### Run
    Install Node - Visit the official Node.js website: https://nodejs.org
    Install dependencies - npm i
    start  - npm run start


###### After the login you will get JWT token. So put it in flytbase Pre-request-script for all the API authorization.
    pm.request.headers.add({ key: 'Authorization', value: 'Bearer <token>' });


