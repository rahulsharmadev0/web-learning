// YouTube Clone - Video Rendering Script 
// This Script is Written by Ai

class YouTubeRenderer {
  constructor() {
    this.videoGrid = document.getElementById('video-grid');
    this.loadingElement = document.getElementById('loading');
    this.videosData = [];
  }

  // Initialize the app
  async init() {
    try {
      await this.loadVideosData();
      this.renderVideos();
    } catch (error) {
      console.error('Error initializing YouTube clone:', error);
      this.showError('Failed to load videos. Please try again later.');
    }
  }

  // Load videos data from JSON file
  async loadVideosData() {
    try {
      const response = await fetch('youtube_data.json');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      this.videosData = await response.json();
    } catch (error) {
      console.error('Error loading videos data:', error);
      throw error;
    }
  }

  // Format view count for display
  formatViewCount(views) {
    if (views >= 10000000) { // 10M+
      return Math.floor(views / 1000000) + ' crore';
    } else if (views >= 1000000) { // 1M+
      return (views / 1000000).toFixed(1).replace('.0', '') + 'M';
    } else if (views >= 100000) { // 100K+
      return Math.floor(views / 1000) + 'K';
    } else if (views >= 1000) { // 1K+
      return (views / 1000).toFixed(1).replace('.0', '') + 'K';
    } else {
      return views.toString();
    }
  }

  // Calculate time ago (mock function - you can implement proper date calculation)
  getTimeAgo(videoId) {
    // Mock time ago data - in real app, you'd calculate this from upload dates
    const timeAgoOptions = ['1 day ago', '3 days ago', '1 week ago', '2 weeks ago', '1 month ago', '2 months ago', '3 months ago'];
    return timeAgoOptions[Math.floor(Math.random() * timeAgoOptions.length)];
  }

  // Generate random duration for videos (mock function)
  getDuration(videoId) {
    // Mock duration data - in real app, this would come from video metadata
    const durations = ['3:45', '8:32', '12:15', '5:23', '15:42', '7:18', '10:55', '4:07', '20:13', '6:29'];
    return durations[Math.floor(Math.random() * durations.length)];
  }

