# FoodHub - Food Delivery Website

A modern, production-grade food ordering website built with React 18, Vite, Tailwind CSS, and Framer Motion. Designed for the Pakistani market with PKR currency and local payment methods.

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool & dev server
- **React Router v6** - Client-side routing
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Context API** - State management (Cart & Auth)
- **Lucide React** - Icon library
- **Swiper.js** - Carousel/slider components
- **React Hot Toast** - Toast notifications
- **react-helmet-async** - SEO meta tags

## Features

- 15 fully-built pages (Home, Menu, Product Detail, Deals, Cart, Checkout, Order Tracking, Login/Signup, Profile, About, Contact, Branches, FAQ, Privacy, Terms, 404)
- Working cart with add/remove/quantity controls
- Cart persistence in localStorage
- Mock promo codes (WELCOME10, FOODIE20, FLAT100, FREEDEL)
- Form validation on checkout, login, and contact
- Lazy-loaded routes for performance
- Mobile-first responsive design
- Smooth animations and micro-interactions
- SEO-ready with meta tags

## Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

The app will be available at `http://localhost:3000`

### Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
  assets/          # Static assets
  components/
    common/        # Shared components (ProductCard, CartDrawer, etc.)
    layout/        # Navbar, Footer
    ui/            # Reusable UI (Button, Input, Modal, etc.)
  context/         # CartContext, AuthContext
  data/            # Mock data (products, deals, branches, etc.)
  hooks/           # Custom hooks
  pages/           # All page components
  routes/          # Route definitions
  utils/           # Helper functions
  App.jsx          # Main app with routes
  main.jsx         # Entry point
  index.css        # Global styles
```

## Mock Data & Future API Integration

All data is currently mock/local. To connect a real backend:

1. **Products** - Replace `src/data/products.js` with API calls to `/api/products`
2. **Cart** - Replace localStorage with server-side cart via `/api/cart`
3. **Auth** - Replace `AuthContext` with real authentication via `/api/auth`
4. **Orders** - Replace mock order creation with `/api/orders`
5. **Promo Codes** - Validate codes via `/api/promo/validate`
6. **Branches** - Fetch from `/api/branches`

## Promo Codes for Testing

| Code | Discount |
|------|----------|
| WELCOME10 | 10% off |
| FOODIE20 | 20% off (orders above Rs. 1500) |
| FLAT100 | Rs. 100 off (orders above Rs. 800) |
| FREEDEL | Free delivery |

## License

MIT
