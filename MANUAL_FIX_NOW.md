# MANUAL FIX - Do This Right Now

## Open `/src/app/components/ActiveChatView.tsx`

### Change 1: Line 1650
Find line 1650 which has:
```tsx
                    <div className="space-y-4 text-[14px]">
```

DELETE everything from line 1651 to line 1742 (all the {/* Step 1 */} through {/* Step 5 */} stuff)

INSERT these 4 lines right after line 1650:
```tsx
                      <DynamicReasoningSteps 
                        reasoningSteps={reasoningSteps}
                        reasoningContent={reasoningContent}
                      />
```

So it should look like:
```tsx
                    <div className="space-y-4 text-[14px]">
                      <DynamicReasoningSteps 
                        reasoningSteps={reasoningSteps}
                        reasoningContent={reasoningContent}
                      />
                    </div>
```

---

### Change 2: Line ~1795 (will be different after Change 1)

Find the section with 6 hardcoded source items that starts with:
```tsx
                    <div className="text-[14px]">
                      {/* Source Item 1 - Practical Law */}
```

DELETE all 6 source items (ending at line ~1890)

INSERT these 4 lines:
```tsx
                      <DynamicSourceItems 
                        sourcesItems={sourcesItems}
                        sourceContent={sourceContent}
                      />
```

---

## DONE! Save and test.

The monitor button should already be rendering - it's at the bottom of assistant messages via the ConvertToMonitorButton component that's already in the code.
