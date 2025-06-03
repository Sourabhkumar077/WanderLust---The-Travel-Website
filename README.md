# WanderLust - Travel Listings Platform

WanderLust is a full-stack web application that allows users to create, view, edit, and delete travel listings. Users can also add reviews to listings, making it a complete travel community platform.

## Features

- 🔍 Browse travel listings
- ➕ Create new travel listings
- ✏️ Edit existing listings
- 🗑️ Delete listings
- ⭐ Add reviews to listings
- 💬 Comment on listings
- 🖼️ Automatic default images for listings
- 📱 Responsive design

## Tech Stack

- **Frontend:**
  - EJS (Embedded JavaScript)
  - Bootstrap
  - HTML/CSS
  - JavaScript

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB
  - Mongoose

## Prerequisites

Before running this project, make sure you have installed:

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm (Node Package Manager)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Sourabhkumar077/WanderLust---The-Travel-Website.git
cd WanderLust
```

2. Install dependencies:
```bash
npm install
```

3. Start MongoDB:
```bash
mongod
```

4. Start the application:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Project Structure

```
WanderLust/
├── models/
│   ├── listing.js
│   └── review.js
├── routes/
│   ├── listing.js
│   └── review.js
├── views/
│   ├── listings/
│   │   ├── index.ejs
│   │   ├── new.ejs
│   │   ├── show.ejs
│   │   └── edit.ejs
│   └── error.ejs
├── public/
├── utils/
│   ├── wrapAsync.js
│   └── expressError.js
├── schema.js
├── app.js
└── package.json
```

## API Endpoints

### Listings
- `GET /listings` - View all listings
- `GET /listings/new` - Form to create new listing
- `POST /listings` - Create new listing
- `GET /listings/:id` - View specific listing
- `GET /listings/:id/edit` - Form to edit listing
- `PUT /listings/:id` - Update listing
- `DELETE /listings/:id` - Delete listing

### Reviews
- `POST /listings/:id/reviews` - Add review to listing
- `DELETE /listings/:id/reviews/:reviewId` - Delete review

## Features in Detail

### Listing Management
- Create new travel listings with title, description, price, location, and country
- Upload custom images or use default images
- Edit existing listings
- Delete listings

### Review System
- Add reviews with ratings (1-5 stars)
- Add comments to reviews
- Delete reviews
- View all reviews for a listing

### Error Handling
- Custom error pages
- Form validation
- Server-side validation
- Client-side validation

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Author

Sourabh Kumar

## Acknowledgments

- Unsplash for default images
- Bootstrap for UI components
- MongoDB for database
- Express.js for backend framework 