# VARRO — Men's Luxury Clothing

> A dark, editorial e-commerce website for a men's luxury clothing brand. Built with pure HTML, CSS, and vanilla JavaScript — no frameworks, no dependencies.

![VARRO](webUploads/indexPage1.jpg)

---

## 📋 Overview

VARRO is a fully responsive, multi-page frontend website for a premium menswear brand. It features a cinematic hero video, product catalog with cart functionality, a full marketing section, and a content hub — all styled with a refined dark-and-gold aesthetic.

---

## 🗂️ Pages

| Page | File | Description |
|------|------|-------------|
| Home | `index.html` | Hero video, featured products, category grid, newsletter |
| Products | `products.html` | Full catalog with category filter |
| About | `about.html` | Brand story and team |
| Blog | `blog.html` | Editorial blog posts |
| Content Hub | `content.html` | Aggregated content overview |
| Videos | `videos.html` | Video content page |
| Insights | `insights.html` | Brand insights and reports |
| Newsletters | `newsletters.html` | Newsletter archive |
| Social Media | `social-media-marketing.html` | SMM strategy page |
| Social Shop | `social-shop.html` | Shoppable social content |
| Deal Sourcing | `deal-sourcing.html` | Sourcing and partnerships |
| Promo Emails | `promo-emails.html` | Promotional email templates |
| Transaction Emails | `transaction-emails.html` | Transactional email templates |
| Affiliate | `affiliate.html` | Partner programme page |
| Contact | `contact.html` | Contact form |
| Login | `login.html` | Login page |
| Sign In | `signin.html` | Account creation page |

---

## ✨ Features

- **Hero Video Section** — Full-screen autoplay background video with overlay and animated text
- **Shopping Cart** — Add/remove items, quantity controls, subtotal and shipping calculation, persisted via `localStorage`
- **Product Filtering** — Filter catalog by category (Shirts, Outerwear, Trousers, Knitwear, Denim)
- **Scroll Animations** — Custom IntersectionObserver-based AOS (Animate on Scroll) system
- **Sticky Header** — Transparent on load, frosted-glass effect on scroll
- **Dropdown Navigation** — Hover dropdowns for Content and Marketing sections
- **Mobile Navigation** — Hamburger menu with animated toggle
- **Newsletter Signup** — Email capture with toast confirmation
- **Contact Form** — Submission with visual feedback
- **Toast Notifications** — Lightweight pop-up feedback for cart and form actions
- **Marquee Strip** — Animated scrolling ticker banner

---

## 🎨 Design System

| Token | Value |
|-------|-------|
| Background | `#0a0a0a` |
| Surface | `#111111` / `#181818` |
| Gold Accent | `#c9a96e` |
| Off-white | `#f0ece4` |
| Heading Font | Cormorant Garamond (Google Fonts) |
| Body Font | Barlow / Barlow Condensed (Google Fonts) |

---

## 🗃️ Project Structure

```
newSMM/
├── index.html
├── products.html
├── about.html
├── blog.html
├── content.html
├── videos.html
├── insights.html
├── newsletters.html
├── social-media-marketing.html
├── social-shop.html
├── deal-sourcing.html
├── promo-emails.html
├── transaction-emails.html
├── affiliate.html
├── contact.html
├── login.html
├── signin.html
├── style.css
├── main.js
└── webUploads/
    ├── video.mp4
    ├── indexPage1–9.jpg
    ├── productPage1–5.jpg
    ├── aboutPagePic1–2.jpg
    ├── cartPage1–3.jpg
    └── member1–3.jpg
```

---

## 🚀 Getting Started

No build tools or dependencies required. Just open in a browser.

### Run Locally

```bash
git clone https://github.com/your-username/varro.git
cd varro
```

Then open `index.html` in your browser, or use a local server for best results:

```bash
# Using VS Code Live Server (recommended)
# Right-click index.html → "Open with Live Server"

# Or using Python
python -m http.server 8000
# Visit http://localhost:8000
```

### ⚠️ Video Path Fix

The hero video in `index.html` references a local Windows path. Update it to the relative path before running:

```html
<!-- Change this: -->
<source src="C:\Users\...\video.mp4" type="video/mp4">

<!-- To this: -->
<source src="webUploads/video.mp4" type="video/mp4">
```

---

## 🛠️ Built With

- **HTML5** — Semantic markup
- **CSS3** — Custom properties, Flexbox, Grid, animations
- **Vanilla JavaScript** — No frameworks or libraries
- **Google Fonts** — Cormorant Garamond, Barlow, Barlow Condensed

---

## 📁 Key Files

- **`style.css`** — All styles (~1,400 lines), organised by component
- **`main.js`** — Cart logic, scroll animations, nav behaviour, form handling (~220 lines)

---

## 📄 License

This project is for personal/portfolio use. All product images sourced from [Unsplash](https://unsplash.com).

---

*Crafted with intention.*
