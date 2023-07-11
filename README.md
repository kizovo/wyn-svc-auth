# Wyn: Service User (Work In Progress)
This service is a part of larger ecosystem which is Wyn project. The service serves things related to user registration, authentication, verification, etc. 

Service Name: svc-user  
Port used: 3001

## Getting Started
To get started this service, simply follow this step using terminal:

1. Clone the project
   ```
   git clone <url_repo>
   ```

2. Rename: env.dev to .env (can be found at root project folder)
3. Run below command
   ```
   npm install
   bun install
   ```

4. Create MySQL database using docker:
  - Install docker desktop https://www.docker.com/products/docker-desktop/
  - Running this command to create container, image & runs it:
     ```
     docker run --name <container_name> -p 3306:3306 -e "MYSQL_ROOT_PASSWORD=<root_password>" -e "MYSQL_USER=<username>" -e "MYSQL_PASSWORD=<password>" -e "MYSQL_DATABASE=<database_name>" -v ~/mysql/db/:/var/lib/mysql/ -v ~/mysql/init/:/docker-entrypoint-initdb.d/ -d mysql
     ```
  - if you only want to running the existing docker container:
     ```
     docker start <container_name>
     ```
  - Setup shadow database by entering MySQL container environment:
     ```
     docker exec -it mysql-container mysql -u root -p
     CREATE DATABASE <database_name>_shadow;
     SELECT User, Host FROM mysql.user;
     GRANT ALL ON <database_name>_shadow.* TO 'admin'@'%';
     FLUSH PRIVILEGES;
     ```

5. Update DATABASE_URL value accordingly on .env file
6. Run migration files
   ```bash
   bunx prisma migrate dev --name init (preferred way)
   prisma db push (alternate if above command doesn't work)
   ```

## Development
To start the development server run:
```bash
bun run dev
```

Open http://localhost:<server_port>/ with your browser to see the result.

## Basic Convention
1. Variable 
   - use camelCase
   - use descriptive names that convey the purpose or meaning of the variable or function   
   ```javascript
   var userName = "John Doe";
   let itemCount = 0;
   ```
2. Constant  
   - use UPPERCASE
   - separate words with underscores ("_") to improve readability
   ```javascript
   const MAX_ITEMS = 100;
   ```
3. Function
   - use camelCase
   - use descriptive and meaningful names that represent the class's purpose or behavior
   ```javascript
   function calculateAverage(a: number, b: number): number {
      return (a + b) / 2;
   }
   ```
4. Class
   - use PascalCase
   - use descriptive names that convey the purpose or meaning of the variable or function
   ```javascript
   class UserService {
      constructor() {
        // init class
      }
   }
   ```
5. File & folder naming for: **Models**
   - Use the name of the entity followed by "Model" suffix.
   - Use PascalCase (also known as UpperCamelCase) for filenames.
   - End the filename with ".ts" to indicate it's a TypeScript file.   
   Example: **UserModel.ts**
6. File & folder naming for: **Handlers**
   - Use the name of the entity followed by "Handler" suffix.
   - Use PascalCase for filenames.
   - End the filename with ".ts" to indicate it's a TypeScript file.   
   Example: **UserHandler.ts**
7. File & folder naming for: **Services**
   - Use the name of the entity followed by "Service" suffix.
   - Use PascalCase for filenames.
   - End the filename with ".ts" to indicate it's a TypeScript file.   
   Example: **UserService.ts**
8. File & folder naming for: **Repositories**
   - Use the name of the entity followed by "Repository" suffix.
   - Use PascalCase for filenames.
   - End the filename with ".ts" to indicate it's a TypeScript file.   
   Example: **UserRepository.ts**

## Basic Architecture
- Application start from file: **src/index.ts**
- API route to define the URL path at: **src/Routes.ts**
- All env loaded at: **src/config.ts**
- All global constant at: **src/constant.ts**
- Dependencies Injection at: **src/Setup.ts**   
### Flow:
  A request hit an endpoint that the path defined by **routes**, the request then will be catch by **handlers**. One route only have one handler. Handler will act as a **request sanitizer** before it pass to a service and the response callback will be formatted as a standarized response before it sent back to the client. Handler passes the request to a service. One handler only have one service, but one service may call several repositories. **Repositories** handle query to database.   

---
### Disclaimer   
Do not use this repository for production, if you insists to use it, you should known your own risks.

---   
   
This repository belongs to:   
&copy; Rheza Sindhuwinata  
Senior Web Developer   
Based on Surabaya, Indonesia

And intended for personal use only. If you have any questions or suggestions feel free to contact me at rheza.s@gmail.com  
