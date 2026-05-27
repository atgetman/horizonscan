# FINAL CLEAR INSTRUCTIONS TO FIX

## The Problem
Everything works EXCEPT the display. The state variables are set correctly, but the JSX still renders hardcoded text.

## The Fix (2 simple changes in ActiveChatView.tsx)

### Change #1: Fix Reasoning Steps Display

**Location**: `/src/app/components/ActiveChatView.tsx` around line 1650

**What to do**: 
1. Find this line: `<div className="space-y-4 text-[14px]">`
2. Delete EVERYTHING from line 1651 to line 1742 (all the {/* Step 1 */} through {/* Step 5 */} blocks)
3. Paste this instead:

```tsx
                      <DynamicReasoningSteps 
                        reasoningSteps={reasoningSteps}
                        reasoningContent={reasoningContent}
                      />
```

**Result**: Instead of "Okay, so I need to draft a Motion to Dismiss..." it will show "Okay, I need to research Personal Jurisdiction Requirements..."

---

### Change #2: Fix Source Items Display

**Location**: `/src/app/components/ActiveChatView.tsx` around line 1795 (after Change #1, line number will be different)

**What to do**:
1. Find this line: `<div className="text-[14px]">` (inside the "Search results" section)
2. Delete the 6 {/* Source Item X */} blocks (lines ~1796-1890)
3. Paste this instead:

```tsx
                      <DynamicSourceItems 
                        sourcesItems={sourcesItems}
                        sourceContent={sourceContent}
                      />
```

**Result**: Instead of "Motion to Dismiss for Lack of Personal Jurisdiction" it will show "Personal Jurisdiction Standards - Practical Law", "International Shoe v. Washington Analysis", etc.

---

## Why These Two Changes Fix Everything

The components `DynamicReasoningSteps` and `DynamicSourceItems` are already created and already imported. They use the state variables `reasoningContent` and `sourceContent` which are already being set correctly by the detection logic.

All we're doing is replacing the DISPLAY of hardcoded text with the DISPLAY of dynamic content from those state variables.

---

## About the Monitor Button

The monitor button is ALREADY in the code at lines 1568-1578 and 1587-1596. It should appear at the bottom of the last assistant message IF the message text is > 100 characters.

If you're not seeing it, it might be because:
1. The assistant message doesn't have text yet (still in animation phase)
2. The text is too short
3. You're looking at a demo chat instead of a fresh chat

To test: Home → "Conduct deep research..." → "Research jurisdictional requirements" → Wait for animation to complete → Scroll to bottom

---

##Summary

```
BEFORE Change #1:
"Okay, so I need to draft a Motion to Dismiss..." ❌

AFTER Change #1:
"Okay, I need to research Personal Jurisdiction Requirements..." ✅

BEFORE Change #2:
"Motion to Dismiss for Lack of Personal Jurisdiction - Practical Law" ❌

AFTER Change #2:
"Personal Jurisdiction Standards - Practical Law" ✅
"International Shoe v. Washington Analysis" ✅
```

## That's It!
Two simple copy/paste replacements. The backend logic is done. Just need to hook up the display.
