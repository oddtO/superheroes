




## Deployment

* [See on netlify](https://superheroes82320.netlify.app/)


<!-- GETTING STARTED -->
## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You will need `Node.js` and `npm` installed globally on your machine.
* [Downloading and installing Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/oddtO/superheroes.git
   ```

#### Running the server
2. Enter the backend directory 
   ```sh
   cd server
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Initialize database with schema and data (can use .env.local, .env.production or any other .env file)
   ```sh
   ENV_FILE=.env npm run dbinit
   ```
4. Run dev server on http://localhost:3000 (reads database info from .env.local file by default)
   ```sh
   npm run start-dev
   ```
5. Compile for production
   ```sh
   npm run build
   ```
6. Run production code 
   ```sh
   node ./dist/index.js
   ```

#### Running server side tests


1. Create a separate database for testing 

2. Declare PGURI environment variable linking to the postgresql database in .env.test

3. Run tests 
   ```sh
   npm run test
   ```





#### Running the client


1. Enter the frontend directory 
   ```sh
   cd client
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
4. Run dev server on http://localhost:5173 
   ```sh
   npm run dev
   ```
5. Compile for production
   ```sh
   npm run build
   ```
6. Run production code (must do the one step above first) 
   ```sh
   npm run preview
   ```




#### Running client side tests




1. Run tests 
   ```sh
   npm run test
   ```





## Features

* Allow users to perform CRUD operations on superhero data.
* Allow storing multiple images for the same superhero or even none images.
* Dispays image of anonymous for superheroes without images.
* Superheroes are divided into pages for better navigation experience.
* Superhero data is stored in a database.
* Input validation on the client side and on the server side.







## Built With

#### Technologies

##### Server side

* Typescript
* Express
* NodeJS
* PostgreSQL
* Jest
* Supertest



##### Client side

* Typescript
* SCSS
* React
* React Router
* Vite
* Vitest






<!-- AUTHORS -->
## Author

* [Github](https://github.com/oddtO)
* [LinkedIn](https://www.linkedin.com/in/dmytro-yefimov-316690207/)
* [Dou](https://dou.ua/users/oddto/)
<p align="right">(<a href="#top">back to top</a>)</p>


