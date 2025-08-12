# Portfolio HTML Generator

A powerful static HTML generator for creating a beautiful portfolio website from structured JSON data.

## 📋 Overview

This generator automatically creates index.html files for each path defined in the `portfolio-metadata.json` file, including:

- **Root page (/)**: Displays all learning modules as cards
- **Module pages** (e.g., /HTML/, /CSS/, /REACT/): Shows projects and examples for each module
- **Projects page (/PROJECTS/)**: Displays all projects from the collection

## 🚀 Features

- **Responsive Design**: Mobile-first responsive layout
- **Font Awesome Icons**: Full icon support for visual elements
- **Beautiful Cards**: Modern card-based interface with hover effects
- **Breadcrumb Navigation**: Easy navigation between sections
- **SEO Optimized**: Proper meta tags and semantic HTML
- **Live Status Badges**: Visual indicators for project status
- **Technology Tags**: Display tech stack for each project
- **Social Links**: Integrated social media links in footer
- **Watch Mode**: Auto-regeneration on file changes

## 📁 Structure

```
html-generator/
├── package.json          # Dependencies and scripts
├── generator.js          # Main generator logic
├── assets/
│   ├── style.css        # Custom styles (optional)
│   └── script.js        # Custom scripts (optional)
└── README.md            # This file

Generated files:
├── index.html           # Root page
├── style.css            # Generated/copied styles
├── script.js            # Generated/copied scripts
├── HTML/index.html      # HTML module page
├── CSS/index.html       # CSS module page
├── REACT/index.html     # React module page
└── PROJECTS/index.html  # Projects page
```

## 🛠️ Installation & Usage

### Install Dependencies

\`\`\`bash
cd html-generator
npm install
\`\`\`

### Commands

\`\`\`bash
# Generate all HTML files
npm run generate

# Watch for changes and auto-regenerate
npm run watch

# Clean generated files
npm run clean

# Alternative generate command
npm run generate-portfolio
\`\`\`

## 📝 JSON Structure Analysis

The `portfolio-metadata.json` file structure:

### Portfolio Section
\`\`\`json
{
  "portfolio": {
    "title": "Web Learning Portfolio",
    "description": "A comprehensive journey through modern web development",
    "author": "Rahul Sharma",
    "link": "https://rsprofile.web.app/",
    "social": [
      {
        "label": "GitHub",
        "url": "https://github.com/rahulsharmadev0",
        "icon": "fa-brands fa-github"  // Font Awesome class
      }
    ],
    "lastUpdated": "2025-08-12 - Testing Watch Mode"
  }
}
\`\`\`

### Modules Array
Each module is either a project or a projects-collection:

\`\`\`json
{
  "id": "html",
  "title": "HTML Fundamentals",
  "description": "Master the building blocks of web development...",
  "icon": "📝",  // Emoji or Font Awesome class
  "path": "/HTML/",
  "type": "projects-collection",
  "children": [
    {
      "file": "p1.html",
      "title": "Getting Started",
      "description": "Basic HTML structure and fundamental concepts",
      "type": "project"
    }
  ]
}
\`\`\`

### Project Collections
For project collections:

\`\`\`json
{
  "id": "projects",
  "type": "projects-collection",
  "children": [
    {
      "id": "country_snap",
      "title": "CountrySnap",
      "description": "Interactive React application...",
      "tech": ["React 19", "Create React App"],
      "status": "live",
      "type": "project",
      "path": "/PROJECTS/country_snap/build"
    }
  ]
}
\`\`\`

## 🎨 Customization

### Custom Styles
Create `assets/style.css` to override default styles:

\`\`\`css
:root {
  --primary-color: #your-color;
  --primary-dark: #your-dark-color;
}

.custom-class {
  /* Your custom styles */
}
\`\`\`

### Custom Scripts
Create `assets/script.js` for additional functionality:

\`\`\`javascript
document.addEventListener('DOMContentLoaded', function() {
  // Your custom JavaScript
});
\`\`\`

## 📱 Generated Features

### Root Page (/)
- Displays all modules as interactive cards
- Click redirects to respective module pages
- Technologies showcase section
- Complete portfolio information

### Module Pages
- **Project Collections**: Show all child projects
- Breadcrumb navigation back to home
- Technology tags and status badges

### Navigation Flow
1. **Root** → Click "PROJECTS" → **Projects Page**
2. **Root** → Click "HTML" → **HTML Learning Page**
3. **Any Page** → Click "🏠 Home" → **Root Page**

### Card Features
- **Hover Effects**: Smooth animations and elevation
- **Status Badges**: Live/Development indicators
- **Tech Tags**: Technology stack display
- **Category Labels**: Project categorization (from optional project.categories array)
- **Click Actions**: Navigation to target pages

## 🔧 Technical Details

### Dependencies
- **chokidar**: File watching for development
- **fs-extra**: Enhanced file system operations

### Browser Support
- Modern browsers with CSS Grid support
- Mobile responsive design
- Font Awesome 7.0 integration

### Performance
- Minimal CSS and JavaScript footprint
- Optimized for fast loading
- Semantic HTML structure

## 🚀 Development Workflow

1. **Edit** `portfolio-metadata.json`
2. **Run** `npm run watch` for development
3. **Build** `npm run generate` for production
4. **Deploy** generated HTML files

### Live Development
\`\`\`bash
npm run watch
\`\`\`
This will:
- Watch for changes in portfolio-metadata.json
- Auto-regenerate all HTML files
- Monitor template and asset changes

## 📊 Generated File Structure

Each generated index.html includes:
- ✅ Proper DOCTYPE and meta tags
- ✅ Font Awesome 7.0 integration
- ✅ Responsive viewport setup
- ✅ SEO-friendly structure
- ✅ Semantic HTML5 elements
- ✅ Accessibility considerations
- ✅ Modern CSS Grid layouts
- ✅ Interactive JavaScript features

## 🎯 Next Steps

1. Customize the design by modifying `assets/style.css`
2. Add more interactivity in `assets/script.js`
3. Extend the generator for additional page types
4. Add template system for more customization
5. Integrate with build tools or CI/CD

---

Generated by **PortfolioGenerator v1.0** 🚀
