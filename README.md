# HOC's Nest

https://hocsnest.herokuapp.com/login

### Your group members
* David Oliveros (backend lead)
* Josh Hovis (frontend lead)
* Sam Cowing (scrum lead)

### Your project idea 
> This app is a social platform based around people coming together to hangout and play games online. While apps like this exit today, very few have proved a huge success and dominated the market. Our goal is with this social platform is to make it user friendly and simple, so that it's easy to hangout and play in-app games, or external games, with friends online.

### Sneak peak
![Wireframe](https://i.imgur.com/vwUozoB.png)

### Your tech stack (frontend, backend, database)
- React
- Django
- PostgreSQL
- Redis

### List of backend models and their properties
- Group model
  - Has Users
  - Has comments
- User model (handled by Django)
  - Has comments
- Comment model
  - Associated with a user (can't have a comment without a user)

### React component hierarchy (if applicable)
![React Hierarchy Img](https://i.imgur.com/Vpvyolx.jpeg)

### User stories
As a new user I want to be able to create an account on HOC's Nest
As a user I want to be able to find my friends by their username or email to make a new game group 
As a user I want to have at least one game option in the group to be able to hang in a space with my friends 
As a user I want to be able to start games with selected friends from the group participating 
As a user I want to be able to take action at my turn during a game

### Wireframes
![Wireframe](https://i.imgur.com/AChu2P3.jpg)


### Stretch Goals
* Direct chats
* In app games
* Voice Chat
* Friends List
