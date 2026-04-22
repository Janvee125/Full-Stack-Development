# Assignment 2: Personal Portfolio Website

## 📌 Problem Statement
Design and develop a personal portfolio website that presents personal details, skills, projects, and contact information in an organized and visually appealing manner.

---

## 🎯 Objective
- To design a personal portfolio webpage using HTML and CSS
- To practice webpage layout and styling techniques
- To present personal information and projects in a structured format
- To implement interactive features using JavaScript
- To create a responsive and user-friendly interface

---

## 🛠️ Technologies Used
- **HTML5** - Semantic markup and structure
- **CSS3** - Styling, animations, and responsive design
- **JavaScript** - Interactivity and form validation
- **Google Fonts** - Typography (Poppins, Inter)

---

## 📖 Description
This project is a personal portfolio website that showcases an individual's profile, skills, projects, and contact details.

The webpage is structured using semantic HTML5 and styled using modern CSS3 to create a clean and visually appealing layout. Advanced CSS features include:
- **CSS Gradients** - Linear gradients for backgrounds and elements
- **Backdrop Filters** - Glass-morphism effect on header
- **CSS Animations** - Fade-in animations for elements
- **Media Queries** - Responsive design for different screen sizes
- **Flexbox & Grid** - Modern layout techniques

JavaScript is used to add interactivity including:
- Form validation and submission handling
- Smooth scrolling navigation
- Intersection Observer for scroll animations
- Interactive button handlers

---

## ✨ Features

### 1. **Navigation Bar**
   - Sticky header with blur effect
   - Logo with gradient background
   - Smooth navigation links to different sections
   - Hover effects and animations

### 2. **Hero Section**
   - Eye-catching introduction with large heading
   - Call-to-action buttons (Resume, Contact)
   - Background gradient with depth effect
   - Fade-in animations on load

### 3. **About Section**
   - Personal introduction with professional description
   - Styled container with left border accent
   - Responsive layout

### 4. **Skills Section**
   - Display of technical skills with gradient pills
   - Hover animations for interactivity
   - Organized in rows with flex layout
   - Skills include: HTML, CSS, JavaScript, React, Node.js, Express, MySQL, MongoDB, Git, APIs, DSA, and more

### 5. **Projects Section**
   - Showcases featured projects in card layout
   - Each card displays:
     - Project title and description
     - Technologies used
     - Project tags for quick categorization
   - Hover effects with elevation and glow
   - Grid layout that adapts to screen size

### 6. **Contact Section**
   - Contact form with validation
   - Fields: Name, Email, Message
   - Real-time validation feedback
   - Success/error message display
   - Button hover effects

### 7. **Social Links Section**
   - Quick links to social profiles
   - Styled buttons with hover effects

### 8. **Responsive Design**
   - Works on desktop, tablet, and mobile devices
   - Breakpoints: 768px and 480px
   - Touch-friendly interface
   - Optimized layouts for different screen sizes

---

## 📁 Folder Structure

```
Assignment-2/
│
├── index.html          # Main HTML file
├── styles.css          # CSS stylesheet
├── script.js           # JavaScript for interactivity
├── README.md           # Documentation (this file)
```

---

## 💻 How to Use

1. **Open in Browser**
   - Open the `index.html` file in any web browser
   - No server or dependencies required

2. **Navigate**
   - Use the navigation bar to jump to different sections
   - Smooth scrolling is implemented for seamless navigation

3. **Contact Form**
   - Fill in your name, email, and message
   - Click "Send Message" button
   - Form validates input before submission

4. **Responsive Testing**
   - Open browser DevTools (F12)
   - Toggle device toolbar to test on different screen sizes

---

## 🎨 Design Features

### Color Scheme
- **Primary Color**: #38bdf8 (Sky Blue)
- **Background**: Dark gradient (#0f172a to #020617)
- **Text**: Light gray (#e2e8f0)
- **Secondary**: #0ea5e9 (Darker Blue)

### Typography
- **Headings**: Poppins (Bold, 600-700 weight)
- **Body**: Inter (Regular, 300-600 weight)

### Effects
- **Gradients**: Linear gradients for visual depth
- **Shadows**: Box shadows for elevation
- **Transitions**: Smooth 0.3s transitions on hover
- **Animations**: Fade-in animations on scroll
- **Backdrop Filter**: Blur effect on header (glass-morphism)

---

## 🔧 JavaScript Functionality

### 1. **Smooth Navigation**
   - Click on nav links to smoothly scroll to sections
   - Prevents default anchor behavior

### 2. **Form Validation**
   - Validates all fields are filled
   - Email format validation using regex
   - Success/error messages

### 3. **Interactive Buttons**
   - Resume button shows alert (can be replaced with actual download)
   - Contact button scrolls to contact section
   - Social buttons show alerts (can be linked to actual profiles)

### 4. **Scroll Animations**
   - Cards and elements fade in as they come into view
   - Intersection Observer API for performance
   - Smooth animations for better UX

### 5. **Active Navigation Indicator**
   - Highlights current section in navigation
   - Updates as user scrolls

---

## 🚀 Performance Optimization

- **Lazy Loading**: Images and content load as needed
- **CSS Animations**: Hardware-accelerated transforms
- **Intersection Observer**: Efficient scroll event handling
- **Minimized Reflows**: Optimized DOM manipulation
- **Smooth Scrolling**: Native scroll-behavior CSS

---

## ✅ Browser Compatibility

- ✅ Chrome/Chromium (Latest)
- ✅ Firefox (Latest)
- ✅ Safari (Latest)
- ✅ Edge (Latest)
- ✅ Mobile Browsers

---

## 📱 Responsive Breakpoints

| Breakpoint | Device | Adjustments |
|-----------|--------|-------------|
| 1200px+ | Desktop | Full layout, all features visible |
| 768px - 1199px | Tablet | Adjusted grid, smaller fonts |
| 480px - 767px | Mobile | Single column, touch-friendly |
| < 480px | Small Mobile | Minimal margins, large touch targets |

---

## 🛠️ Customization Guide

### Change Colors
Edit the CSS variables in `styles.css`:
```css
/* Primary color is #38bdf8 */
background: linear-gradient(135deg, #38bdf8, #0ea5e9);
```

### Modify Content
Edit `index.html` to:
- Change personal name and title
- Update skills list
- Add/remove projects
- Update contact information
- Change social media links

### Add New Sections
1. Add HTML in `index.html`
2. Style in `styles.css`
3. Add JavaScript interactivity in `script.js`

---

## 🎓 Learning Outcomes

This assignment helps in understanding:
- ✅ Semantic HTML5 structure
- ✅ Advanced CSS3 techniques (Gradients, Animations, Media Queries)
- ✅ Responsive Web Design
- ✅ JavaScript DOM manipulation
- ✅ Form validation and handling
- ✅ CSS Flexbox and Grid layouts
- ✅ Web performance optimization
- ✅ User experience best practices

---

## 📝 Notes

- No external libraries are required
- No build tools needed
- Pure HTML, CSS, and JavaScript
- Cross-browser compatible
- Mobile-first responsive design
- Accessibility considerations included

---

## 🎯 Conclusion

This assignment successfully demonstrates how to design and develop a modern, responsive personal portfolio website using HTML, CSS, and JavaScript. The portfolio showcases best practices in web design including:
- Clean and semantic structure
- Modern styling with animations
- Interactivity and form handling
- Responsive design for all devices
- Performance optimization

The portfolio can be easily customized with personal information and projects to create a professional online presence.

---

**Created**: 2026  
**Author**: Janvee Ghadge  
**Version**: 1.0
