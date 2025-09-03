# Property Booking App - Backend

This is the backend API for a property booking application. It provides endpoints for user authentication, property listing, booking management, ratings, and wishlist.

## Base URL

```
https://property-booking-app-backend.onrender.com/api
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
| PATCH  | `/auth/profile/edit` | Update profile picture     | Yes          |

---

## Property Listing Endpoints

| Method | Endpoint             | Description                        | Auth Required |
|--------|----------------------|------------------------------------|--------------|
| GET    | `/listing`           | Get all property listings          | No          |
| POST   | `/listing/add`       | Add a new property (host only)     | Yes          |
| GET    | `/listing/:id`       | Get property details by ID         | No          |
| GET    | `/listing/search`    | Search properties by query         | No          |

---

## Booking Endpoints

| Method | Endpoint                 | Description                    | Auth Required |
|--------|--------------------------|--------------------------------|--------------|
| POST   | `/booking/place-booking` | Place a booking for a property | Yes          |
| GET    | `/booking/my-bookings`   | Get current user's bookings    | Yes          |

---

## Rating & Review Endpoints

| Method | Endpoint                | Description                              | Auth Required |
|--------|-------------------------|------------------------------------------|--------------|
| GET    | `/rating/isPending`     | Check if user has pending ratings        | Yes          |
| POST   | `/rating/add`           | Add a rating for a property/booking      | Yes          |
| GET    | `/rating/reviews/:id`   | Get all reviews for a property           | No          |

---

## Wishlist Endpoints

| Method | Endpoint                   | Description                           | Auth Required|
|--------|------------------------- --|---------------------------------------|--------------|
| POST   | `/wishlist/toggleWishlist` | Add/remove property from wishlist     | Yes          |
| GET    | `/wishlist/allWishlist`    | Get all wishlist items for user       | Yes          |

---

## Data Schemas

### User

```js
{
  fullname: String,
  email: String,
  password: String,
  profilepic: String,
  isHost: Boolean
}
```

### Property (Listing)

```js
{
  title: String,
  description: String,
  location: String,
  price: Number,
  images: [String],
  host: ObjectId (User),
  ratings: Number,
  ratingCount: Number
}
```

### Booking

```js
{
  property: ObjectId (Property),
  user: ObjectId (User),
  checkIn: Date,
  checkOut: Date,
  totalPrice: Number,
  status: "ongoing" | "completed" | "cancelled"
}
```

### Rating

```js
{
  user: ObjectId (User),
  property: ObjectId (Property),
  booking: ObjectId (Booking),
  rating: Number (max 5),
  comment: String
}
```

### Wishlist

```js
{
  user: ObjectId (User),
  property: ObjectId (Property)
}
```

---

## Notes

- All endpoints (except signup/login) require authentication via JWT cookie.
- To add a property, the user must first become a host (`PATCH /auth/become-host`).
- Image uploads for properties are handled via multipart/form-data.
- Bookings automatically update status via a daily cron job.
- Ratings can only be submitted for completed bookings.

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