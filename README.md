# Samrudhi Dube — Portfolio

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
