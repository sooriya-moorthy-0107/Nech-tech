# Project Requirement Document (PRD)
## Nech Technology — Corporate Website

**Version:** 1.0
**Date:** June 2026
**Prepared For:** Nech Technology Pvt Ltd.

---

## 1. Project Overview

Nech Technology requires a modern, professional corporate website to showcase its services, technology stack, projects, and client base, along with an admin panel to manage all dynamic content. The site will use a Blue/Cyan brand theme with glassmorphism UI, 3D effects, and a fully responsive layout suitable for a modern SaaS-style company.

---

## 2. Goals

- Present Nech Technology as a credible, professional technology company.
- Build trust with potential clients through a visible "Our Clients" section, testimonials, and a transparent development process.
- Generate leads through quote requests, consultation bookings, and demo bookings.
- Support careers and recruitment through a dedicated careers page with resume upload.
- Rank well in both traditional search (SEO) and AI-driven search engines (GEO).

---

## 3. Public Website — Page List

1. Home
2. About Us
3. Services
4. Solutions
5. Portfolio
6. Project Details Pages
7. Industries We Serve (Startups)
8. Careers
9. Blog
10. Contact Us

---

## 4. Homepage Structure

1. **Hero Section**
   - 3D interactive background
   - Animated particles
   - Glassmorphism hero card
   - Primary CTA: "Get a Free Quote"
   - Secondary CTA: "Book a Free Consultation"
2. **About Nech Technology**
3. **Why Choose Nech Technology**
4. **Services Section**
5. **Technology Stack Section** (see Section 6)
6. **Industries We Serve** (Startups)
7. **Featured Projects**
   - School Management System
   - Hospital Management System
   - E-Commerce Platform
8. **Statistics Section**
   - 24/7 Support
   - Startup-Friendly Solutions
9. **Our Development Process** (see Section 7)
10. **Consultation & Demo Booking**
11. **AI Chatbot + WhatsApp + Live Chat**
12. **Contact Section**
13. **Footer**

---

## 5. Our Clients Section

A dedicated section to display client logos for credibility and trust.

**Display Style:** Grid view (recommended), with optional logo slider/carousel for larger client lists.

**Data Model (Client):**

| Field | Type | Notes |
|---|---|---|
| id | Integer | Primary key |
| name | String | Client company name |
| logo | String (URL/path) | Client logo image |

**Frontend (React):** Renders a responsive grid of client cards, each showing a logo and company name.

**Backend (Node.js/Express):** Exposes a `GET /api/clients` endpoint returning clients sorted alphabetically by name, pulled from the PostgreSQL database.

**Admin Capability:** Admins can add, edit, reorder, and remove client entries from the Admin Panel (see Section 9).

---

## 6. Technology Stack Section

**Display Style:** Animated glassmorphism cards with hover effects.

| Category | Technologies |
|---|---|
| Frontend | React.js, React Native, TypeScript |
| Backend | Node.js, REST APIs |
| Database | PostgreSQL |
| Cloud & DevOps | AWS, Docker |

**Animation Effects:**
- Floating 3D icons
- Glassmorphism cards
- Hover glow effect
- Scroll reveal animation
- Particle background integration

---

## 7. Our Development Process

Displayed as an animated timeline with glassmorphism cards and scroll-triggered animations.

| Step | Stage | Description |
|---|---|---|
| 01 | Requirement Analysis | Understand business goals, challenges, and project requirements to define the right solution. |
| 02 | UI/UX Design | Create intuitive, engaging, and responsive user interfaces. |
| 03 | Development | Build scalable, secure, high-performance applications using modern technologies. |
| 04 | Testing & Quality Assurance | Comprehensive testing for reliability, security, and performance. |
| 05 | Deployment | Deploy using industry best practices on cloud-ready infrastructure. |
| 06 | Support & Maintenance | Ongoing support, updates, monitoring, and enhancements post-delivery. |

---

## 8. Advanced Features

- Multi-language support (English, Tamil, Hindi)
- Dark/Light mode toggle
- 3D interactive background
- Animated particles
- Glassmorphism UI throughout
- AI chatbot integration
- WhatsApp integration
- Live chat widget
- "Get a Quote" form
- Consultation booking
- Demo booking
- Resume upload (Careers page)

---

## 9. Admin Panel

| Module | Description |
|---|---|
| Admin Authentication | Secure login for administrators |
| Dashboard Analytics | Overview of site traffic, leads, and activity |
| Manage Services | Add/edit/remove service listings |
| Manage Projects | Add/edit/remove portfolio projects |
| Manage Clients | Add/edit/remove client logos and names |
| Manage Careers | Post and manage job openings, view applicants |
| Manage Blog Posts | Create/edit/publish blog content |
| Manage Contact Requests | View and respond to contact form submissions |
| Manage Quote Requests | View and respond to quote/consultation/demo requests |

---

## 10. Technology Stack (Platform)

| Layer | Technology |
|---|---|
| Frontend | React + TypeScript |
| Backend | Node.js + Express.js |
| Database | PostgreSQL |
| Cloud | AWS |
| Containerization | Docker |

---

## 11. SEO & GEO (AI Search Optimization)

- Complete on-page SEO setup
- Google Analytics integration
- Google Search Console setup
- XML sitemap
- Schema markup (structured data)
- AI Search Optimization for ChatGPT, Gemini, Claude, and Perplexity (GEO)

---

## 12. Design Direction

- **Brand Theme:** Blue/Cyan
- **Style:** Glassmorphism, 3D effects, modern SaaS UI
- **Layout:** Fully responsive across desktop, tablet, and mobile

---

## 13. Footer

**Copyright Text:**
© 2026 Nech Technology Pvt Ltd. All Rights Reserved.

---

## 14. Suggested Next Steps

1. React + Node.js folder structure
2. PostgreSQL database schema design
3. Admin panel wireframes
4. Full homepage wireframe
5. AI build prompt for tools like Lovable, Bolt, Cursor, or Windsurf
6. Figma UI design prompt

---

*End of Document*
