#!/usr/bin/env python3
import re

# Read the file
with open('./src/app/components/ActiveChatView.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

print(f"Original file length: {len(content)}")

# Pattern 1: Replace reasoning steps
pattern1 = r'<div className="space-y-4 text-\[14px\]">\s+\{/\* Step 1 - Understanding Request \*/\}[\s\S]*?\{/\* Step 5 - Building Arguments \*/\}[\s\S]*?</motion\.div>\s+\)\}\s+</div>'

replacement1 = '''<div className="space-y-4 text-[14px]">
                      <DynamicReasoningSteps 
                        reasoningSteps={reasoningSteps}
                        reasoningContent={reasoningContent}
                      />
                    </div>'''

if re.search(pattern1, content):
    content = re.sub(pattern1, replacement1, content)
    print("✅ Replaced reasoning steps")
else:
    print("❌ Could not find reasoning steps pattern")

# Pattern 2: Replace source items  
pattern2 = r'<div className="text-\[14px\]">\s+\{/\* Source Item 1 - Practical Law \*/\}[\s\S]*?\{/\* Source Item 6 - Government Legal Database \*/\}[\s\S]*?</motion\.div>\s+\)\}\s+</div>'

replacement2 = '''<div className="text-[14px]">
                      <DynamicSourceItems 
                        sourcesItems={sourcesItems}
                        sourceContent={sourceContent}
                      />
                    </div>'''

if re.search(pattern2, content):
    content = re.sub(pattern2, replacement2, content)
    print("✅ Replaced source items")
else:
    print("❌ Could not find source items pattern")

# Write the file
with open('./src/app/components/ActiveChatView.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print(f"New file length: {len(content)}")
print("\n✅ DONE!")
