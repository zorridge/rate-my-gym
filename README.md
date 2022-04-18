# RateMyGym - A Gym Review CRUD Web App

Give it a try to get the full experience! https://rate-my-gym.herokuapp.com 

<sup>*(Please expect a short delay in loading due to Heroku's web dyno sleeping)*</sup>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#about-the-project">About The Project</a></li>
    <li><a href="#built-with">Built With</a></li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT -->
## About The Project

![image](https://user-images.githubusercontent.com/86993236/163321762-f81c9741-3e66-4261-996b-ed9d26ef734d.png)

Leveraging RESTful routing, RateMyGym is a mobile-friendly, full stack gym review web app built using **Node.js, Express, and MongoDB**. 

Functionalities include: 
* CRUD operations (gyms and reviews) using **Mongoose** as the ODM
* Client-side validation with UI indicators
* Server-side validation using **joi**
* Authentication using **Passport.js**
* Authorisation, session management, and flash messages using **express-session**
* Image upload and cloud storage using **Cloudinary**
* Geocoding using **Mapbox API**
* Interactive cluster map using **Mapbox GL JS**
* Basic security functionalities using **HTML sanitizing and helmet.js**

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- BUILT WITH -->
## Built With

The project implements the MVC architecture.

**Main stack**
* EJS
* Bootstrap
* Node.js
* Express
* MongoDB

**Third-party services**
* [Cloudinary](https://cloudinary.com/)
* [Mapbox](https://www.mapbox.com/)
* [MongoDB Atlas](https://www.mongodb.com/cloud)
* [Heroku](https://dashboard.heroku.com/)

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- USAGE -->
## Usage
<details>
  <summary>Quick Navigation</summary>
  <ol>
    <li><a href="#home">Home</a></li>
    <li><a href="#view-all">View All</a></li>
    <li><a href="#register">Register</a></li>
    <li><a href="#login">Login</a></li>
    <li><a href="#authentication">Authentication</a></li>
    <li><a href="#authorisation">Authorisation</a></li>
    <li><a href="#create-gym">Create Gyn</a></li>
    <li><a href="#view-gym">View Gym</a></li>
    <li><a href="#update-gym">Update Gym</a></li>
    <li><a href="#delete-gym">Delete Gym</a></li>
    <li><a href="#error-handling">Error Handling</a></li>
    <li><a href="#client-side-validation">Client-side Validation</a></li>
    <li><a href="#server-side-validation">Server-side Validation</a></li>
    <li><a href="#flash-messages">Flash Messages</a></li>
  </ol>
</details>

### Home
Mobile View

![Screenshot_20220414-133547_Chrome (Small)](https://user-images.githubusercontent.com/86993236/163325396-2268ee8f-b0c3-4c24-8f62-f2410a41d159.jpg)

<p align="right">(<a href="#usage">back to Quick Navigation</a>)</p>


### View All

Web View

![image](https://user-images.githubusercontent.com/86993236/163325692-887d7d1a-5c56-4d4a-bc66-230fcb684faa.png)

Mobile View

![Screenshot_20220414-133608_Chrome (Small)](https://user-images.githubusercontent.com/86993236/163325722-e836cd2f-4900-4de0-8ef1-afa0758792d1.jpg)

Infinite scroll with vanilla JavaScript and querying ``/gyms/search``

https://user-images.githubusercontent.com/86993236/163329496-371dac7a-7b64-4fa8-92ba-599dff917eb1.mp4

<p align="right">(<a href="#usage">back to Quick Navigation</a>)</p>


### Register

![image](https://user-images.githubusercontent.com/86993236/163326657-3f07bfaf-7a57-435b-bb6f-dc5e52ef00cf.png)

<p align="right">(<a href="#usage">back to Quick Navigation</a>)</p>


### Login

![image](https://user-images.githubusercontent.com/86993236/163326682-eaf9648f-6716-4894-9e4c-3e8d6cb2d2f2.png)

<p align="right">(<a href="#usage">back to Quick Navigation</a>)</p>


### Authentication

Non-users can only view the gym's info and its reviews

![image](https://user-images.githubusercontent.com/86993236/163327721-5d09ed5f-2ab2-4011-86e2-a876ec7bc0de.png)

<p align="right">(<a href="#usage">back to Quick Navigation</a>)</p>


### Authorisation

Non-owners can add reviews, but cannot edit the gym's info or other users' reviews

![image](https://user-images.githubusercontent.com/86993236/163328137-9eb5bc54-098b-480f-88ef-20be9fbac3a1.png)

<p align="right">(<a href="#usage">back to Quick Navigation</a>)</p>


### Create Gym

![image](https://user-images.githubusercontent.com/86993236/163326425-d74963cf-ad01-4204-a94a-e358a40d9b37.png)

<p align="right">(<a href="#usage">back to Quick Navigation</a>)</p>


### View Gym

![image](https://user-images.githubusercontent.com/86993236/163326162-e893c035-a17c-485a-96b8-b053bb44a540.png)

<p align="right">(<a href="#usage">back to Quick Navigation</a>)</p>


### Update Gym

![image](https://user-images.githubusercontent.com/86993236/163326507-21f43ad6-4b9c-4c33-a8d3-79c61d3ba75e.png)

<p align="right">(<a href="#usage">back to Quick Navigation</a>)</p>


### Delete Gym

![image](https://user-images.githubusercontent.com/86993236/163326558-d549679c-2377-490b-933b-8557b2681684.png)

<p align="right">(<a href="#usage">back to Quick Navigation</a>)</p>


### Error Handling

![image](https://user-images.githubusercontent.com/86993236/163326915-e06cc64d-0d67-4fc7-9ccf-b6880da121b5.png)

<p align="right">(<a href="#usage">back to Quick Navigation</a>)</p>


### Client-side Validation

![image](https://user-images.githubusercontent.com/86993236/163328299-c8339917-2cbf-4ec9-b64e-8e5769e1b43b.png)

<p align="right">(<a href="#usage">back to Quick Navigation</a>)</p>


### Server-side Validation

![image](https://user-images.githubusercontent.com/86993236/163327553-eebe73ef-dc4d-45df-8bbd-1c48e9e44529.png)

<p align="right">(<a href="#usage">back to Quick Navigation</a>)</p>

### Flash Messages

Every CRUD action, login/logout/register, redirect will be accompanied by a flash message to improve UX, managed by the browser session

*e.g. when non-users try to access "New" on the navbar*

![image](https://user-images.githubusercontent.com/86993236/163330978-06e9a21d-7699-474d-aee3-0a02dadf8572.png)

<p align="right">(<a href="#usage">back to Quick Navigation</a>)</p>



