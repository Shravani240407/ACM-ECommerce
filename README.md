# Full-Stack E-Commerce Web Application

Built for the ACM Junior Webmaster Recruitment task.

## Key Features
* **Expanded Catalog:** 30 pre-seeded products across 5 categories (`Electronics`, `Apparel`, `Accessories`, `Home`, `Fitness`).
* **Interactive Cart:** Stock management with total price calculation and coupon handling (`ACM10`).
* **Authentication:** User registration & JWT-authenticated login.
* **Non-API Wishlist:** Purely client-side wishlist using `localStorage`.
* **Admin Dashboard:** Product CRUD control panel and sales analytics.

## Quick Start Guide

1. Stop any currently running instance in your terminal using `Ctrl + C`.
2. Delete the old database file (`database.sqlite`) to seed the 30 new products cleanly.
3. Start the application:
   ```bash
   npm start