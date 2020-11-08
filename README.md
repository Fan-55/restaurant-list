## Restaurant List

This is a web application for you to list whatever restaurant you like.  

Try it on heroku [click here](https://mysterious-atoll-13835.herokuapp.com/users/login)

![](/screenShots/restaurant_list.png)


### Features
---
- register user's own account
- log in via user's own account
- log in via Facebook
- search restaurants by title
- filter restaurants by category using "餐廳種類" dropdown menu
- click the restaurant image or title to see its detail information 
- click the "建立新餐廳" button to create a new item to the list
- click "Edit" button to modify the detail information of chosen restaurant
- click "Delete" button to remove the restaurant from the list
- Using sorting dropdown menu to arrange restaurants

### UX Features
---
- confirmation message will pop up before deletion
- confirmation message will pop up before quitting editing
- reminder of no restaurant on the list
- if search keyword only consists of spaces or is empty, user won't be able to submit the query.

### How to use
---
0. Prerequisites
- install [MongoDB](https://www.mongodb.com/try/download/community)
- install [Robo 3T](https://robomongo.org/)
- start the MongoDB server
- create a MongoDB connection
- create a database named "restaurant-list"

1. Clone this repository 

```
$ git clone https://github.com/Fan-55/restaurant-list.git
```

2. Go to the directory 

```
$ cd restaurant-list
```

3. Install the required packages 

```
$ npm install
```

4. Implant seed data
```
$ npm run seed
```

5. Execute app via either nodemon or node

- via nodemon

```
$ npm run dev
```

- via node

```
$ npm run start
```

6. You will see the following on your terminal suggesting successful set up

```
This app is listening at http://localhost:3000
mongodb connected!
```
7. Open the browser and type in the following URL

```
http://localhost:3000/users/login
```

8. Use the following seed user data to log in or create your own account

| Email | password |
| ------ | ------ |
| user1@example.com | 12345678 |
| user2@example.com | 12345678 |

### Tools used for this web application
---
- Node.js: v10.15.0
- Express: v4.17.1
- express-handlebars: v5.1.0
- body-parser: v1.19.0
- mongoose: v5.10.7
- dotenv: v8.2.0
- bcryptjs: v2.4.3
- connect-flash: v0.1.1
- express-session: v1.17.1
- passport: v0.4.1
- passport-local: v1.0.0
- passport-facebook: v3.0.0
- MongoDB: v4.2.9
- Robo 3T: v1.4.1
- method-override: v3.0.0
