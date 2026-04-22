# Assignment 3: E-Commerce Website

## 📌 Problem Statement
Design and develop a basic e-commerce website interface that allows users to browse products and interact with a shopping cart using HTML, CSS, and JavaScript.

---

## 🎯 Objective

- To understand the structure of an e-commerce webpage
- To implement product display and cart interaction
- To practice frontend development using HTML, CSS, and JavaScript
- To enhance user interface design and webpage functionality

---

## 🛠️ Technologies Used

- **HTML** - Webpage structure and semantic markup
- **CSS** - Styling, layout, and responsive design
- **JavaScript** - Interactivity, cart functionality, and form handling

---

## 📖 Description

This assignment demonstrates the development of a simple e-commerce web application interface. The webpage allows users to view products and interact with a basic shopping cart functionality.

HTML is used to create the webpage structure, CSS is applied for styling and layout, and JavaScript is used to add interactivity such as adding items to the cart and handling user actions.

The website includes product display sections, navigation elements, and a cart page where selected items can be viewed.

---

## ✨ Features

### 1. **Product Listing**
   - Display of products with images and details
   - Product information including name, category, and price
   - Featured products on home page
   - Browse all products on dedicated products page

### 2. **Add to Cart Functionality**
   - Add items to shopping cart using JavaScript
   - Quantity management (increase/decrease)
   - Remove items from cart
   - Cart persists using localStorage

### 3. **Shopping Cart**
   - Separate cart page to view selected items
   - Display cart items with images, names, prices
   - Calculate subtotal, tax, and total
   - Option to continue shopping or proceed to checkout

### 4. **Product Details Page**
   - View individual product information
   - Quantity selector
   - Add to cart with custom quantity

### 5. **Checkout Process**
   - Shipping information form
   - Payment information form
   - Order summary
   - Form validation

### 6. **Order Success**
   - Order confirmation page
   - Display order number, date, and total
   - Options to continue shopping

### 7. **User Authentication**
   - Login page with email and password
   - Registration page for new users
   - Password confirmation validation
   - Form submission handling

### 8. **Responsive Design**
   - Mobile-friendly layout
   - Works on tablets and desktops
   - Breakpoints for different screen sizes

---

## 📁 Folder Structure

```
Assignment-3/
│
├── index.html              # Home page with featured products
├── products.html           # Products listing page with filters
├── product-details.html    # Individual product details page
├── cart.html              # Shopping cart page
├── checkout.html          # Checkout and payment page
├── order-success.html     # Order confirmation page
├── login.html             # User login page
├── register.html          # User registration page
├── style.css              # All CSS styling
├── script.js              # All JavaScript functionality
└── README.md              # This file
```

---

## 🚀 How to Use

### 1. **Opening the Website**
   - Open `index.html` in any web browser
   - No server or installation required
   - All data stored locally using localStorage

### 2. **Browsing Products**
   - Home page displays featured products
   - Click "Shop Now" or go to Products page
   - Use search box to find products
   - Filter by category (Men's, Women's, Kids)

### 3. **Shopping**
   - Click "View" to see product details
   - Click "Add to Cart" to add items
   - Adjust quantity and proceed to cart
   - View cart summary and proceed to checkout

### 4. **Checkout**
   - Fill in shipping information
   - Enter payment details
   - Review order summary
   - Click "Place Order"

### 5. **User Accounts**
   - Click "Register" to create new account
   - Use "Login" with existing credentials
   - Password must match confirmation

---

## 💾 Data Storage

- **localStorage** is used to store:
  - Shopping cart items
  - User information
  - Order details
  - Current product being viewed

---

## 🎨 Design Elements

