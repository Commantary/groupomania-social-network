# Groupomania

## Technologies

### Back-end
![Generic badge](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![Generic badge](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Generic badge](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![Generic badge](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Generic badge](https://img.shields.io/badge/sequelize-323330?style=for-the-badge&logo=sequelize&logoColor=blue)
![Generic badge](https://img.shields.io/badge/json%20web%20tokens-323330?style=for-the-badge&logo=json-web-tokens&logoColor=pink)

### Front-end
![Generic badge](https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vue.js&logoColor=4FC08D)
![Generic badge](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Generic badge](https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white)

### Cloud
![Generic badge]( 	https://img.shields.io/badge/Digital_Ocean-0080FF?style=for-the-badge&logo=DigitalOcean&logoColor=white)



## About the project

Groupomania is a social network for employees of the Groupomania company. It allows employees to share their thoughts and opinions with each other.

The project is for the last project of the web developer training at OpenClassrooms.

We have to respect the following criteria in the PDF file: [PDF here](https://course.oc-static.com/projects/DWJ_FR_P7/DW+P7+28-09-2022+Sce%CC%81nario.pdf)

## Live demo
You can use the live demo here: [Groupomania](https://tommy-moreau.com/)

## Installation

### Back-end
1. Clone the repository
2. Install the dependencies (from `/backend` folder)
```bash 
npm install
```
3. Create a .env file in the root directory and add the following variables: (There is an example in the `.env.example` file)
```bash
JWT_SECRET=YOUR_SECRET
JWT_DURING=24h(24h for example)

BCRYPT_SALT_ROUND=10(10 is the default value)

IMAGES_DIR=../..
IMAGES_FOLDER=images

#For the database in dev mode
DB_USERNAME=YOUR_USERNAME
DB_PASSWORD=YOUR_PASSWORD
DB_DATABASE=groupomania_dev
DB_HOST=127.0.0.1

#For the database in prod
DB_USERNAME_PROD=YOUR_USERNAME
DB_PASSWORD_PROD=YOUR_PASSWORD
DB_DATABASE_PROD=groupomania_prod
DB_HOST_PROD=127.0.0.1
```
4. Create a database in PostgreSQL
5. Run the migrations
```bash
sequelize db:migrate
```
6. Run the seeders
```bash
sequelize db:seed:all
```
7. Run the server
```bash
npm run dev
```

### Front-end
1. Clone the repository
2. Install the dependencies (from `/frontend` folder)
```bash
yarn install
```
3. Create a .env file in the root directory and add the following variables: (There is an example in the `.env.example` file)
```bash
VITE_API_URL=http://localhost:3000
VITE_IMAGE_URL=http://localhost:3000/images/
```
4. Run the server
```bash
yarn dev
```

## Usage
### Back-end
A database in postgresql is required. A free example is host on [Digital Ocean](https://www.digitalocean.com/) with the following credentials:
```bash
Host:db-groupomania-prod-do-user-10564772-0.b.db.ondigitalocean.com
Port:25060
Username:tommy
Password:AVNS_XVrAfQE5VpcP7IDl1As
Database:db-groupomania-dev
```

You can know use the front end to test the application.
Or you can use [Postman](https://www.postman.com/) to test the API.

### Front-end
You can login in admin with the following credentials:
```bash
Email: admin@email.com
Password: $2b$10$5jg8SXoUJ2MJ/eYhbk5nqeJZLqtbOy12fAyjjgvN6mF8JJmFpHmeC
```

or demo user :
```bash
Email: joe@email.com
Password: Password123
```

For the other users, you can create your own account.

Feel free to test the application and give me your feedback. I will be happy to read it.

With the time I wish add messages between users but the time in my training is over the 27 Dec.

## License
Distributed under the [MIT](https://choosealicense.com/licenses/mit/) License

## Author
Created by [**@Commantary**](https://github.com/Commantary)