  // Create video card HTML
  createVideoCard(video) {
    const isShort = video.is_short;
    const cardClass = isShort ? 'yt-video-card shorts-card' : 'yt-video-card';
    const thumbnailPath = video.thumbnail_path.startsWith('thumbnails/') ? `assets/${video.thumbnail_path}` : video.thumbnail_path;
    const channelLogoPath = video.channel_logo_path.startsWith('thumbnails/') ? `assets/${video.channel_logo_path}` : video.channel_logo_path;
    
    return `
      <div class="${cardClass}">
        <div class="thumbnail-container ${isShort ? 'shorts-thumbnail' : ''}">
          <a href="${video.url}" class="thumbnail-link" aria-hidden="true" tabindex="-1">
            <img class="thumbnail" src="${thumbnailPath}" alt="Video thumbnail" loading="lazy">
            ${isShort ? '<div class="shorts-indicator">SHORTS</div>' : `<div class="duration">${this.getDuration(video.video_id)}</div>`}
          </a>
        </div>
        
        <div class="video-details-container">
          <div class="avatar-container">
            <a href="https://www.youtube.com/@${video.channel_name.toLowerCase().replace(/\s+/g, '')}" class="channel-avatar-link" tabindex="-1">
              <img class="channel-avatar" src="${channelLogoPath}" alt="${video.channel_name}" loading="lazy">
            </a>
          </div>
          
          <div class="video-meta">
            <h3 class="video-title-container">
              <a href="${video.url}" class="video-title-link" 
                 aria-label="${video.title}"
                 title="${video.title}">
                <span class="video-title">${video.title}</span>
              </a>
            </h3>
            
            <div class="video-metadata">
              <div class="channel-info">
                <a href="https://www.youtube.com/@${video.channel_name.toLowerCase().replace(/\s+/g, '')}" class="channel-name-link">
                  <span class="channel-name">${video.channel_name}</span>
                </a>
                ${this.shouldShowVerifiedBadge(video.channel_name) ? this.getVerifiedBadge() : ''}
              </div>
              
              <div class="video-stats">
                <span class="view-count">${this.formatViewCount(video.views)} views</span>
                <span class="separator">•</span>
                <span class="upload-date">${this.getTimeAgo(video.video_id)}</span>
              </div>
            </div>
          </div>
          
          <div class="video-menu">
            <button class="menu-button" aria-label="Action menu">
              <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" fill="currentColor">
                <path d="M12 16.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zM10.5 12c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5zm0-6c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // Check if channel should show verified badge
  shouldShowVerifiedBadge(channelName) {
    const verifiedChannels = [
      'Netflix India', 'Amazon MX Player', 'MX Player', 'SET India', 
      'BB Ki Vines', 'Movieclips', 'Taarak Mehta Ka Ooltah Chashmah'
    ];
    return verifiedChannels.includes(channelName);
  }

  // Get verified badge HTML
  getVerifiedBadge() {
    return `
      <div class="verified-badge" aria-label="Verified">
        <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 24 24" width="16" fill="currentColor">
          <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zM9.8 17.3l-4.2-4.1L7 11.8l2.8 2.7L17 7.4l1.4 1.4-8.6 8.5z"></path>
        </svg>
      </div>
    `;
  }

  // Render all videos
  renderVideos() {
    if (!this.videosData || this.videosData.length === 0) {
      this.showError('No videos available');
      return;
    }

    // Remove loading indicator
    if (this.loadingElement) {
      this.loadingElement.remove();
    }

    // Clear the grid
    this.videoGrid.innerHTML = '';

    // Separate regular videos and shorts
    const regularVideos = this.videosData.filter(video => !video.is_short);
    const shorts = this.videosData.filter(video => video.is_short);

    // Render regular videos first
    regularVideos.forEach(video => {
      const videoCard = this.createVideoCard(video);
      this.videoGrid.insertAdjacentHTML('beforeend', videoCard);
    });

    // Add shorts section if there are any
    if (shorts.length > 0) {
      this.renderShortsSection(shorts);
    }

    // Add event listeners after rendering
    this.addEventListeners();
  }

  // Render shorts section
  renderShortsSection(shorts) {
    const shortsContainer = document.createElement('div');
    shortsContainer.className = 'shorts-section';
    shortsContainer.innerHTML = `
      <div class="shorts-header">
        <img src="assets/shorts.svg" alt="Shorts" class="shorts-icon">
        <h2>Shorts</h2>
      </div>
      <div class="shorts-grid">
        ${shorts.map(short => this.createVideoCard(short)).join('')}
      </div>
    `;
    this.videoGrid.appendChild(shortsContainer);
  }

  // Add event listeners
  addEventListeners() {
    // Add click handlers for video cards
    const videoCards = document.querySelectorAll('.yt-video-card');
    videoCards.forEach(card => {
      card.addEventListener('mouseenter', this.handleCardHover);
      card.addEventListener('mouseleave', this.handleCardLeave);
    });

    // Add click handlers for menu buttons
    const menuButtons = document.querySelectorAll('.menu-button');
    menuButtons.forEach(button => {
      button.addEventListener('click', this.handleMenuClick);
    });
  }

  // Handle card hover
  handleCardHover(event) {
    const card = event.currentTarget;
    card.classList.add('hovered');
  }

  // Handle card leave
  handleCardLeave(event) {
    const card = event.currentTarget;
    card.classList.remove('hovered');
  }

  // Handle menu button click
  handleMenuClick(event) {
    event.preventDefault();
    event.stopPropagation();
    // Here you could implement a dropdown menu
    console.log('Menu clicked');
  }

  // Show error message
  showError(message) {
    this.videoGrid.innerHTML = `
      <div class="error-message">
        <div class="error-icon">⚠️</div>
        <p>${message}</p>
      </div>
    `;
  }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const youtubeRenderer = new YouTubeRenderer();
  youtubeRenderer.init();
});

// Add some utility functions for better UX
function handleImageError(img) {
  img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjE4MCIgdmlld0JveD0iMCAwIDMyMCAxODAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMjAiIGhlaWdodD0iMTgwIiBmaWxsPSIjMjAyMDIwIi8+CjxwYXRoIGQ9Ik0xNDQgNzJMMTc2IDkyTDE0NCAxMTJWNzJaIiBmaWxsPSIjNDA0MDQwIi8+Cjwvc3ZnPgo=';
}

// Add error handling for images
document.addEventListener('error', (e) => {
  if (e.target.tagName === 'IMG') {
    handleImageError(e.target);
  }
}, true);
