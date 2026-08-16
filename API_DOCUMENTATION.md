# FixItNow API Documentation

Base URL: `http://localhost:3000` (see `APP_URL` in `.env`)

All routes below are mounted under `/api` in [src/app.ts](src/app.ts):

| Module | Mount path |
|---|---|
| Users | `/api/users` |
| Auth | `/api/auth` |
| Technician | `/api/technician` |
| Admin | `/api/admin` |
| Category | `/api/category` |
| Service | `/api/service` |
| Booking | `/api/booking` |
| Payment | `/api/payment` |
| Review | `/api/review` |

---

## Conventions

**Auth**: JWT sent either as an `httpOnly` cookie (`accessToken`) set on login, or as `Authorization: Bearer <token>`. Protected routes are marked with the roles allowed to call them, e.g. `CUSTOMER`, `TECHNICIAN`, `ADMIN`. Unmarked routes are public.

**Success response shape** (`src/utils/sendResponse.ts`):
```json
{
  "success": true,
  "statusCode": 200,
  "message": "...",
  "data": { }
}
```

**Error response shape** (`src/middlewares/globalErrorHandler.ts`):
```json
{
  "success": false,
  "statusCode": 400,
  "name": "Error",
  "message": "...",
  "error": "<stack trace>"
}
```

**404 (unmatched route)** (`src/middlewares/notFound.ts`):
```json
{
  "message": "Route not Found",
  "path": "/some/bad/path",
  "date": "..."
}
```

---

## Auth — `/api/auth`

| Method | Endpoint | Auth | Body | Description |
|---|---|---|---|---|
| POST | `/login` | Public | `{ email, password }` | Verifies credentials, sets `accessToken` (1d) and `refreshToken` (7d) as httpOnly cookies |
| POST | `/refresh-token` | Public (reads `refreshToken` cookie) | — | Issues a new `accessToken` cookie |

---

## Users — `/api/users`

| Method | Endpoint | Auth | Body | Description |
|---|---|---|---|---|
| POST | `/register` | Public | `{ name, email, password, role?, experience?, hourlyRate?, bio?, skills?, location? }` | Creates a `User` (+ `Profile`, and `TechnicianProfile` if `role: TECHNICIAN`, requiring `experience`/`hourlyRate`) |
| GET | `/me` | ADMIN, CUSTOMER, TECHNICIAN | — | Current user's profile (with `profile`, `bookings`, `reviews`, `technicianProfile`; password omitted) |
| PUT | `/my-profile` | ADMIN, CUSTOMER, TECHNICIAN | `{ name?, profilePhoto?, phone?, address? }` | Updates `name` and upserts `Profile` |

---

## Technician — `/api/technician`

| Method | Endpoint | Auth | Body | Description |
|---|---|---|---|---|
| GET | `/profile` | ADMIN, TECHNICIAN, CUSTOMER | — | Logged-in technician's own profile (services, availability, bookings, reviews w/ reviewer name) |
| GET | `/all` | Public | — | List all technician profiles (password omitted) |
| POST | `/new_service` | ADMIN, TECHNICIAN | `{ title, description, price, duration, categoryId }` | Creates a `Service` under the technician's profile |
| POST | `/new_slots` | TECHNICIAN | `{ date, startTime, endTime, slotDuration }` | Cuts a working window into `Availability` slots |
| GET | `/my_slots` | TECHNICIAN | — | Logged-in technician's availability slots |
| DELETE | `/slots/:id` | TECHNICIAN | — | Deletes an unbooked slot |
| GET | `/availability/:serviceId` | Public | — | Free upcoming slots long enough to cover that service's duration |

---

## Category — `/api/category`

| Method | Endpoint | Auth | Body | Description |
|---|---|---|---|---|
| GET | `/all` | Public | — | All categories, with nested services/technician |

Category creation is admin-gated — see `POST /api/admin/new_category` below.

---

## Service — `/api/service`

| Method | Endpoint | Auth | Query | Description |
|---|---|---|---|---|
| GET | `/all` | Public | `title?, categoryId?, location?, price?, rating?, searchTerm?, sortBy?, sortOrder?, limit?, page?` | Filtered/paginated service listing. `price`/`rating` filter as "≥ value"; `location`/`rating` filter through the owning technician |

---

## Booking — `/api/booking`

