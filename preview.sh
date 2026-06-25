#!/bin/sh
PORT=${PORT:-4321}
cd /Users/adamdanielbest/Documents/adamdanielbest-portfolio-design-system
exec npx --yes serve -l $PORT .
