# 🍬 Sweet Shop Management System

## Overview

The **Sweet Shop Management System** is a full-stack web application designed to manage an online sweet shop. It allows users to browse, search, and purchase sweets while providing administrators with the ability to manage inventory (add, update, delete, and restock sweets). The project demonstrates modern web development practices, including TDD, RESTful API design, React SPA frontend, token-based authentication, and clean coding practices.  

The project was developed using **React (Vite)** for the frontend and **Node.js + Express + Prisma** for the backend, with a **MySQL** database.

---

## Deployed URLs

- **Frontend (React SPA):** [https://incubyte-assessment-phi.vercel.app](https://incubyte-assessment-phi.vercel.app/)  
- **Backend API (Deployed):** [https://incubyte-assessment-4.onrender.com/api](https://incubyte-assessment-4.onrender.com/api)  

---

## Features

### User Features

- Register and login with email and password.
- Browse all sweets with images, categories, and prices.
- Search sweets by **name** and **category**.
- Add sweets to cart and update quantities.
- Purchase sweets (updates stock in real-time).
- Responsive and animated UI with Lottie animations.

### Admin Features

- Add new sweets with name, category, price, quantity, and image URL.
- Update sweet details.
- Delete sweets.
- Restock sweets.
- Protected endpoints using JWT authentication.

---

## API Endpoints

### Authentication

| Method | Endpoint             | Description                       |
|--------|--------------------|-----------------------------------|
| POST   | /api/auth/register  | Register a new user               |
| POST   | /api/auth/login     | Login and receive a JWT token     |

### Sweets (Protected)

| Method | Endpoint                    | Description                               |
|--------|----------------------------|-------------------------------------------|
| POST   | /api/sweets                 | Add a new sweet (Admin only)             |
| GET    | /api/sweets                 | Get all sweets                            |
| GET    | /api/sweets/search          | Search sweets by name or category         |
| PUT    | /api/sweets/:id             | Update sweet details (Admin only)        |
| DELETE | /api/sweets/:id             | Delete a sweet (Admin only)              |

### Inventory (Protected)

| Method | Endpoint                    | Description                                  |
|--------|----------------------------|----------------------------------------------|
| POST   | /api/sweets/:id/purchase    | Purchase a sweet (decrease quantity)        |
| POST   | /api/sweets/:id/restock     | Restock a sweet (Admin only, increase quantity) |

---

## Frontend Overview

- **Technology:** React with Vite, manual CSS, Framer Motion for animations.
- **Key Components:**
  - `HomePage.jsx`: Displays sweets, search, filters, and cart functionality.
  - `AdminDashboard.jsx`: Admin interface to manage inventory.
  - `Login.jsx` / `Register.jsx`: Authentication forms.
  - Animations: `MuslimSweets.json`, `neigh.json`.
- Responsive layout with modern, animated design.
- Cart sidebar with real-time quantity validation and checkout functionality.

---

## Local Setup

### Backend

1. Clone the repository and navigate to backend:
   ```bash
   git clone https://github.com/Aishkash/Incubyte-assessment.git
   ```
   ```bash
   cd Incubyte-assessment/backend
   ```
2. Install dependencies
   ```bash
   npm install
   ```
3. Configure `.env` with your database and JWT secret:
   ```env
   DATABASE_URL="mysql://user:password@host:port/dbname"
   JWT_SECRET="your_jwt_secret"
   ```  
4. Run database migrations using Prisma:
   ```bash
   npx prisma migrate dev
   ```
5. Start the backend server:
   ```bash
   npm start
   ```

### Frontend

1. Clone the repository and navigate to frontend:
   ```bash
   git clone https://github.com/Aishkash/Incubyte-assessment.git
   ```
   ```bash
   cd Incubyte-assessment/frontend
   ```
2. Install dependencies
   ```bash
   npm install
   ```
3. Start the frontend development server:
   ```bash
   npm run dev
   ```
5. Open the application in your browser at:
   ```bash
   http://localhost:5173
   ```
---
## Usage

### Admin Users
- Login via `/admin` route.
- Add, update, delete, and restock sweets.
- Manage inventory in real-time.

### Regular Users
- Register and login.
- Browse and filter sweets by **name** and **category**.
- Add sweets to cart, update quantities, and proceed to checkout.
- Checkout triggers the purchase API for each item and updates stock accordingly.

### Search Functionality
- Uses `/api/sweets/search` endpoint to filter by **name** and **category**.
- The search is case-insensitive and supports partial matches.

---
## Screenshots of Live Application

> Below are screenshots of the deployed Sweet Shop Management System demonstrating key features and workflows.

### 1. Home Page – Sweets Listing
- Displays all available sweets fetched from the backend API.
- Shows name, category, price, stock, and image.
- Includes search bar and category filters.

<img width="1280" height="719" alt="image" src="https://github.com/user-attachments/assets/3ad8f090-58f1-4519-807c-0622301fc4b4" />
<img width="1280" height="716" alt="image" src="https://github.com/user-attachments/assets/5b7a5b05-3038-44d2-a7ae-04ae26126688" />



### 2. User Authentication
- Login and registration forms with validation.
- JWT-based authentication integrated with backend.

<img width="1280" height="713" alt="image" src="https://github.com/user-attachments/assets/7afc781e-895b-4b94-9cce-f70d01983c13" />
<img width="1600" height="909" alt="image" src="https://github.com/user-attachments/assets/d2fced98-6aa1-4e79-ae08-0575de4d3014" />



### 3. Cart & Checkout
- Sidebar cart showing selected sweets.
- Quantity controls with stock validation.
- Checkout triggers purchase API and updates inventory in real time.

<img width="1280" height="733" alt="image" src="https://github.com/user-attachments/assets/2377303e-074e-431d-b969-211fb21eee0f" />


### 4. Admin Dashboard
- Admin-only protected dashboard.
- Create, update, delete, and restock sweets.
- Real-time inventory updates.

<img width="1280" height="733" alt="image" src="https://github.com/user-attachments/assets/1ce16b07-3c91-4906-873c-c4eb4dc19e99" />



---

## Test Report

All backend functionality was developed following **Test-Driven Development (TDD)** principles. Tests were written before implementing features, ensuring reliability and correctness of the API.

### Test Coverage

- **Authentication**
  - User registration
  - User login
  - JWT token generation and validation

- **Sweets API**
  - Create sweet (admin)
  - Fetch all sweets
  - Search sweets by name and category
  - Update sweet details
  - Delete sweet

- **Inventory**
  - Purchase sweet (quantity decrement)
  - Restock sweet (quantity increment)
  - Validation for out-of-stock scenarios

### Test Results

- All test cases executed successfully.
- No failing tests.
- API responses validated for correct status codes and data integrity.

  <img width="274" height="92" alt="image" src="https://github.com/user-attachments/assets/549730f1-d8ca-4c74-adf6-66da27c5286c" />


```bash
npm test
```
---

## My AI Usage

- **Tool Used:** ChatGPT
- **Usage:**  
  - **Frontend:** Generated boilerplate for components (`Login.jsx`, `Register.jsx`, `AdminDashboard.jsx`, `HomePage.jsx`) and assisted in implementing functionality such as cart management, checkout logic, search integration, and animations. Helped with CSS styling and layout adjustments to create a responsive UI.  
  - **Backend:** Generated initial boilerplate for controllers and services, implemented API endpoints (`/auth/register`, `/auth/login`, `/sweets`, `/sweets/search`, `/sweets/:id`), and assisted in writing test cases for all backend routes to ensure proper functionality and TDD workflow.
- **Reflection:**  
  Using ChatGPT accelerated development by reducing boilerplate code writing, providing suggestions for component and service structures, and helping with test design. Manual refinements ensured a polished, production-ready application with full frontend-backend integration.

