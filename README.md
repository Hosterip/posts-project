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

#

`npm install`

`npx prisma migrate dev --name init`

`npx prisma generate`

`npm run dev`