| Method | Endpoint | Auth | Body | Description |
|---|---|---|---|---|
| POST | `/new_booking` | CUSTOMER, TECHNICIAN | `{ serviceId, bookingDate, startTime, address, problemDescription? }` | Claims contiguous availability slots covering the service duration, creates the `Booking` |
| GET | `/my_bookings` | CUSTOMER, TECHNICIAN, ADMIN | — | Logged-in customer's bookings |
| GET | `/technician_bookings` | TECHNICIAN | — | Logged-in technician's incoming bookings |
| GET | `/:id` | CUSTOMER, TECHNICIAN | — | Single booking (only the owning customer or assigned technician) |
| PATCH | `/:id/status` | TECHNICIAN | `{ status }` | Moves booking status per the allowed-transition map (`REQUESTED→ACCEPTED/DECLINED`, `ACCEPTED→IN_PROGRESS/CANCELLED`, `PAID→IN_PROGRESS`, `IN_PROGRESS→COMPLETED`) |
| PATCH | `/:id/cancel` | CUSTOMER | — | Customer cancels their own booking (blocked once `COMPLETED`/`CANCELLED`), releases slots |

---

## Payment — `/api/payment` (SSLCommerz)

| Method | Endpoint | Auth | Body | Description |
|---|---|---|---|---|
| GET | `/:booking_id/init` | CUSTOMER | — | Starts an SSLCommerz session for an `ACCEPTED` booking owned by the caller; upserts a `PENDING` `Payment` row |
| POST | `/:booking_id/success` | Public (gateway callback) | `{ val_id }` (form-posted by gateway) | Validates with SSLCommerz, marks `Payment` `COMPLETED` and `Booking` `PAID`, redirects browser to the booking |
| POST | `/:booking_id/fail` | Public (gateway callback) | — | Marks `Payment` `FAILED`, redirects browser to the booking |
| POST | `/:booking_id/cancel` | Public (gateway callback) | — | Marks `Payment` `FAILED` (no distinct `CANCELLED` status exists), redirects browser to the booking |
| GET | `/my_payments` | CUSTOMER | — | Logged-in customer's payment history |
| GET | `/:booking_id/details` | CUSTOMER, ADMIN | — | Full payment detail; customer must own the booking, admin can view any |

All payments for admin: see `GET /api/admin/payments` below.

---

## Review — `/api/review`

| Method | Endpoint | Auth | Body | Description |
|---|---|---|---|---|
| POST | `/:bookingId` | CUSTOMER | `{ rating (1-5), comment? }` | Reviews a `COMPLETED` booking owned by the caller (one per booking); updates the technician's `averageRating`/`totalReviews` |
| GET | `/my_reviews` | CUSTOMER | — | Logged-in customer's own reviews |
| GET | `/technician/:technicianId` | Public | — | All reviews for a technician |
| GET | `/service/:serviceId` | Public | — | All reviews for a service (via its bookings) |
| PATCH | `/:reviewId` | CUSTOMER | `{ rating?, comment? }` | Edits the caller's own review; adjusts the technician's `averageRating` if `rating` changed |

---

## Admin — `/api/admin`

| Method | Endpoint | Auth | Body | Description |
|---|---|---|---|---|
| GET | `/users` | ADMIN | — | All users, with profile/technicianProfile |
| PATCH | `/:id/status` | ADMIN | `{ activeStatus: "ACTIVE" \| "BLOCKED" }` | Ban/unban a user |
| PUT | `/:id/verify_technician` | ADMIN | — | Marks a `TechnicianProfile` as `verified` |
| POST | `/new_category` | ADMIN | `{ name }` | Creates a service category |
| GET | `/bookings` | ADMIN | — | Every booking, all customers/technicians |
| GET | `/payments` | ADMIN | — | Every payment, all bookings |

---

## Enums reference

- `Role`: `ADMIN`, `CUSTOMER`, `TECHNICIAN`
- `ActiveStatus`: `ACTIVE`, `BLOCKED`
- `BookingStatus`: `REQUESTED`, `ACCEPTED`, `DECLINED`, `PAID`, `IN_PROGRESS`, `COMPLETED`, `CANCELLED`
- `PaymentStatus`: `PENDING`, `COMPLETED`, `FAILED`, `REFUNDED`
- `PaymentProvider`: `STRIPE`, `SSLCOMMERZ` (only SSLCommerz is implemented)
