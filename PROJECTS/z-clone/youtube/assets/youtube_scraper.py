#!/usr/bin/env python3
"""
YouTube Video Data Scraper
Downloads thumbnails, channel logos and extracts video metadata
"""

import json
import requests
import re
import os
from urllib.parse import urlparse, parse_qs
import time

class YouTubeDataScraper:
    def __init__(self, output_dir="thumbnails"):
        self.output_dir = output_dir
        self.data = []
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        })
        
        # Create directories if they don't exist
        os.makedirs(os.path.join(self.output_dir, "videos"), exist_ok=True)
        os.makedirs(os.path.join(self.output_dir, "shorts"), exist_ok=True)
        os.makedirs(os.path.join(self.output_dir, "channels"), exist_ok=True)
    
    def extract_video_id(self, url):
        """Extract video ID from YouTube URL"""
        if 'shorts/' in url:
            # For shorts: https://www.youtube.com/shorts/VIDEO_ID
            return url.split('shorts/')[-1].split('?')[0]
        else:
            # For regular videos: https://www.youtube.com/watch?v=VIDEO_ID
            parsed_url = urlparse(url)
            query_params = parse_qs(parsed_url.query)
            return query_params.get('v', [None])[0]
    
    def get_video_data(self, url):
        """Get video metadata from YouTube"""
        try:
            response = self.session.get(url)
            response.raise_for_status()
            html = response.text
            
            # Extract video title
            title_match = re.search(r'"title":"([^"]*)"', html)
            title = title_match.group(1) if title_match else "Unknown Title"
            title = title.encode().decode('unicode_escape')
            
            # Extract view count
            views_match = re.search(r'"viewCount":"(\d+)"', html)
            views = int(views_match.group(1)) if views_match else 0
            
            # Extract channel name
            channel_match = re.search(r'"author":"([^"]*)"', html)
            channel_name = channel_match.group(1) if channel_match else "Unknown Channel"
            channel_name = channel_name.encode().decode('unicode_escape')
            
            # Extract channel ID for logo
            channel_id_match = re.search(r'"channelId":"([^"]*)"', html)
            channel_id = channel_id_match.group(1) if channel_id_match else None
            
            return {
                'title': title,
                'views': views,
                'channel_name': channel_name,
                'channel_id': channel_id
            }
        except Exception as e:
            print(f"Error getting video data for {url}: {e}")
            return None
    
    def download_thumbnail(self, video_id, is_short=False):
        """Download video thumbnail"""
        try:
            # YouTube thumbnail URLs
            thumbnail_urls = [
                f"https://img.youtube.com/vi/{video_id}/maxresdefault.jpg",
                f"https://img.youtube.com/vi/{video_id}/hqdefault.jpg",
                f"https://img.youtube.com/vi/{video_id}/mqdefault.jpg"
            ]
            
            for thumbnail_url in thumbnail_urls:
                response = self.session.get(thumbnail_url)
                if response.status_code == 200 and len(response.content) > 1000:
                    folder = "shorts" if is_short else "videos"
                    filename = f"{video_id}.jpg"
                    filepath = os.path.join(self.output_dir, folder, filename)
                    
                    with open(filepath, 'wb') as f:
                        f.write(response.content)
                    
                    return f"thumbnails/{folder}/{filename}"
            
            return None
        except Exception as e:
            print(f"Error downloading thumbnail for {video_id}: {e}")
            return None
    
    def download_channel_logo(self, channel_id, channel_name):
        """Download channel logo using channel ID"""
        if not channel_id:
            return None
            
        try:
            # Try to get channel logo from YouTube API endpoints
            logo_urls = [
                f"https://yt3.ggpht.com/a/default-user=s88-c-k-c0x00ffffff-no-rj",
                f"https://yt3.googleusercontent.com/a/default-user=s88-c-k-c0x00ffffff-no-rj"
            ]
            
            # Try to find channel logo in the channel page
            channel_url = f"https://www.youtube.com/channel/{channel_id}"
            response = self.session.get(channel_url)
            
            if response.status_code == 200:
                # Look for channel avatar in the HTML
                avatar_match = re.search(r'"avatar":{"thumbnails":\[{"url":"([^"]*)"', response.text)
                if avatar_match:
                    logo_url = avatar_match.group(1)
                    logo_response = self.session.get(logo_url)
                    
                    if logo_response.status_code == 200:
                        # Clean channel name for filename
                        safe_channel_name = re.sub(r'[^\w\-_\.]', '_', channel_name)
                        filename = f"{safe_channel_name}_{channel_id}.jpg"
                        filepath = os.path.join(self.output_dir, "channels", filename)
                        
                        with open(filepath, 'wb') as f:
                            f.write(logo_response.content)
                        
                        return f"thumbnails/channels/{filename}"
            
            return None
        except Exception as e:
            print(f"Error downloading channel logo for {channel_id}: {e}")
            return None
    
    def process_url(self, url):
        """Process a single YouTube URL"""
        print(f"Processing: {url}")
        
        video_id = self.extract_video_id(url)
        if not video_id:
            print(f"Could not extract video ID from {url}")
            return
        
        is_short = 'shorts/' in url
        
        # Get video metadata
        video_data = self.get_video_data(url)
        if not video_data:
            print(f"Could not get video data for {url}")
            return
        
        # Download thumbnail
        thumbnail_path = self.download_thumbnail(video_id, is_short)
        
        # Download channel logo
        channel_logo_path = None
        if video_data['channel_id']:
            channel_logo_path = self.download_channel_logo(
                video_data['channel_id'], 
                video_data['channel_name']
            )
        
        # Create data entry
        entry = {
            'video_id': video_id,
            'url': url,
            'title': video_data['title'],
            'views': video_data['views'],
            'channel_name': video_data['channel_name'],
            'thumbnail_path': thumbnail_path,
            'channel_logo_path': channel_logo_path,
            'is_short': is_short
        }
        
        self.data.append(entry)
        
        # Add delay to be respectful to YouTube's servers
        time.sleep(1)
    
    def save_json(self, filename="youtube_data.json"):
        """Save collected data to JSON file"""
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(self.data, f, indent=2, ensure_ascii=False)
        print(f"Data saved to {filename}")

