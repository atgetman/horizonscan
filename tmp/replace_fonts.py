#!/usr/bin/env python3
import sys

# Read the file
with open('../src/app/pages/Knowledge.tsx', 'r') as f:
    content = f.read()

# Replace all instances
content = content.replace("font-['Source_Sans_3']", "font-['Source_Sans_Pro']")

# Write back
with open('../src/app/pages/Knowledge.tsx', 'w') as f:
    f.write(content)

print("Replacement complete!")
