# Chat Research Response Update - Summary

## Problem
The chat always shows the "Motion to Dismiss" hardcoded response, even when you select research prompts from the home page.

## Solution Implemented
I've created a dynamic system that detects the task type (draft vs research vs analyze) from the user's prompt and shows appropriate content.

### Files Created/Modified:

1. **`/src/app/utils/chatReasoningContent.ts`** (NEW)
   - Contains helper functions `getReasoningContent()` and `getSourceContent()`
   - Dynamically generates reasoning steps based on task type and topic
   - Includes research-specific content for topics like:
     - Personal Jurisdiction
     - GDPR/Data Privacy
     - Employment Discrimination
     - And generic research content

2. **`/src/app/components/ActiveChatView.tsx`** (MODIFIED)
   - Added imports for the new helper functions
   - Added state variables: `taskType`, `researchTopic`, `reasoningContent`, `sourceContent`
   - Updated `processChat()` to detect task type from the prompt
   - Detects "research" keywords and extracts topics

### What Still Needs to be Done:

The reasoning steps display (lines 1649-1735 in ActiveChatView.tsx) need to be updated to use the dynamic `reasoningContent` object instead of hardcoded text.

**Lines to Update:**
- Line 1657: Replace hardcoded text with `{reasoningContent.step1}`
- Line 1670: Replace with `{reasoningContent.step2Title}`
- Lines 1673-1684: Replace bullet items with:
  ```jsx
  {reasoningContent.step2Items.map((item, i) => (
    <li key={i} className="flex items-start gap-2">
      <span className="text-[#d64000] shrink-0">•</span>
      <span>{item}</span>
    </li>
  ))}
  ```
- Line 1697: Replace with `{reasoningContent.step3}`
- Line 1709: Replace with `{reasoningContent.step4Title}`
- Lines 1712-1723: Replace bullet items (same pattern as step2Items)
- Line 1736: Replace with `{reasoningContent.step5}`

### Source Items (lines 1795-1888)

Similarly, the source items need to be dynamically generated from `sourceContent.items` array.

## Testing

Once complete, when you:
1. Go to Home page
2. Click "Conduct deep research..."
3. Select "Research jurisdictional requirements"

You should see:
- **Reasoning Step 1**: "Okay, I need to research Personal Jurisdiction Requirements..."
- **Step 3**: Mentions checking Practical Law for research guides
- **Source items**: Show jurisdiction-specific sources (International Shoe, Daimler AG, etc.)
- **Artifact name**: "Personal Jurisdiction Research"  
- **Monitor button**: Will appear at the bottom with pre-filled research topic

## Current Status

✅ Detection logic implemented
✅ Helper functions created with research content
✅ State variables added  
⏳ Display logic needs to be updated to use dynamic content

The hard part (detection and content generation) is done. Just need to swap out the hardcoded strings in the JSX with the dynamic variables.
