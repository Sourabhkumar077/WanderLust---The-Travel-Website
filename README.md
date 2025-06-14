# WanderLust - Travel Listings Platform

A full-stack web application for managing travel listings and reviews, built with Node.js, Express, and MongoDB.

## Features

### User Authentication
- Secure user registration and login system
- Session-based authentication using Passport.js
- Protected routes for authenticated users
- Secure password hashing
- Flash messages for user feedback
- Automatic login after registration
- Smart redirect system for protected routes

### Listings Management
- Create, read, update, and delete travel listings
- Image upload support with default fallback
- Detailed listing information including:
  - Title and description
  - Location and country
  - Price
  - Category
  - Multiple images

### Review System
- Add and manage reviews for listings
- Rating system
- Comment functionality
- Default image support for reviews
- User association with reviews

### Additional Features
- Responsive design
- Error handling middleware
- Input validation
- MongoDB integration
- EJS templating
- Method override for PUT/PATCH/DELETE requests
- Static file serving
- Session management
- Flash messages

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: Passport.js, Local Strategy
- **Frontend**: EJS, CSS, JavaScript
- **Session Management**: express-session
- **File Upload**: Multer
- **Other**: Method Override, Connect Flash

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Sourabhkumar077/WanderLust---The-Travel-Website.git
cd wanderlust
```

2. Install dependencies:
```bash
npm install
```

3. Set up MongoDB:
- Ensure MongoDB is installed and running on your system
- The application connects to `mongodb://127.0.0.1:27017/wanderLust`

4. Start the server:
```bash
npm start
```

5. Access the application:
- Open your browser and navigate to `http://localhost:3000/listings`

## API Endpoints

### Authentication
- `GET /signup` - User registration form
- `POST /signup` - Create new user account
- `GET /login` - User login form
- `POST /login` - Authenticate user
- `GET /logout` - Logout user

### Listings
- `GET /listings` - View all listings
- `GET /listings/new` - Create new listing form
- `POST /listings` - Create new listing
- `GET /listings/:id` - View specific listing
- `GET /listings/:id/edit` - Edit listing form
- `PUT /listings/:id` - Update listing
- `DELETE /listings/:id` - Delete listing

### Reviews
- `POST /listings/:id/reviews` - Add review to listing
- `DELETE /listings/:id/reviews/:reviewId` - Delete review

## Security Features

- HTTP-only cookies
- Session-based authentication
- Password hashing
- Protected routes
- Input validation
- XSS protection
- CSRF protection

## Error Handling

The application includes comprehensive error handling:
- 404 Not Found errors
- Validation errors
- Authentication errors
- Database errors
- Custom error middleware

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Sourabh kumar Mahuvar - sourabhmahuvar@gmail.com
Project Link: [https://github.com/Sourabhkumar077/wanderlust](https://github.com/Sourabhkumar077/wanderlust) 
