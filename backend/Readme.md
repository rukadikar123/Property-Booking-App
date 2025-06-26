# Property Booking App - Backend

This is the backend API for a property booking application. It provides endpoints for user authentication, property listing, and booking management.

## Base URL

```
https://property-booking-app-backend.onrender.com
```

---

## Authentication Endpoints

| Method | Endpoint             | Description                | Auth Required |
|--------|----------------------|----------------------------|--------------|
| POST   | `/auth/signup`       | Register a new user        | No           |
| POST   | `/auth/login`        | Login user                 | No           |
| GET    | `/auth/logout`       | Logout user                | Yes          |
| GET    | `/auth/current`      | Get current user info      | Yes          |
| PATCH  | `/auth/become-host`  | Become a host              | Yes          |

---

## Property Listing Endpoints

| Method | Endpoint             | Description                        | Auth Required |
|--------|----------------------|------------------------------------|--------------|
| GET    | `/listing`          | Get all property listings          | Yes          |
| POST   | `/listing/add`       | Add a new property (host only)     | Yes          |
| GET    | `/listing/:id`       | Get property details by ID         | Yes          |

---

## Booking Endpoints

| Method | Endpoint                 | Description                    | Auth Required |
|--------|--------------------------|--------------------------------|--------------|
| POST   | `/booking/place-booking` | Place a booking for a property | Yes          |
| GET    | `/booking/my-bookings`   | Get current user's bookings    | Yes          |

---

## Notes

- All endpoints (except signup/login) require authentication via JWT cookie.
- To add a property, the user must first become a host (`PATCH /auth/become-host`).
- Image uploads for properties are handled via multipart/form-data.
- Bookings automatically update status via a daily cron job.

---



## Seeding Data

To seed the database with sample data, run:

```
node seed.js
```

---

## Start Server

```
npm install
npm run dev
```