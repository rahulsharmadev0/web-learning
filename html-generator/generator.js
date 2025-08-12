const fs = require('fs-extra');
const path = require('path');
const chokidar = require('chokidar');

// Configuration
const CONFIG = {
    sourceFile: '../portfolio-metadata.json',
    outputDir: '../',
    templateDir: './templates',
    stylesFile: './assets/style.css',
    scriptsFile: './assets/script.js'
};

class PortfolioGenerator {
    constructor() {
        this.portfolioData = null;
        this.loadPortfolioData();
    }

    async loadPortfolioData() {
        try {
            const data = await fs.readJson(path.join(__dirname, CONFIG.sourceFile));
            this.portfolioData = data;
            console.log('✅ Portfolio data loaded successfully');
        } catch (error) {
            console.error('❌ Error loading portfolio data:', error.message);
            process.exit(1);
        }
    }

    async generateIndex(modulePath = '/', moduleData = null) {
        const isRoot = modulePath === '/';
        const outputPath = isRoot 
            ? path.join(__dirname, CONFIG.outputDir, 'index.html')
            : path.join(__dirname, CONFIG.outputDir, modulePath.slice(1), 'index.html');

        // Determine what to display based on the path and type
        let pageTitle, pageDescription, displayModules, displayProjects;
        
        if (isRoot) {
            // Root page - show all top-level modules as cards
            pageTitle = this.portfolioData.portfolio.title;
            pageDescription = this.portfolioData.portfolio.description;
            displayModules = this.portfolioData.modules.filter(module => module.type !== 'project');
            displayProjects = [];
        } else {
            // Module-specific page
            const module = this.portfolioData.modules.find(m => m.path === modulePath);
            if (!module) {
                console.warn(`⚠️  Module not found for path: ${modulePath}`);
                return;
            }
            
            // Skip generation for project type nodes
            if (module.type === 'project') {
                console.log(`⏭️  Skipping index generation for project: ${module.title}`);
                return;
            }
            
            pageTitle = module.title;
            pageDescription = module.description;
            displayModules = [];
            
            if (module.type === 'categories') {
                // Categories page - show project collections as modules, and all projects
                displayModules = module.children || [];
                displayProjects = this.flattenProjectsFromCategories(module.children || []);
            } else if (module.type === 'projects-collection') {
                // Projects collection - show direct children as projects
                displayProjects = module.children || [];
            } else {
                displayProjects = [];
            }
        }

        const html = this.generateHTML({
            pageTitle,
            pageDescription,
            currentPath: modulePath,
            modules: displayModules,
            projects: displayProjects,
            isRoot
        });

        await fs.ensureDir(path.dirname(outputPath));
        await fs.writeFile(outputPath, html);
        console.log(`✅ Generated: ${outputPath}`);
    }

    // Helper method to flatten projects from categories
    flattenProjectsFromCategories(categories) {
        return categories.flatMap(category => 
            (category.children || []).map(project => ({
                ...project,
                category: category.title
            }))
        );
    }