def main():
    # YouTube URLs from the user
    urls = [
        # Regular videos
        "https://www.youtube.com/watch?v=Hnvs0lwKngY",
        "https://www.youtube.com/watch?v=voN-LFwJtPc&list=RDvoN-LFwJtPc&start_radio=1&pp=oAcB",
        "https://www.youtube.com/watch?v=jrtGS5MscqA",
        "https://www.youtube.com/watch?v=DNDY75s8hus",
        "https://www.youtube.com/watch?v=XLYAz6yuJOk",
        "https://www.youtube.com/watch?v=SSjhVR6yw3M&pp=0gcJCccJAYcqIYzv",
        "https://www.youtube.com/watch?v=miZ0vI1lSZw",
        "https://www.youtube.com/watch?v=8qcQX3BJPdE",
        "https://www.youtube.com/watch?v=f37Y6BE3D-c",
        "https://www.youtube.com/watch?v=xfoq_aZD62w",
        "https://www.youtube.com/watch?v=EmsRACUM4V4&list=RDEmsRACUM4V4&start_radio=1&pp=oAcB",
        "https://www.youtube.com/watch?v=PJ3ZQk_lr9E",
        "https://www.youtube.com/watch?v=GgIbbpL7yJ0",
        # Shorts
        "https://www.youtube.com/shorts/G5FWyaoTIAA",
        "https://www.youtube.com/shorts/ggznQ4rP-I8",
        "https://www.youtube.com/shorts/186baYQq5-c",
        "https://www.youtube.com/shorts/lTevIDVBJR8"
    ]
    
    scraper = YouTubeDataScraper()
    
    print("Starting YouTube data scraping...")
    for url in urls:
        scraper.process_url(url)
    
    # Save the data
    scraper.save_json("youtube_data.json")
    
    print(f"\nCompleted! Downloaded data for {len(scraper.data)} videos.")
    print("Files saved:")
    print("- youtube_data.json (video metadata)")
    print("- thumbnails/videos/ (video thumbnails)")
    print("- thumbnails/shorts/ (shorts thumbnails)")
    print("- thumbnails/channels/ (channel logos)")

if __name__ == "__main__":
    main()
