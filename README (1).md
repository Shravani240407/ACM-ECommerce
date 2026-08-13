# 🛒 Full-Stack E-Commerce Web Application

> Built as part of the **ACM Junior Webmaster Recruitment** task.

---

## 📖 Project Description

This project is a modern, responsive **Full-Stack E-Commerce Web Application** designed to deliver a seamless online shopping experience. It features an interactive product catalog with real-time filtering, dynamic shopping cart management, persistent user authentication via JWT, a client-side wishlist, and an administrative dashboard for product inventory management and sales analytics.

The goal of the project was to build a complete, end-to-end shopping platform — from browsing and cart checkout on the customer side, to inventory and sales management on the admin side — using a lightweight, easy-to-run tech stack.

---

## 🛠️ Technology Stack

### **Frontend**
* **HTML5 & CSS3:** Modern, responsive design utilizing CSS Grid and Flexbox for optimal display across devices.
* **JavaScript (ES6+):** Async/Await API integration, dynamic DOM manipulation, and state management.
* **Web Storage API:** Client-side persistence using `localStorage` for the Wishlist feature without server overhead.

### **Backend & Database**
* **Node.js:** Scalable JavaScript runtime environment.
* **Express.js:** Lightweight server framework for handling RESTful API endpoints and authentication middleware.
* **JSON Web Tokens (JWT):** Stateless, token-based user authentication and route protection.
* **SQLite:** File-based relational database for seamless local development, testing, and automatic seeding.

---

## ✨ Features Implemented

* 📦 **Expanded Catalog:** 30 pre-seeded products across 5 distinct categories (`Electronics`, `Apparel`, `Accessories`, `Home`, `Fitness`).
* 🛒 **Interactive Cart:** Real-time stock validation, automated price calculations, quantity adjustments, and promotional coupon support (`ACM10`).
* 🔐 **Authentication:** User registration, password hashing, credential validation, and JWT-authenticated session state.
* 💖 **Client-Side Wishlist:** Purely frontend wishlist saved across sessions using `localStorage`.
* 📊 **Admin Dashboard:** Full product CRUD (Create, Read, Update, Delete) management panel and key sales analytics.
* 🔍 **Search & Filter:** Live product search and category-based filtering on the catalog page.
* 📱 **Responsive Design:** Fully usable experience across desktop, tablet, and mobile screens.

---

## 🚀 How to Install and Run the Project

