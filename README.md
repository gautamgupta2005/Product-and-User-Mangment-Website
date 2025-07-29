# Product Lookup and User Management Website

A secure and user-friendly **Product Lookup and User Management Website** built with Express.js and Node.js.

---

## Project Overview

This website allows users to:

- **Sign up** with email and password.
- **Log in** with existing credentials.
- **Search products** by name.
- **View detailed product information** including price, brand, storage, RAM, battery, and product images.

The application uses JSON files (`user.json` and `product.json`) to store user data and product data, demonstrating basic CRUD-like operations and user authentication.

---

## Features

- User registration with checking for existing users.
- User login with password verification.
- Product search by product name.
- Product detail page showing comprehensive specs and images.
- Simple frontend interfaces with HTML, CSS, and JavaScript.
- Backend using Express.js to serve files, handle API routes, and persist data in JSON files.

---

## Technologies Used

- Node.js
- Express.js
- HTML, CSS, JavaScript (vanilla)
- File system module (`fs`) for JSON data handling

 ## Folder Structure
 
/project-root
│
├── server.js  
├── README.md
│
├── /src                       
│   ├── home.html              
│   ├── login.html
│   ├── signup.html             
│   ├── table.html              
│   ├── user.json               
│   └── product.json         
├── /public        

## /src Folder Details

The `src` folder contains all the static assets and data files used by the Express server.

### Files and their purposes:

- **home.html**  
  The landing page of the website. Provides links to Login and Signup pages.

- **login.html**  
  The login form where existing users enter their email and password.

- **signup.html**  
  The signup form allowing new users to register with their email and password.

- **table.html**  
  The page where logged-in users can search for products and see a list of results.

- **user.json**  
  JSON file that stores the registered users' data (email and password).  
  Used to verify logins and prevent duplicate signup.

- **product.json**  
  JSON file containing product data such as product name, price, brand, storage, RAM, battery, etc.  
  Used to serve product search results and details.
