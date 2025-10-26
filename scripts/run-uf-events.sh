#!/bin/bash

# UF Gainesville Events Fetcher Script
# Fetches and displays events happening at UF Gainesville starting October 27, 2025

echo "🐊 UF Gainesville Events Fetcher"
echo "================================="
echo "📅 Target Date: October 27, 2025"
echo "📍 Location: Gainesville, FL (University of Florida)"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js to run this script."
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js found: $(node --version)"
echo ""

# Change to scripts directory
cd "$(dirname "$0")"

echo "🚀 Running UF Events Fetcher..."
echo ""

# Run the JavaScript version
node uf-events-fetcher.js

echo ""
echo "📄 Generated files:"
echo "   - uf-events.json (JSON data)"
echo "   - uf-events-report.md (Markdown report)"
echo ""

# Check if we can open the HTML display
if command -v open &> /dev/null; then
    echo "🌐 Opening web display..."
    open uf-events-display.html
elif command -v xdg-open &> /dev/null; then
    echo "🌐 Opening web display..."
    xdg-open uf-events-display.html
elif command -v start &> /dev/null; then
    echo "🌐 Opening web display..."
    start uf-events-display.html
else
    echo "🌐 To view events in a web browser, open: uf-events-display.html"
fi

echo ""
echo "✅ Script completed successfully!"
echo "📊 Check the generated files for detailed event information."
