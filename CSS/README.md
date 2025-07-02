# Bewakoof Image Downloader

A Node.js script to download all images from the extracted Bewakoof.com image URLs.

## Features

- ✅ Downloads all images from the URL list
- 📁 Automatically creates an `images` folder
- 🔄 Retry mechanism for failed downloads
- ⚡ Concurrent downloads (configurable)
- 📊 Progress tracking and summary
- 🛡️ Safe filename generation
- ⏭️ Skips already downloaded files
- 🕐 Respectful download delays

## Requirements

- Node.js (version 14 or higher)
- The `bewakoof_image_urls.txt` file in the same directory

## Usage

### Method 1: Using npm
```bash
npm start
```

### Method 2: Direct execution
```bash
node script.js
```

## Configuration

You can modify these settings at the top of `script.js`:

```javascript
const txtFilePath = './bewakoof_image_urls.txt';  // Path to URL file
const imageFolder = './images';                   // Download folder
const maxConcurrentDownloads = 5;                 // Concurrent downloads
const retryAttempts = 3;                          // Retry failed downloads
const downloadDelay = 100;                        // Delay between downloads (ms)
```

## Output

- Images will be saved in the `./images/` folder
- Original filenames are preserved when possible
- Progress is shown in real-time
- Summary report shows successful/failed downloads

## File Structure After Running

```
CSS/
├── script.js
├── package.json
├── bewakoof_image_urls.txt
├── images/
│   ├── app-logo.png
│   ├── 1x1-HC-Pants-Men--1750661403.jpg
│   ├── 1x1-MAY-BANNER-Men--1--1750661402.jpg
│   └── ... (all downloaded images)
└── README.md
```

## Error Handling

- Failed downloads are retried up to 3 times
- Network timeouts are handled gracefully
- Partial downloads are cleaned up
- Detailed error reporting in the summary

## Notes

- The script respects the server by adding delays between downloads
- Already downloaded files are automatically skipped
- Invalid characters in filenames are replaced with underscores
- The script uses native Node.js modules (no external dependencies)

## Troubleshooting

1. **"No valid URLs found"**: Make sure `bewakoof_image_urls.txt` exists and contains valid URLs
2. **Network errors**: Check your internet connection and try again
3. **Permission errors**: Make sure you have write permissions in the current directory