    generateHTML({ pageTitle, pageDescription, currentPath, modules, projects, isRoot }) {
        const relativePath = isRoot ? '.' : '..';
        const breadcrumbs = this.generateBreadcrumbs(currentPath);
        const modulesGrid = modules.length > 0 ? this.generateModulesGrid(modules) : '';
        const projectsGrid = projects.length > 0 ? this.generateProjectsGrid(projects, currentPath) : '';
        
        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${pageTitle} | ${this.portfolioData.portfolio.author}</title>
    <meta name="description" content="${pageDescription}">
    <meta name="author" content="${this.portfolioData.portfolio.author}">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.0/css/all.min.css" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="stylesheet" href="${relativePath}/style.css">
</head>
<body>
    <div class="container">
        <!-- Breadcrumb Navigation -->
        ${breadcrumbs}
        
        <!-- Header -->
        <header class="header">
            <h1 class="page-title">${pageTitle}</h1>
            <p class="page-subtitle">${pageDescription}</p>
        </header>
        
        <!-- Main Content -->
        <main class="main-content">
            <!-- Technologies Section -->
            ${isRoot ? this.generateTechnologiesSection() : ''}
            
            ${modulesGrid}
            ${projectsGrid}
        </main>
        
        <!-- Footer -->
        ${this.generateFooter()}
    </div>
    
    <!-- Generated by PortfolioGenerator v1.0 -->
    <script src="${relativePath}/script.js"></script>
</body>
</html>`;
    }

    generateBreadcrumbs(currentPath) {
        if (currentPath === '/') return '';
        
        const pathParts = currentPath.split('/').filter(Boolean);
        let breadcrumbPath = '';
        
        const breadcrumbs = [
            '<nav class="breadcrumb">',
            '<a href="../index.html" class="breadcrumb-item">🏠 Home</a>'
        ];

        pathParts.forEach((part, index) => {
            breadcrumbPath += `/${part}`;
            const module = this.portfolioData.modules.find(m => m.path === `${breadcrumbPath}/`);
            const title = module ? module.title : part.toUpperCase();
            
            if (index === pathParts.length - 1) {
                breadcrumbs.push(`<span class="breadcrumb-item current">${title}</span>`);
            } else {
                breadcrumbs.push(`<a href="../index.html" class="breadcrumb-item">${title}</a>`);
            }
        });

        breadcrumbs.push('</nav>');
        return breadcrumbs.join('\n            ');
    }

    generateModulesGrid(modules) {
        const cards = modules.map(module => {
            const iconDisplay = module.icon ? 
                (module.icon.startsWith('fa-') ? `<i class="${module.icon}"></i>` : module.icon) :
                '📁'; // Default icon for collections without specific icon
                
            // Count children based on type
            let childrenCount = 0;
            let childrenLabel = 'items';
            
            if (module.type === 'projects-collection' && module.children) {
                childrenCount = module.children.length;
                childrenLabel = 'projects';
            } else if (module.type === 'categories' && module.children) {
                childrenCount = module.children.flatMap(cat => cat.children || []).length;
                childrenLabel = 'projects';
            }
            
            const moduleHref = module.path ? 
                (module.path.slice(1).replace(/\/$/, '') + '/index.html') :
                '#';
                
            return `
                <div class="card module-card" onclick="location.href='${moduleHref}'">
                    <div class="card-icon">${iconDisplay}</div>
                    <div class="card-content">
                        <h3 class="card-title">${module.title}</h3>
                        <p class="card-description">${module.description}</p>
                        <div class="card-meta">
                            <span class="card-type">${module.type.replace('-', ' ')}</span>
                            ${childrenCount > 0 ? `<span class="card-count">${childrenCount} ${childrenLabel}</span>` : ''}
                        </div>
                    </div>
                    <div class="card-arrow">
                        <i class="fas fa-arrow-right"></i>
                    </div>
                </div>`;
        }).join('\n            ');

        const sectionTitle = modules.length > 0 && modules[0].type === 'projects-collection' ? 
            '📂 Project Collections' : '🚀 Learning Modules';

        return `
            <section class="section">
                <h2 class="section-title">${sectionTitle}</h2>
                <div class="grid modules-grid">
                    ${cards}
                </div>
            </section>`;
    }

    generateProjectsGrid(projects, currentPath) {
        const cards = projects.map(project => {
            let projectPath = project.path || project.file || '';
            
            // Handle different project path formats
            if (project.file && !project.path) {
                // For learning modules with individual files
                projectPath = project.file;
            } else if (project.path && project.path.startsWith('/')) {
                // For absolute paths, make them relative
                projectPath = project.path.replace(currentPath, '').replace(/^\//, '');
            }

            const techTags = project.tech ? 
                project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('') : '';
            
            const statusBadge = project.status === 'live' ? 
                '<span class="status-badge live">🟢 Live</span>' : '';
            
            const categoryBadge = project.category ? 
                `<span class="category-badge">${project.category}</span>` : '';

            return `
                <div class="card project-card" onclick="location.href='${projectPath}'">
                    <div class="card-content">
                        <div class="card-header">
                            <h3 class="card-title">${project.title}</h3>
                            <div class="card-badges">
                                ${statusBadge}
                                ${categoryBadge}
                            </div>
                        </div>
                        <p class="card-description">${project.description}</p>
                        ${techTags ? `<div class="tech-tags">${techTags}</div>` : ''}
                    </div>
                    <div class="card-arrow">
                        <i class="fas fa-external-link-alt"></i>
                    </div>
                </div>`;
        }).join('\n            ');

        const sectionTitle = currentPath === '/PROJECTS/' ? '🛠️ All Projects' : '📚 Examples & Projects';

        return `
            <section class="section">
                <h2 class="section-title">${sectionTitle}</h2>
                <div class="grid projects-grid">
                    ${cards}
                </div>
            </section>`;
    }

    generateTechnologiesSection() {
        const techTags = this.portfolioData.technologies
            .map(tech => `<span class="tech-tag featured">${tech}</span>`)
            .join('\n                    ');

        return `
                <div class="tech-showcase">
                    ${techTags}
                </div>`;
    }

    generateFooter() {
        const socialLinks = this.portfolioData.portfolio.social
            .map(social => `
                <a href="${social.url}" target="_blank" rel="noopener noreferrer" class="social-link">
                    <i class="${social.icon}"></i>
                    <span>${social.label}</span>
                </a>`)
            .join('\n                ');

        return `
        <footer class="site-footer">
            <div class="footer-content">
                <div class="footer-info">
                    <h3 class="footer-brand">${this.portfolioData.portfolio.title}</h3>
                    <p class="footer-description">${this.portfolioData.portfolio.description}</p>
                    <p class="footer-author">Built by <strong>${this.portfolioData.portfolio.author}</strong></p>
                    <p class="footer-updated">Last updated: ${this.portfolioData.portfolio.lastUpdated}</p>
                </div>
                <div class="footer-links">
                    <h4>Connect</h4>
                    <div class="social-links">
                        ${socialLinks}
                    </div>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2025 ${this.portfolioData.portfolio.author}. All rights reserved.</p>
                <a href="${this.portfolioData.portfolio.link}" target="_blank" rel="noopener noreferrer">Portfolio →</a>
            </div>
        </footer>`;
    }

    async generateAll() {
        console.log('🚀 Starting portfolio generation...');
        
        // Copy assets
        await this.copyAssets();
        
        // Generate root index
        await this.generateIndex('/');
        
        // Generate module-specific indexes only for non-project types
        for (const module of this.portfolioData.modules) {
            if (module.type !== 'project') {
                await this.generateIndex(module.path, module);
            }
        }
        
        console.log('✅ All files generated successfully!');
    }

    async copyAssets() {
        const assetsDir = path.join(__dirname, 'assets');
        const outputDir = path.join(__dirname, CONFIG.outputDir);
        
        // Ensure assets directory exists
        await fs.ensureDir(assetsDir);
        
        // Copy style.css if it exists, otherwise create default
        const stylePath = path.join(assetsDir, 'style.css');
        const outputStylePath = path.join(outputDir, 'style.css');
        
        if (await fs.pathExists(stylePath)) {
            await fs.copy(stylePath, outputStylePath);
        } else {
            await fs.writeFile(outputStylePath, this.getDefaultCSS());
        }
        
        // Copy script.js if it exists, otherwise create default
        const scriptPath = path.join(assetsDir, 'script.js');
        const outputScriptPath = path.join(outputDir, 'script.js');
        
        if (await fs.pathExists(scriptPath)) {
            await fs.copy(scriptPath, outputScriptPath);
        } else {
            await fs.writeFile(outputScriptPath, this.getDefaultJS());
        }
        
        console.log('✅ Assets copied/created successfully');
    }

    async clean() {
        const patterns = [
            path.join(__dirname, CONFIG.outputDir, 'index.html'),
            path.join(__dirname, CONFIG.outputDir, 'style.css'),
            path.join(__dirname, CONFIG.outputDir, 'script.js')
        ];
        
        // Clean module index files
        for (const module of this.portfolioData.modules) {
            patterns.push(path.join(__dirname, CONFIG.outputDir, module.path.slice(1), 'index.html'));
        }
        
        for (const pattern of patterns) {
            if (await fs.pathExists(pattern)) {
                await fs.remove(pattern);
                console.log(`🗑️  Removed: ${pattern}`);
            }
        }
        
        console.log('✅ Cleanup completed');
    }

    async watch() {
        console.log('👀 Watching for changes...');
        
        const watcher = chokidar.watch([
            path.join(__dirname, CONFIG.sourceFile),
            path.join(__dirname, 'templates/**/*'),
            path.join(__dirname, 'assets/**/*')
        ]);
        
        watcher.on('change', async (filePath) => {
            console.log(`📝 File changed: ${filePath}`);
            await this.loadPortfolioData();
            await this.generateAll();
        });
        
        // Generate initial files
        await this.generateAll();
    }

    getDefaultCSS() {
        return `/* Portfolio Generator Default Styles */
:root {
    --primary-color: #3b82f6;
    --primary-dark: #1d4ed8;
    --secondary-color: #64748b;
    --background: #f8fafc;
    --surface: #ffffff;
    --border: #e2e8f0;
    --text-primary: #1e293b;
    --text-secondary: #64748b;
    --success: #10b981;
    --warning: #f59e0b;
    --radius: 12px;
    --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    --shadow-lg: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    line-height: 1.6;
    color: var(--text-primary);
    background: var(--background);
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
}

/* Header */
.header {
    text-align: center;
    // margin-bottom: 3rem;
}

.page-title {
    font-size: 3rem;
    font-weight: 800;
    background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.page-subtitle {
    font-size: 1.25rem;
    color: var(--text-secondary);
    max-width: 600px;
    margin: 0 auto;
}

/* Breadcrumbs */
.breadcrumb {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 2rem;
    padding: 1rem;
    background: var(--surface);
    border-radius: var(--radius);
    box-shadow: var(--shadow);
}

.breadcrumb-item {
    color: var(--text-secondary);
    text-decoration: none;
    transition: color 0.2s;
}

.breadcrumb-item:hover {
    color: var(--primary-color);
}

.breadcrumb-item.current {
    color: var(--text-primary);
    font-weight: 600;
}

.breadcrumb-item:not(:last-child)::after {
    content: '/';
    margin-left: 0.5rem;
    color: var(--border);
}

/* Sections */
.section {
    margin: 3rem 0;
}

.section-title {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    color: var(--text-primary);
}

/* Grid */
.grid {
    display: grid;
    gap: 1.5rem;
}

.modules-grid {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

.projects-grid {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
}

/* Cards */
.card {
    background: var(--surface);
    border-radius: var(--radius);
    padding: 1.5rem;
    box-shadow: var(--shadow);
    transition: all 0.3s ease;
    cursor: pointer;
    border: 1px solid var(--border);
}

.card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
    border-color: var(--primary-color);
}

.module-card {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
}

.card-icon {
    font-size: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60px;
    height: 60px;
    background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
    color: white;
    border-radius: var(--radius);
    flex-shrink: 0;
}

.card-content {
    flex: 1;
}

.tech-showcase{
margin: 12px 0;
}

.card-title {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: var(--text-primary);
}

.card-description {
    color: var(--text-secondary);
    margin-bottom: 1rem;
    line-height: 1.5;
}

.card-meta {
    display: flex;
    gap: 1rem;
    align-items: center;
}

.card-type, .card-count {
    font-size: 0.875rem;
    color: var(--text-secondary);
    text-transform: capitalize;
}

.card-arrow {
    color: var(--primary-color);
    font-size: 1.25rem;
    opacity: 0.7;
    transition: opacity 0.3s;
}

.card:hover .card-arrow {
    opacity: 1;
}

/* Project Cards */
.project-card .card-content {
    width: 100%;
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 0.5rem;
}

.card-badges {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
}

.status-badge {
    font-size: 0.75rem;
    padding: 0.25rem 0.5rem;
    border-radius: 6px;
    font-weight: 500;
}

.status-badge.live {
    background: #dcfce7;
    color: #166534;
}

.category-badge {
    font-size: 0.75rem;
    padding: 0.25rem 0.5rem;
    background: var(--background);
    color: var(--text-secondary);
    border-radius: 6px;
}

/* Tech Tags */
.tech-tags {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    margin-top: 1rem;
}

.tech-tag {
    font-size: 0.75rem;
    padding: 0.25rem 0.5rem;
    background: var(--primary-color);
    color: white;
    border-radius: 6px;
    font-weight: 500;
}

.tech-tag.featured {
    background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
    font-size: 0.875rem;
    padding: 0.5rem 1rem;
}

.tech-showcase {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: center;
}

/* Footer */
.site-footer {
    background: var(--surface);
    border-radius: var(--radius);
    padding: 2rem;
    margin-top: 4rem;
    box-shadow: var(--shadow);
}

.footer-content {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 2rem;
    margin-bottom: 2rem;
}

.footer-brand {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    color: var(--primary-color);
}

.footer-description {
    color: var(--text-secondary);
    margin-bottom: 1rem;
}

.footer-author, .footer-updated {
    font-size: 0.875rem;
    color: var(--text-secondary);
    margin-bottom: 0.25rem;
}

.footer-links h4 {
    margin-bottom: 1rem;
    color: var(--text-primary);
}

.social-links {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.social-link {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--text-secondary);
    text-decoration: none;
    transition: color 0.2s;
}

.social-link:hover {
    color: var(--primary-color);
}

.footer-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 1rem;
    border-top: 1px solid var(--border);
    font-size: 0.875rem;
    color: var(--text-secondary);
}

.footer-bottom a {
    color: var(--primary-color);
    text-decoration: none;
    font-weight: 500;
}

/* Responsive */
@media (max-width: 768px) {
    .container {
        padding: 1rem;
    }
    
    .page-title {
        font-size: 2rem;
    }
    
    .module-card {
        flex-direction: column;
        text-align: center;
    }
    
    .card-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
    }
    
    .footer-content {
        grid-template-columns: 1fr;
    }
    
    .footer-bottom {
        flex-direction: column;
        gap: 1rem;
    }
    
    .social-links {
        flex-direction: row;
        flex-wrap: wrap;
    }
}`;
    }

    getDefaultJS() {
        return `// Portfolio Generator Default Scripts
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling to all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add loading animation to cards
    const cards = document.querySelectorAll('.card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // Add click analytics (optional)
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', function() {
            const title = this.querySelector('.card-title')?.textContent || 'Unknown';
            console.log('Card clicked:', title);
            // Add your analytics code here
        });
    });
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close any open modals or return to previous page
            if (history.length > 1) {
                history.back();
            }
        }
    });
    
    console.log('Portfolio scripts loaded successfully');
});`;
    }
}

// CLI Interface
async function main() {
    const args = process.argv.slice(2);
    const generator = new PortfolioGenerator();
    
    try {
        if (args.includes('--watch')) {
            await generator.watch();
        } else if (args.includes('--clean')) {
            await generator.clean();
        } else {
            await generator.generateAll();
        }
    } catch (error) {
        console.error('❌ Generation failed:', error.message);
        process.exit(1);
    }
}

// Run if called directly
if (require.main === module) {
    main();
}

module.exports = PortfolioGenerator;
