const fs = require('fs');
const path = require('path');

// Read the file
const filePath = path.join(__dirname, 'src', 'app', 'components', 'ActiveChatView.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Split into lines for easier manipulation
let lines = content.split('\n');

// FIX 1: Replace reasoning steps (lines ~1650-1742)
let reasoningStart = -1;
let reasoningEnd = -1;

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('space-y-4 text-[14px]') && i > 1640 && i < 1660) {
    reasoningStart = i + 1;
    // Find the matching closing div
    let depth = 0;
    for (let j = i + 1; j < Math.min(i + 100, lines.length); j++) {
      if (lines[j].includes('</div>') && lines[j].trim() === '</div>' && j > 1740 && j < 1750) {
        reasoningEnd = j;
        break;
      }
    }
    break;
  }
}

if (reasoningStart > 0 && reasoningEnd > 0) {
  const newReasoning = [
    '                      <DynamicReasoningSteps ',
    '                        reasoningSteps={reasoningSteps}',
    '                        reasoningContent={reasoningContent}',
    '                      />'
  ];
  lines.splice(reasoningStart, reasoningEnd - reasoningStart, ...newReasoning);
  console.log(`✅ Fixed reasoning steps (lines ${reasoningStart+1}-${reasoningEnd+1})`);
}

// FIX 2: Replace source items (lines ~1797-1893)
let sourcesStart = -1;
let sourcesEnd = -1;

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('<div className="text-[14px]">') && i > 1790 && i < 1810) {
    sourcesStart = i + 1;
    // Find end - look for the </div> after all Source Items
    for (let j = i + 1; j < Math.min(i + 100, lines.length); j++) {
      if (lines[j].includes('</div>') && lines[j].trim() === '</div>' && lines[j - 1].includes(')}')) {
        sourcesEnd = j;
        break;
      }
    }
    break;
  }
}

if (sourcesStart > 0 && sourcesEnd > 0) {
  const newSources = [
    '                      <DynamicSourceItems ',
    '                        sourcesItems={sourcesItems}',
    '                        sourceContent={sourceContent}',
    '                      />'
  ];
  lines.splice(sourcesStart, sourcesEnd - sourcesStart, ...newSources);
  console.log(`✅ Fixed source items (lines ${sourcesStart+1}-${sourcesEnd+1})`);
}

// Write back
fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
console.log('\n✅✅✅ DONE! File has been fixed.\n');
console.log('Now refresh your browser and test with:');
console.log('Home → "Research jurisdictional requirements"');
