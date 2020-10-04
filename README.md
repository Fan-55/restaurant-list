## Restaurant List

This is a web application for you to list whatever restaurant you like.  

![](/restaurant_list.jpg)


### Features
---
- searching restaurants by title
- searching restaurants by category
- clicking the restaurant image or title to see its detail information 
- clicking the "Add a new restaurant" button to create a new item to the list
- clicking "Edit" button to modify the detail information of certain restaurant
- clicking "Delete" button to remove the restaurant from the list

### UX Features
---
- confirm message will pop up before deletion
- reminder of no search result 
- reminder of empty search keyword
- if search keyword only consists of spaces, user will be redirected to the home page.

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
$ git clone https://github.com/Fan-55/restaurant_list_CRUD.git
```

2. Go to the directory 

```
$ cd restaurant_list_CRUD
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
7. Open the browser and type in the following URL then you are ready to go!

```
http://localhost:3000
```
### Tools used for this web application
---
- Node.js: v10.15.0
- Express: v4.17.1
- express-handlebars: v5.1.0
- body-parser: v1.19.0
- mongoose: v5.10.7
- MongoDB: v4.2.9
- Robo 3T: v1.4.1
