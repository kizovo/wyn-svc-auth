# Wyn - Service User
This service will handle all about user registration, authentication, verification, etc

## Getting Started
To get started this service, simply follow this step using terminal:

Clone the project
```
git clone <url_repo>
```

Rename env.dev into .env found on root project folder
```
npm install
bun install
```

Create MySQL database using docker:
  - Install docker desktop https://www.docker.com/products/docker-desktop/
  - Running this command to create image & runs it:
  ```
  docker run --name mysql-container -p 3306:3306 -e "MYSQL_ROOT_PASSWORD= " -e "MYSQL_USER=<username>" -e "MYSQL_PASSWORD=<password>" -e "MYSQL_DATABASE=<database_name>" -v ~/mysql/db/:/var/lib/mysql/ -v ~/mysql/init/:/docker-entrypoint-initdb.d/ -d mysql
  ```  

Update DATABASE_URL value accordingly on .env file
Run migration files
```bash
bunx prisma migrate dev --name init
```

## Development
To start the development server run:
```bash
bun run dev
```

Open http://localhost:3000/ with your browser to see the result.
