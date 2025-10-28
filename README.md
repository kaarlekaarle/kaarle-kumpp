# Kaarle & Kumpp - Portfolio Website

A static HTML portfolio website for Kaarle & Kumpp, showcasing design work and client projects.

## 🌐 Live Website
**https://kaarlekumpp.fi**

## 📁 Repository Structure

This repository contains the production-ready static HTML version of the website.

### Core Files
- `index.html` - Homepage
- `about.html` - About page  
- `works.html` - Works overview page
- `client-*.html` - Individual client project pages
- `styles.css` - Main stylesheet
- `client.js` - Client page functionality
- `works.js` - Works page functionality
- `generate-clients.js` - Script to generate client HTML pages from JSON data

### Assets
- `data/` - Client data (JSON files)
- `images/` - All images, icons, and visual assets
- `fonts/` - Custom fonts
- `files/` - PDFs and downloadable assets
- `icon.svg` - Site favicon

### Deployment
- `.github/workflows/deploy.yml` - GitHub Actions workflow for AWS S3 deployment

## 🚀 Deployment

The website is automatically deployed to AWS S3 via GitHub Actions when changes are pushed to the `main` branch.

### Deployment Process
1. Changes are pushed to `main` branch
2. GitHub Actions workflow triggers
3. Files are synced to S3 bucket `kaarle-kumpp`
4. CloudFront CDN serves the updated content

## 🛠️ Development

### Local Development
To run the website locally:

```bash
# Using Python (built into macOS)
python3 -m http.server 8000

# Then open: http://localhost:8000
```

### Adding New Client Projects
1. Add client data to `data/clients.json`
2. Run the generation script: `node generate-clients.js`
3. Commit and push changes

### File Structure Requirements
- All HTML files must be in the root directory
- Assets must be in their respective directories (`images/`, `fonts/`, `files/`)
- Client data must be in `data/` directory

## 📱 Features

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Touch-Friendly**: Mobile-optimized with swipe gestures for galleries
- **Fast Loading**: Static HTML with optimized assets
- **SEO Optimized**: Proper meta tags and semantic HTML
- **Accessible**: Follows web accessibility guidelines

## 🔧 Technical Details

- **No Build Process**: Pure HTML/CSS/JavaScript
- **No Dependencies**: No Node.js or package managers required
- **CDN Hosted**: Served via AWS CloudFront for global performance
- **Mobile Gallery**: Custom touch event handling for image galleries

## 📝 Content Management

Client projects are managed through JSON files in the `data/` directory:
- `clients.json` - Client project data
- `fields.json` - Field definitions for the CMS

## 🔄 Backup

The Next.js development version is maintained separately in the `html-static-test` repository for reference and future development.

## 📞 Contact

For questions about this website or development, contact the development team.

---

**Last Updated**: October 2024  
**Version**: Static HTML Production