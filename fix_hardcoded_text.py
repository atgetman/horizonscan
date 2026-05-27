#!/usr/bin/env python3
"""
Simple script to fix the hardcoded text in ActiveChatView.tsx
Run this with: python3 fix_hardcoded_text.py
"""

import re

# Read the file
with open('src/app/components/ActiveChatView.tsx', 'r') as f:
    content = f.read()

# Fix 1: Replace reasoning steps section (lines ~1650-1742)
old_reasoning = r'''                    <div className="space-y-4 text-\[14px\]">
                      \{/\* Step 1 - Understanding Request \*/\}
                      \{reasoningSteps >= 1 && \(
                        <motion\.div
                          initial=\{\{ opacity: 0, y: 10 \}\}
                          animate=\{\{ opacity: 1, y: 0 \}\}
                          transition=\{\{ duration: 0\.4 \}\}
                        >
                          <p className="text-\[#404040\] leading-relaxed">
                            Okay, so I need to draft a Motion to Dismiss.*?
                          </p>
                        </motion\.div>
                      \)\}

                      \{/\* Step 2.*?\)\}

                      \{/\* Step 3.*?\)\}

                      \{/\* Step 4.*?\)\}

                      \{/\* Step 5.*?\)\}
                    </div>'''

new_reasoning = '''                    <div className="space-y-4 text-[14px]">
                      <DynamicReasoningSteps 
                        reasoningSteps={reasoningSteps}
                        reasoningContent={reasoningContent}
                      />
                    </div>'''

#content = re.sub(old_reasoning, new_reasoning, content, flags=re.DOTALL)

# Simpler approach - find and replace by line markers
# Find line 1650 marker
lines = content.split('\n')

# Find the reasoning section
for i, line in enumerate(lines):
    if 'space-y-4 text-[14px]' in line and i > 1640 and i < 1660:
        print(f"Found reasoning div at line {i+1}")
        # Find the closing </div> for this section (before line 1744)
        for j in range(i+1, min(i+100, len(lines))):
            if lines[j].strip() == '</div>' and j < 1750:
                print(f"Found reasoning closing div at line {j+1}")
                # Replace everything between i+1 and j
                lines[i+1:j] = ['                      <DynamicReasoningSteps ', 
                                '                        reasoningSteps={reasoningSteps}',
                                '                        reasoningContent={reasoningContent}',
                                '                      />']
                print("Replaced reasoning steps!")
                break
        break

# Find and replace sources section
for i, line in enumerate(lines):
    if '<div className="text-[14px]">' in line and i > 1790 and i < 1810:
        print(f"Found sources div at line {i+1}")
        # Find the closing </div> for sources section
        for j in range(i+1, min(i+100, len(lines))):
            if lines[j].strip() == '</div>' and 'Source Item 6' in '\n'.join(lines[i:j]):
                print(f"Found sources closing div at line {j+1}")
                # Replace everything between i+1 and j
                lines[i+1:j] = ['                      <DynamicSourceItems ', 
                                '                        sourcesItems={sourcesItems}',
                                '                        sourceContent={sourceContent}',
                                '                      />']
                print("Replaced source items!")
                break
        break

# Write back
content = '\n'.join(lines)
with open('src/app/components/ActiveChatView.tsx', 'w') as f:
    f.write(content)

print("\n✅ Done! File has been fixed.")
print("Now test by going to Home → Research jurisdictional requirements")
