# E-Commerce App  
A full-stack e-commerce application built with Node.js, Express, MongoDB, and a responsive frontend (HTML, CSS, JavaScript).

## Table of Contents  
- [Project Overview](#project-overview)  
- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Getting Started](#getting-started)  
  - [Prerequisites](#prerequisites)  
  - [Installation](#installation)  
  - [Running the App](#running-the-app)  
- [Project Structure](#project-structure)  
- [Usage](#usage)  
- [Contributing](#contributing)
- [Contact](#contact)  

## Project Overview  
This project is a scalable e-commerce web application. Users can browse products, view product details, add items to cart, create orders, and an admin panel to manage products, orders and users.

## Features  
- User registration & login (with authentication)  
- Product listing, categories, filtering  
- Product details page with add to cart  
- Shopping cart functionality  
- Order creation & management  
- Admin dashboard to manage products, orders, users  
- Seed data for rapid setup (`seed.js`)  
- Responsive UI (for mobile + desktop)  

## Tech Stack  
- Frontend: HTML, CSS, JavaScript  
- Backend: Node.js with Express  
- Database: MongoDB (via Mongoose)  
- Authentication: JSON Web Tokens (JWT) or session-based (specify as per your code)  
- Seed Data: `seed.js` to prepopulate Products/Users/Orders  
- Folder structure: `models/`, `routes/`, `controllers/`, `middleware/` for clean architecture  

## Getting Started  

### Prerequisites  
- Node.js (v14+ recommended)  
- npm or yarn  
- MongoDB (local or Atlas)  
- Git  

### Installation  
1. Clone the repo:  
   ```bash  
   git clone https://github.com/Soul0418/e-commerce.git  
   cd e-commerce  