### Color Scheme
- **Primary**: Purple gradient (#667eea to #764ba2)
- **Accent**: Gold/Yellow (#ffd700)
- **Text**: Dark gray (#333)
- **Background**: Light gray (#f5f5f5)
- **White**: #ffffff

### Layout
- **Grid Layout**: Products displayed in responsive grid
- **Flexbox**: Navigation and forms
- **Fixed Navigation**: Sticky navbar at top
- **Cards**: Product cards with hover effects

### Effects
- **Hover Effects**: Cards lift on hover
- **Transitions**: Smooth 0.3s transitions
- **Box Shadows**: Depth and elevation
- **Responsive**: Breakpoints at 768px and 480px

---

## 📦 Product Database

Built-in product database includes:
- 8 sample products (Men's, Women's, Kids categories)
- Product details: ID, name, category, price, image, description
- Easily expandable with new products

Sample Products:
```
1. Men Shirt - $29.99
2. Women Dress - $49.99
3. Kids T-Shirt - $19.99
4. Men Jeans - $59.99
5. Women Coat - $89.99
6. Kids Jacket - $39.99
7. Men Sweater - $44.99
8. Women Skirt - $39.99
```

---

## 🔧 JavaScript Functionality

### Core Functions
- `loadFeaturedProducts()` - Display featured products
- `loadProducts(filter)` - Load all products with optional category filter
- `addToCart(productId)` - Add item to cart
- `loadCart()` - Display cart items
- `updateCartSummary()` - Calculate totals
- `removeFromCart(index)` - Delete item from cart
- `increaseQuantity(index)` - Increase item quantity
- `decreaseQuantity(index)` - Decrease item quantity
- `viewProduct(productId)` - Navigate to product details
- `handleCheckoutForm()` - Process checkout
- `loadOrderSuccess()` - Display order confirmation

### Form Validation
- Login form validation
- Register form with password confirmation
- Checkout form with all required fields
- Search and category filtering

---

## 📱 Responsive Breakpoints

| Breakpoint | Device | Changes |
|-----------|--------|---------|
| 1200px+ | Desktop | Full layout, grid columns: 4 |
| 768px - 1199px | Tablet | Grid columns: 2-3 |
| 480px - 767px | Mobile | Grid columns: auto |
| < 480px | Small Mobile | Single column, adjusted fonts |

---

## ✅ Features Summary

| Feature | Status |
|---------|--------|
| Product Display | ✅ Complete |
| Add to Cart | ✅ Complete |
| Cart Management | ✅ Complete |
| Product Details | ✅ Complete |
| Checkout Flow | ✅ Complete |
| Order Confirmation | ✅ Complete |
| User Registration | ✅ Complete |
| User Login | ✅ Complete |
| Search Functionality | ✅ Complete |
| Category Filter | ✅ Complete |
| Responsive Design | ✅ Complete |
| Form Validation | ✅ Complete |

---

## 🛠️ Customization

### Add New Product
Edit `script.js` and add to the `products` array:
```javascript
{ id: 9, name: 'New Product', category: 'mens', price: 39.99, image: '👕', description: 'Product description' }
```

### Change Colors
Edit `style.css`:
```css
/* Change primary color */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Modify Form Fields
Edit the HTML pages to add/remove form fields as needed

---

## 🎓 Learning Outcomes

This assignment covers:
- ✅ HTML structure and semantic markup
- ✅ CSS styling and responsive design
- ✅ JavaScript DOM manipulation
- ✅ Event handling and listeners
- ✅ Form validation
- ✅ localStorage for data persistence
- ✅ Array methods and filtering
- ✅ Template literals and string manipulation
- ✅ E-commerce workflow implementation
- ✅ User interface design best practices

---

## 📝 Browser Compatibility

- ✅ Chrome/Chromium (Latest)
- ✅ Firefox (Latest)
- ✅ Safari (Latest)
- ✅ Edge (Latest)
- ✅ Mobile Browsers

---

## 🎯 Conclusion

This assignment successfully demonstrates how to build a functional e-commerce website interface using HTML, CSS, and JavaScript. The project covers essential e-commerce features including product browsing, shopping cart management, checkout process, and user authentication.

The website is fully responsive, user-friendly, and provides a complete shopping experience from browsing to order confirmation. All data is managed locally using browser storage, making it suitable for learning and demonstration purposes.

---

**Created**: 2026  
**Assignment**: 3  
**Version**: 1.0
