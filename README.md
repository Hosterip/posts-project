# Posts project with backend and frontend 

# How to start Client:

`cd ./frontend`

`npm intall`

`npm run dev` 

# How to start Server 

`cd ./backend`

add .env file in backend folder with content: 

`DATABASE_URL="file:./dev.db"`
and `SECRET=YourSessionSecretHere`

also make sure that in app.ts file in cors middleware origin is same as link at which client is running

#

`npm install`

`npx prisma migrate dev --name init`

`npx prisma generate`

`npm run dev`
