# Samrudhi Dube — Portfolio

<<<<<<< HEAD
A dark-themed, single-page portfolio website built for an AI/ML intern aspirant, blending a machine learning focus with an emerging interest in cybersecurity.

## About

This portfolio belongs to Samrudhi Dube, a 3rd-year B.E. Information Technology student. It showcases academic background, technical skills, hands-on projects, certifications, and achievements — built with the intent of standing out to recruiters looking for AI/ML interns.

## Sections

- **Home** — hero introduction with a typing animation cycling through roles (AI/ML Intern Aspirant, Machine Learning Enthusiast, Cybersecurity Learner, Python & Flask Developer) alongside an animated network graph
- **About** — background, education, and current focus
- **Skills** — programming, web, machine learning, tools, and cybersecurity fundamentals shown as animated meters and chips
- **Projects** — Student Performance Prediction, Student Management System, and CampusMart
- **Certifications** — completed certificates and courses, each with an image and a link to the full certificate
- **Achievements** — academic and competition highlights
- **Contact** — email, GitHub, LinkedIn, resume download, and a contact form

## Tech stack

- HTML5
- CSS3 (custom design system, no framework)
- Vanilla JavaScript (no external libraries)

## Structure

```
index.html                 → page content and structure
css/style.css               → design system and styling
js/script.js                → typing effect, network graph animation, scroll reveals, form UI
assets/                      → resume file
assets/certificates/         → certificate images and PDFs
```

## Features

- Fully responsive across mobile and desktop
- Dark theme with a network/terminal visual motif
- Smooth scroll and scroll-triggered reveal animations
- Animated skill meters
- Hover effects on project and certificate cards
- Resume download button
- GitHub and LinkedIn links
- Frontend contact form
- Respects `prefers-reduced-motion` for accessibility

## Credits

Designed and built by Samrudhi Dube.
=======
A dark-themed, single-page portfolio for an AI/ML intern aspirant, built with plain HTML, CSS, and JavaScript (no build step, no dependencies).

## Structure
```
index.html          → all page content and sections
css/style.css        → design system + all styling
js/script.js         → typing effect, network graph animation, scroll reveals, form UI
assets/              → put your resume PDF and any images here
```

## Before you deploy — 3 things to update

1. **Resume file** — add your actual resume as `assets/Samrudhi_Dube_Resume.pdf`
   (the download buttons already point to this path).
2. **Links** — in `index.html`, replace the placeholder `href="https://github.com/"`
   and `href="https://linkedin.com/"` with your real profile URLs, and update the
   email address in the Contact section.
3. **Contact form** — the form is front-end only (it shows a confirmation message
   but doesn't send anywhere). To make it functional, wire it up to a service like
   Formspree, EmailJS, or your own backend endpoint inside `js/script.js`
   (`contactForm.addEventListener('submit', ...)`).

## Run locally
Just open `index.html` in a browser, or serve it with any static server:
```bash
python -m http.server 8000
```

## Deploy on GitHub Pages
1. Push this folder to a GitHub repository.
2. Go to **Settings → Pages**.
3. Set source to your main branch, root folder.
4. Your site will be live at `https://<username>.github.io/<repo>/`.

## Deploy on Netlify
1. Drag and drop this folder onto [app.netlify.com/drop](https://app.netlify.com/drop), or
2. Connect the GitHub repo in Netlify and deploy with default settings (no build command needed — it's static HTML/CSS/JS).

## Notes
- Fully responsive: tested breakpoints at 980px and 720px.
- Respects `prefers-reduced-motion` (disables the typing loop and background animation).
- No external JS libraries — everything is vanilla for easy deployment and editing.
>>>>>>> 850404c971c91b3b9fe6b8f3000d37521595f34b
