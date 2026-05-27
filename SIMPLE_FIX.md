# Simple Fix - Just Replace 2 Sections

## You're 99% there! Everything is working EXCEPT the display.

All the logic is in place:
- ✅ State variables exist (line 518-519)
- ✅ Detection logic works (line 662-663)  
- ✅ Helper functions are imported
- ✅ New components are created

## Just replace these 2 blocks in ActiveChatView.tsx:

### Fix 1: Line ~1650 - Replace the reasoning steps content

**FIND THIS** (around line 1650):
```tsx
<div className="space-y-4 text-[14px]">
  {/* Step 1 - Understanding Request */}
  {reasoningSteps >= 1 && (
    ... lots of hardcoded motion to dismiss text ...
  )}
  ... Steps 2-5 with hardcoded text ...
</div>
```

**REPLACE THE ENTIRE `<div className="space-y-4 text-[14px]">` CONTENTS WITH**:
```tsx
<div className="space-y-4 text-[14px]">
  <DynamicReasoningSteps 
    reasoningSteps={reasoningSteps}
    reasoningContent={reasoningContent}
  />
</div>
```

That's it! Just delete all 5 steps (lines 1651-1742) and replace with those 4 lines.

---

### Fix 2: Line ~1795 - Replace the source items

**FIND THIS** (around line 1795):
```tsx
<div className="text-[14px]">
  {/* Source Item 1 - Practical Law */}
  {sourcesItems >= 1 && (
    ... Motion to Dismiss source ...
  )}
  {/* Source Item 2 - Westlaw */}
  ... 4 more hardcoded sources ...
</div>
```

**REPLACE THE ENTIRE `<div className="text-[14px]">` CONTENTS WITH**:
```tsx
<div className="text-[14px]">
  <DynamicSourceItems 
    sourcesItems={sourcesItems}
    sourceContent={sourceContent}
  />
</div>
```

Delete all 6 source items (lines 1796-1890) and replace with those 4 lines.

---

## That's literally it!

Two simple replacements:
1. Replace hardcoded reasoning steps with `<DynamicReasoningSteps ... />`
2. Replace hardcoded sources with `<DynamicSourceItems ... />`

Both components are already created and imported. The state is already being set. Just swap out the display!

## Test:
1. Home → "Conduct deep research..." → "Research jurisdictional requirements"
2. You'll see: "Okay, I need to research Personal Jurisdiction Requirements..." ✨
