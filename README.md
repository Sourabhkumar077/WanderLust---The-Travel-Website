# WanderLust - Modern Travel Listings Platform

A full-stack web application for managing travel listings and reviews, built with Node.js, Express, and MongoDB. This project was developed during my full-stack development learning journey, featuring a modern, responsive design with enhanced user experience.

## ✨ Features

### 🎨 Modern UI/UX Design
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern Color Scheme**: Beautiful gradient backgrounds and professional styling
- **Interactive Elements**: Smooth hover effects, transitions, and animations
- **Minimalist Footer**: Clean, elegant footer with beautiful gradient design
- **Professional Typography**: Consistent font usage throughout the application

### 🔐 User Authentication
- **Secure Registration & Login**: Modern form design with validation
- **Session Management**: Express-session with secure cookie configuration
- **Protected Routes**: Middleware-based route protection
- **Flash Messages**: User-friendly feedback for all actions
- **Auto-login**: Automatic login after successful registration

### 🏠 Listings Management
- **CRUD Operations**: Create, read, update, and delete travel listings
- **Image Upload**: Cloudinary integration with fallback images
- **Rich Information**: Title, description, location, country, and pricing
- **Owner Authorization**: Only listing owners can edit/delete their listings
- **Modern Forms**: Enhanced form design with icons and validation

### ⭐ Review System
- **Star Ratings**: Interactive 1-5 star rating system
- **Comment System**: Rich text reviews with author attribution
- **Author Management**: Users can only delete their own reviews
- **Cascade Deletion**: Reviews are automatically removed when listings are deleted
- **Review Cards**: Beautiful card-based review display

### 💰 Tax Toggle Feature
- **Dynamic Pricing**: Toggle to show/hide 18% GST information
- **Real-time Updates**: Instant display changes without page reload
- **Mobile Responsive**: Works perfectly on all device sizes
- **Professional Styling**: Clean, modern toggle switch design

### 🎯 Filter System
- **Category Filters**: Trending, Rooms, Cities, Castles, Mountains, Beaches, etc.
- **Interactive Icons**: FontAwesome icons with hover effects
- **Responsive Layout**: Adapts to different screen sizes
- **Smooth Animations**: Elegant hover and transition effects

## 🛠️ Tech Stack

### Backend
- **Node.js**: Server-side JavaScript runtime
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling
- **Passport.js**: Authentication middleware
- **Multer**: File upload handling
- **Cloudinary**: Cloud image storage

### Frontend
- **EJS**: Server-side templating engine
- **Bootstrap 5**: CSS framework for responsive design
- **FontAwesome**: Icon library
- **Custom CSS**: Modern styling with gradients and animations
- **JavaScript**: Interactive functionality and form validation

### Development Tools
- **Nodemon**: Development server with auto-restart
- **Joi**: Input validation
- **Connect-flash**: Flash message middleware
- **Method-override**: RESTful form handling

## 🚀 Installation

1. **Clone the repository:**
```bash
git clone https://github.com/Sourabhkumar077/WanderLust---The-Travel-Website.git
cd wanderlust
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up environment variables:**
Create a `.env` file in the root directory:
```env
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
```

4. **Set up MongoDB:**
- Ensure MongoDB is installed and running
- The application connects to `mongodb://127.0.0.1:27017/wanderLust`

5. **Start the development server:**
```bash
npm run dev
```

6. **Access the application:**
Open your browser and navigate to `http://localhost:3000/listings`

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop**: Full-featured experience with side-by-side layouts
- **Tablet**: Optimized layouts with touch-friendly elements
- **Mobile**: Compact design with stacked layouts and touch targets

## 🎨 Design Features

### Modern Styling
- **Gradient Backgrounds**: Beautiful color transitions
- **Card-based Layout**: Clean, organized content presentation
- **Hover Effects**: Interactive elements with smooth transitions
- **Professional Typography**: Consistent font hierarchy
- **Color Consistency**: Strategic use of brand colors

### Interactive Elements
- **Tax Toggle**: Dynamic pricing display
- **Filter Categories**: Interactive category selection
- **Form Validation**: Real-time input validation
- **Smooth Animations**: Elegant transitions throughout
- **Loading States**: Visual feedback for user actions

## 🔧 API Endpoints

### Authentication
- `GET /signup` - User registration form
- `POST /signup` - Create new user account
- `GET /login` - User login form
- `POST /login` - Authenticate user
- `GET /logout` - Logout user

### Listings
- `GET /listings` - View all listings with filters
- `GET /listings/new` - Create new listing form
- `POST /listings` - Create new listing
- `GET /listings/:id` - View specific listing with reviews
- `GET /listings/:id/edit` - Edit listing form
- `PUT /listings/:id` - Update listing
- `DELETE /listings/:id` - Delete listing

### Reviews
- `POST /listings/:id/reviews` - Add review to listing
- `DELETE /listings/:id/reviews/:reviewId` - Delete review

## 🔒 Security Features

- **HTTP-only Cookies**: Secure session management
- **Password Hashing**: bcrypt-based password security
- **Input Validation**: Joi schema validation
- **Protected Routes**: Authentication middleware
- **CSRF Protection**: Built-in Express security
- **XSS Prevention**: Input sanitization

## 📊 Database Schema

### User Model
```javascript
{
  email: String (required, unique),
  username: String (auto-generated by passport-local-mongoose)
}
```

### Listing Model
```javascript
{
  title: String (required),
  description: String,
  price: Number,
  image: { url: String, filename: String },
  location: String,
  country: String,
  owner: ObjectId (ref: User),
  reviews: [ObjectId] (ref: Review)
}
```

### Review Model
```javascript
{
  comment: String,
  rating: Number (1-5),
  author: ObjectId (ref: User),
  createdAt: Date
}
```

## 🎯 Key Features

### Tax Toggle System
- Real-time price display with tax information
- Toggle switch for showing/hiding GST details
- Responsive design across all devices
- Professional styling with smooth animations

### Enhanced Filtering
- Multiple category filters with icons
- Interactive hover effects
- Responsive grid layout
- Smooth transitions and animations

### Modern Forms
- Icon-enhanced form fields
- Real-time validation
- Professional styling
- Mobile-optimized input fields

### Review Management
- Star rating system
- Author attribution
- Cascade deletion
- Beautiful card-based display

## 🚀 Deployment

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- Cloudinary account

### Environment Variables
```env
NODE_ENV=production
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
```

### Production Commands
```bash
npm start
```

## 📚 Learning Journey

This project was built as part of my full-stack development learning journey. It demonstrates:

- **Backend Development**: Node.js, Express, MongoDB
- **Frontend Development**: EJS templating, CSS, JavaScript
- **Authentication**: Session management and user authorization
- **Database Design**: MongoDB schemas and relationships
- **API Development**: RESTful endpoints and middleware
- **Responsive Design**: Mobile-first approach
- **Modern UI/UX**: Professional styling and user experience

## 📝 License

This project is licensed under the ISC License.

## 👨‍💻 Developer

**Sourabh Kumar Mahuvar**
- Email: sourabhmahuvar@gmail.com
- GitHub: [@Sourabhkumar077](https://github.com/Sourabhkumar077)

## 🔗 Project Links

- **Repository**: [https://github.com/Sourabhkumar077/wanderlust](https://github.com/Sourabhkumar077/wanderlust)

---

*This project showcases my skills in full-stack web development and demonstrates practical application of modern web technologies.*
