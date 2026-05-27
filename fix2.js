const fs = require('fs');

const filePath = './src/app/components/ActiveChatView.tsx';
let content = fs.readFileSync(filePath, 'utf8');

console.log('Original file length:', content.length);

// Fix 1: Replace the entire reasoning steps block
const pattern1 = /\{\/\* Step 1 - Understanding Request \*\/\}[\s\S]*?\{\/\* Step 5 - Building Arguments \*\/\}[\s\S]*?<\/motion\.div>\s*\)\}\s*\}/;

const replacement1 = `<DynamicReasoningSteps 
                        reasoningSteps={reasoningSteps}
                        reasoningContent={reasoningContent}
                      />`;

if (pattern1.test(content)) {
  content = content.replace(pattern1, replacement1);
  console.log('✅ Replaced reasoning steps');
} else {
  console.log('❌ Could not find reasoning steps pattern');
}

// Fix 2: Replace source items
const pattern2 = /\{\/\* Source Item 1 - Practical Law \*\/\}[\s\S]*?\{\/\* Source Item 6 - Government Legal Database \*\/\}[\s\S]*?<\/motion\.div>\s*\)\}\s*\}/;

const replacement2 = `<DynamicSourceItems 
                        sourcesItems={sourcesItems}
                        sourceContent={sourceContent}
                      />`;

if (pattern2.test(content)) {
  content = content.replace(pattern2, replacement2);
  console.log('✅ Replaced source items');
} else {
  console.log('❌ Could not find source items pattern');
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('New file length:', content.length);
console.log('\n✅ DONE!');
