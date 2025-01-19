# Image Background Removal Website

An efficient and user-friendly image background removal platform developed with React.js, Tailwind CSS, Express.js, and MongoDB. This application offers secure authentication, background removal functionality, a credit system, and payment processing for credit purchases.

## Features

- **Clerk Authentication**: Provides secure user registration and login.
- **Background Removal**: Integrated with the Clifdrop API for fast and efficient background removal.
- **Credit System**:
  - Users receive 5 default credits upon registration.
  - Each background removal action deducts 1 credit.
  - Users can purchase additional credits seamlessly.
- **Payment Integration**: Implemented Razorpay for credit purchasing and payment processing.
- **Responsive UI**: Designed a user-friendly interface using React.js and Tailwind CSS.

## Tech Stack

### Frontend
- ![React.js](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) **React.js**: For building the user interface.
- ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white) **Tailwind CSS**: For responsive and modern styling.

### Backend
- ![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge) **Express.js**: For server-side logic and API handling.
- ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white) **MongoDB**: For database management.

### Authentication
- ![Clerk](https://img.shields.io/badge/Clerk-3A83F1?style=for-the-badge&logo=clerk&logoColor=white) **Clerk Authentication**: For secure login and registration.

### Background Removal
- **Clifdrop API**: For efficient and high-quality background removal.

### Payment Processing
- ![Razorpay](https://img.shields.io/badge/Razorpay-0769AD?style=for-the-badge&logo=razorpay&logoColor=white) **Razorpay**: For handling credit purchases and transactions.

## Installation and Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/Bg-Removal-Site.git
   ```

2. Install dependencies for both the client and server:
   ```bash
   # Install client dependencies
   cd clientside
   npm install

   # Install server dependencies
   cd ../serverside
   npm install
   ```

3. Set up environment variables:

### Client-Side Environment Variables
   - Create a `.env` file in the `client` directory with the following variables:
     ```env
     VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
     VITE_BACKEND_URL=your_backend_url
     VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
     ```

### Server-Side Environment Variables
   - Create a `.env` file in the `server` directory with the following variables:
     ```env
     MONGODB_URI=your_mongodb_connection_string
     CLERK_WEBHOOK_SECRET=your_clerk_webhook_secret
     CLIFDROP_API=your_clifdrop_api_key
     RAZORPAY_KEY_ID=your_razorpay_key_id
     RAZORPAY_KEY_SECRET=your_razorpay_key_secret
     CURRENCY=your_currency_code
     ```

4. Start the development servers:
   ```bash
   # Start the client
   cd clientside
   npm start

   # Start the server
   cd ../serverside
   npm start
   ```

5. Open your browser and navigate to `http://localhost:3000`.

## Folder Structure

```
image-background-removal/
├── client/          # Frontend code
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
├── server/          # Backend code
│   ├── routes/
│   ├── models/
│   ├── controllers/
│   ├── package.json
│   └── ...
└── ...
```

## Acknowledgements

- **Clerk**: For providing robust authentication.
- **Clifdrop API**: For seamless background removal.
- **Razorpay**: For easy payment integration.

---
