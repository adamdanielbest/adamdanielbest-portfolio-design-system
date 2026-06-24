#!/bin/sh
echo "Starting preview server at http://localhost:4321"
echo "Open: http://localhost:4321/button-component/button.html"
echo "Press Ctrl+C to stop."
python3 -m http.server 4321