### **Prerequisites**
Make sure you have [Node.js](https://nodejs.org/) (v14 or higher) installed on your system.

### **Quick Start Steps**

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/ecommerce-app.git
   cd ecommerce-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory and add the following:
   ```env
   PORT=5000
   JWT_SECRET=your_jwt_secret_key
   DATABASE_URL=./database/ecommerce.db
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open the application:**
   Navigate to `http://localhost:5000` in your browser.

### **Available Scripts**

| Command | Description |
|---|---|
| `npm run dev` | Starts the server in development mode with hot-reload (nodemon) |
| `npm start` | Starts the server in production mode |
| `npm run seed` | Seeds the SQLite database with sample products |
| `npm test` | Runs the test suite |

---

## 🗄️ Database Setup

The project uses **SQLite**, a file-based relational database, so no separate database server installation is required.

1. On first run, the app automatically creates a database file at `./database/ecommerce.db` if it doesn't already exist.
2. The schema is initialized automatically and includes the following core tables:
   * `users` — stores user credentials (hashed passwords), roles (`customer` / `admin`), and profile info.
   * `products` — stores product details: name, description, price, category, stock quantity, and image URL.
   * `orders` — stores order records linked to a user, including status and total amount.
   * `order_items` — stores individual line items belonging to an order.
3. To (re)seed the database with 30 sample products across 5 categories, run:
   ```bash
   npm run seed
   ```
4. To reset the database completely, delete the `database/ecommerce.db` file and restart the server — it will be recreated and reseeded automatically.

---

## 🔌 API Details

All endpoints are prefixed with `/api`. Protected routes require a valid JWT sent via the `Authorization: Bearer <token>` header.

### **Auth Routes** (`/api/auth`)
| Method | Endpoint | Description | Protected |
|---|---|---|---|
| POST | `/register` | Register a new user | No |
| POST | `/login` | Log in and receive a JWT | No |
| GET | `/me` | Get the current logged-in user's profile | Yes |

### **Product Routes** (`/api/products`)
| Method | Endpoint | Description | Protected |
|---|---|---|---|
| GET | `/` | Get all products (supports `?category=` and `?search=` query params) | No |
| GET | `/:id` | Get a single product by ID | No |
| POST | `/` | Create a new product | Yes (Admin) |
| PUT | `/:id` | Update an existing product | Yes (Admin) |
| DELETE | `/:id` | Delete a product | Yes (Admin) |

### **Cart & Order Routes** (`/api/cart`, `/api/orders`)
| Method | Endpoint | Description | Protected |
|---|---|---|---|
| GET | `/cart` | Get the current user's cart | Yes |
| POST | `/cart` | Add an item to the cart | Yes |
| PUT | `/cart/:itemId` | Update quantity of a cart item | Yes |
| DELETE | `/cart/:itemId` | Remove an item from the cart | Yes |
| POST | `/orders` | Place an order (checkout) | Yes |
| GET | `/orders` | Get order history for the current user | Yes |

### **Admin Analytics Routes** (`/api/admin`)
| Method | Endpoint | Description | Protected |
|---|---|---|---|
| GET | `/admin/stats` | Get sales summary: total revenue, order count, top products | Yes (Admin) |
| GET | `/admin/orders` | Get all orders across all users | Yes (Admin) |

---

## 📸 Screenshots

> Add screenshots of your application here to showcase the UI.

| Page | Preview |
|---|---|
| Home / Catalog | `screenshots/home.png` |
| Product Detail | `screenshots/product-detail.png` |
| Shopping Cart | `screenshots/cart.png` |
| Login / Register | `screenshots/auth.png` |
| Admin Dashboard | `screenshots/admin-dashboard.png` |

*(Place your image files inside a `/screenshots` folder in the repo root and update the table above with the actual filenames.)*

---

## 🧩 Challenges Faced and How They Were Solved

1. **Real-time stock validation in the cart**
   *Challenge:* Preventing users from adding more items to the cart than were actually in stock, especially with concurrent updates.
   *Solution:* Added server-side stock checks on every cart mutation (add/update quantity), returning a clear error response when requested quantity exceeds available stock, and reflecting this instantly in the frontend UI.

2. **Persisting the wishlist without a backend dependency**
   *Challenge:* Implementing a wishlist feature without adding extra backend/database load for a "nice-to-have" feature.
   *Solution:* Used the browser's `localStorage` Web Storage API to persist wishlist items entirely client-side, keeping it fast and independent of authentication state.

3. **Secure authentication and route protection**
   *Challenge:* Ensuring passwords were stored securely and that protected routes (cart, orders, admin panel) couldn't be accessed without a valid session.
   *Solution:* Passwords are hashed before storage, and JWTs are issued on login/register. An Express middleware verifies the token on every protected route and checks user roles for admin-only endpoints.

4. **Admin dashboard analytics performance**
   *Challenge:* Calculating sales analytics (revenue, top products) efficiently without slowing down the dashboard.
   *Solution:* Used aggregate SQL queries (`SUM`, `GROUP BY`, `ORDER BY`) directly in SQLite instead of computing statistics in JavaScript, significantly reducing computation time and response payload size.

5. **Coupon and discount logic**
   *Challenge:* Applying promotional coupon codes (e.g. `ACM10`) correctly across varying cart totals without introducing pricing bugs.
   *Solution:* Centralized all price and discount calculations in a single backend utility function, so the same logic is used consistently for cart previews, order totals, and receipts.

---

## 📄 License

This project was developed for the ACM Junior Webmaster Recruitment task and is available for educational and demonstration purposes.
