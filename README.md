# FlowPilot - Smart Analytics SaaS Landing Page

A modern, fully responsive SaaS landing page built using pure HTML, CSS, and Vanilla JavaScript.

This project simulates a real-world analytics product interface, focusing on clean UI/UX design, interactive components, and dynamic data rendering using a JSON-based data layer.

---

## Live Demo

https://flow-pilot-landing.netlify.app/

---

## Overview

FlowPilot is a front-end portfolio project designed to replicate the experience of a modern SaaS analytics platform.

The goal of this project is to demonstrate the ability to:

* Build production-style UI without frameworks
* Implement interactive components using JavaScript
* Structure a scalable front-end architecture
* Simulate real-world data-driven dashboards

---

## Features

- **Dark / Light mode** with localStorage persistence
- **Animated hero dashboard** with live bar chart and metrics
- **Animated counters** triggered on scroll (IntersectionObserver)
- **Testimonials carousel** with touch swipe, autoplay, and dot navigation
- **Pricing toggle** - Monthly / Annual with smooth price animation
- **FAQ accordion** with live search and clear functionality
- **Multi-step contact form** with validation (3 steps)
- **Cookie consent banner** with localStorage memory
- **Announcement bar** with smooth close animation
- **Custom cursor** with follower animation (desktop only)
- **Sticky CTA bar** - appears after scrolling past the hero
- **Back to top** button
- **Fully responsive** with hamburger mobile menu
- **Accessible** - ARIA labels, keyboard-friendly


---

### Dashboard Simulation

* Dynamic KPI metrics (Revenue, Leads, Conversions, Churn)
* JSON-based data loading (`data.json`)
* Animated bar chart with fallback logic
* Real-time UI updates from fetched data

---

### Interactivity

* Testimonials carousel (autoplay + swipe support)
* Pricing toggle (Monthly / Annual)
* FAQ system with live search and filtering
* Multi-step contact form with validation
* Animated counters triggered on scroll
* Sticky CTA and back-to-top button

---

### User Experience Enhancements

* Cookie consent banner with persistent state
* Announcement bar with dismiss animation
* Custom cursor interaction (desktop only)
* Accessible navigation (ARIA labels, keyboard-friendly)

---

## Tech Stack

| Technology        | Usage                              |
| ----------------- | ---------------------------------- |
| HTML5             | Semantic structure                 |
| CSS3              | Layout, animations, variables      |
| JavaScript (ES6+) | Interactivity and DOM manipulation |
| JSON              | Simulated API data                 |
| Google Fonts      | Typography (Syne + DM Sans)        |

---

## Project Structure

```
flowpilot-landing/
│── index.html      # Main HTML structure
│── style.css       # Styling, layout, animations
│── script.js       # Interactivity and logic
└── data.json       # Simulated API data
```

---

## Data Handling

This project uses a local JSON file (`data.json`) to simulate API behavior.

Example:

```json
{
  "revenue": 84240,
  "growth": 12.4,
  "leads": 1284,
  "conversions": 326,
  "churn": 2.4
}
```

JavaScript fetches this data and dynamically updates the dashboard UI.

---

## Purpose of This Project

This project was built to demonstrate:

* Front-end development skills without frameworks
* UI/UX implementation for SaaS products
* Working with dynamic data (fetch + JSON)
* Writing clean, structured, maintainable code

---

## Disclaimer

FlowPilot is a fictional SaaS concept created for educational and portfolio purposes only.

No real backend, API, or AI system is implemented.

---

## Author

**Ali Razeghi**
Front-end learner | Data & Python enthusiast | Astronomy educator

---

## Feedback

If you have any feedback, suggestions, or improvements, feel free to reach out or open an issue.

---
