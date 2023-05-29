# VIEW CONTENT OF DB WITH Adminer

I added to Adminer to Docker to view Db tables more comfortable. You find it on localhost:8080 (port number is in docker-compose)
System: PostgreSQL
Server: postgres
Username: admin
Password: admin
Database: db


# DOCKER



### REQUIREMENTS
- download docker desktop: https://www.docker.com/products/docker-desktop/

### COMMANDS

 - docker-compose -f docker-compose.yml up -d
   Stars a database and adminer.
   (You need to CD to backend directory, -f flag just specify file)

### TROUBLES THAT I RAN TO
TO-DO (Or add if you want :)

### MIGRATION
npx prisma migrate dev --name "name of new migration" --schema .\backend\prisma\schema.prisma

### SEED DATABASE
npm run seed

### START APP
npm run watch


### STEPS
- create .env file and copy content of .envexample to it
- install docker desktop
- docker-compose -f docker-compose.yml up -d
- npx prisma migrate dev --name last-migration-name --schema .\backend\prisma\schema.prisma
  (example: npx prisma migrate dev --name addUniqueToWinAndLicensePlate --schema .\prisma\schema.prisma)
- npm run seed
- npm run watch
- enjoy !
