#!/bin/bash

# Portfolio Generator Script
echo "🚀 Portfolio HTML Generator"
echo "=========================="

# Change to the html-generator directory
cd "$(dirname "$0")/html-generator"

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Run the generator based on the argument
case "$1" in
    "watch")
        echo "👀 Starting watch mode..."
        npm run watch
        ;;
    "clean")
        echo "🗑️  Cleaning generated files..."
        npm run clean
        ;;
    *)
        echo "📝 Generating portfolio files..."
        npm run generate
        echo ""
        echo "✅ Portfolio generated successfully!"
        echo "📂 Open index.html in your browser to view the portfolio"
        ;;
esac
