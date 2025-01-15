# Business Meeting Management
A web application designed for any business owner providing appointment services to customers based on predefined service packages.

## Project Structure
The project is divided into two parts:
- **Client**: The front-end built with Vite, React, TypeScript.
- **Server**: The back-end built with Node.js and Express.


## System Requirements
- Node.js
- npm

## Installation

1. Clone the repository:
   ```git clone https://github.com/RutiRozenberg/Business-Management.git```
2. Install dependencies for the server:
   - ```cd .\backend\```
   - ```npm i```
   - Create .env file in ```.\backend\src\config\``` . 
     
     example:
     ```
     PORT = 3000 
     DB_URL = mongodb://127.0.0.1:27017/business_managment 
     SECRET = ferufbyhegrjeirng!!&&chkvvbfdjbvekjr454!<>?ho 
     CLIENT=http://localhost:5173 
     SWAGGER=http://localhost:3000
     ```




3. Install dependencies for the client:
   - ```cd .\frontend\```
   - ```npm i```
   - Create .env file in ```.\frontend\``` . 
     
     example:
     
     `VITE_BASE_URL_SERVER=http://localhost:3000/`


## Running the Project

Start the server:
 - ```cd .\backend\```
 - ```ts-node .\src\app.ts```


Start the client:
 - ```cd .\frontend\```
 - ```npm run dev```

## Usage
The server runs at:
``` http://localhost:3000 ```

Swagger documentation is available at:
``` http://localhost:3000/api-docs/ ```

The client runs at:
``` http://localhost:5173/ ```

## Functionalities
**Admin**
- Creates and updates business details.
- Creates, updates, and deletes service packages.
- Creates, updates, and deletes appointment times.
- Has the option to cancel an appointment.

**User**
- Can view business details.
- Can view service packages.
- Can register and log into the system.

**Logged-in User**
- Can schedule an appointment that includes the appointment time and is linked to a service package provided by the business owner.









