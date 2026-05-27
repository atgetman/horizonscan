# Step-by-Step Patch Application Instructions

## Prerequisites ✅ (Already Done)
- ✅ `/src/app/utils/chatReasoningContent.ts` created
- ✅ Imports added to ActiveChatView.tsx
- ✅ State variables added
- ✅ Detection logic implemented in processChat()

## Patch 1: Update Reasoning Steps

### Location
File: `/src/app/components/ActiveChatView.tsx`
Lines: 1656-1737

### Find This Code:
```tsx
<p className="text-[#404040] leading-relaxed">
  Okay, so I need to draft a Motion to Dismiss based on lack of personal jurisdiction. Let me think through this step by step.
</p>
```

### Replace With:
```tsx
<p className="text-[#404040] leading-relaxed">
  {reasoningContent.step1}
</p>
```

---

### Find This Code:
```tsx
<p className="text-[#404040] leading-relaxed mb-2">
  First, I'll review the project files to get a clear picture of the case. I'm looking for:
</p>
<ul className="text-[#404040] leading-relaxed space-y-1 pl-4">
  <li className="flex items-start gap-2">
    <span className="text-[#d64000] shrink-0">•</span>
    <span>What the complaint alleges about the defendant's contacts with the forum</span>
  </li>
  <li className="flex items-start gap-2">
    <span className="text-[#d64000] shrink-0">•</span>
    <span>Any precedents or similar cases we've dealt with before</span>
  </li>
  <li className="flex items-start gap-2">
    <span className="text-[#d64000] shrink-0">•</span>
    <span>Specific facts I can use to challenge jurisdiction</span>
  </li>
</ul>
```

### Replace With:
```tsx
<p className="text-[#404040] leading-relaxed mb-2">
  {reasoningContent.step2Title}
</p>
<ul className="text-[#404040] leading-relaxed space-y-1 pl-4">
  {reasoningContent.step2Items.map((item, i) => (
    <li key={i} className="flex items-start gap-2">
      <span className="text-[#d64000] shrink-0">•</span>
      <span>{item}</span>
    </li>
  ))}
</ul>
```

---

### Find This Code:
```tsx
<p className="text-[#404040] leading-relaxed">
  I should check Practical Law for motion templates and make sure I'm following the right procedural format. Don't want to miss any technical requirements that could get this kicked back.
</p>
```

### Replace With:
```tsx
<p className="text-[#404040] leading-relaxed">
  {reasoningContent.step3}
</p>
```

---

### Find This Code:
```tsx
<p className="text-[#404040] leading-relaxed mb-2">
  Now I'll search Westlaw for the strongest authorities on personal jurisdiction. I need:
</p>
<ul className="text-[#404040] leading-relaxed space-y-1 pl-4">
  <li className="flex items-start gap-2">
    <span className="text-[#d64000] shrink-0">•</span>
    <span>Recent cases with similar fact patterns</span>
  </li>
  <li className="flex items-start gap-2">
    <span className="text-[#d64000] shrink-0">•</span>
    <span>Circuit-specific precedents that favor our position</span>
  </li>
  <li className="flex items-start gap-2">
    <span className="text-[#d64000] shrink-0">•</span>
    <span>Any Supreme Court decisions that support dismissal</span>
  </li>
</ul>
```

### Replace With:
```tsx
<p className="text-[#404040] leading-relaxed mb-2">
  {reasoningContent.step4Title}
</p>
<ul className="text-[#404040] leading-relaxed space-y-1 pl-4">
  {reasoningContent.step4Items.map((item, i) => (
    <li key={i} className="flex items-start gap-2">
      <span className="text-[#d64000] shrink-0">•</span>
      <span>{item}</span>
    </li>
  ))}
</ul>
```

---

### Find This Code:
```tsx
<p className="text-[#404040] leading-relaxed">
  Finally, I'll pull this together into a compelling argument. I need to select the most persuasive authorities, distinguish any cases that might hurt our position, and craft a narrative showing why the court clearly lacks jurisdiction over the defendant.
</p>
```

### Replace With:
```tsx
<p className="text-[#404040] leading-relaxed">
  {reasoningContent.step5}
</p>
```

---

## Patch 2: Update Source Items

### Location
File: `/src/app/components/ActiveChatView.tsx`
Lines: 1795-1891

### Find This ENTIRE Block:
```tsx
<div className="text-[14px]">
  {/* Source Item 1 - Practical Law */}
  {sourcesItems >= 1 && (
    <motion.div ...>
      <BookOpen ... />
      <p ...>Motion to Dismiss for Lack of Personal Jurisdiction - Practical Law</p>
      <span ...>practicallaw.com</span>
    </motion.div>
  )}

  {/* Source Item 2 - Westlaw */}
  {sourcesItems >= 2 && (
    ... similar structure ...
  )}

  {/* ... Source Items 3-6 ... */}
</div>
```

### Replace ENTIRE Block With:
```tsx
<div className="text-[14px]">
  {/* Dynamic Source Items */}
  {sourceContent.items.map((source, index) => (
    sourcesItems >= (index + 1) && (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center gap-2 py-1.5 px-2 -mx-2 rounded hover:bg-[#f5f5f5] cursor-pointer transition-colors"
      >
        {source.icon === 'BookOpen' && <BookOpen className="size-4 text-[#8a8a8a] shrink-0" />}
        {source.icon === 'Scale' && <Scale className="size-4 text-[#8a8a8a] shrink-0" />}
        {source.icon === 'FileCheck' && <FileCheck className="size-4 text-[#8a8a8a] shrink-0" />}
        <p className="text-[#212223] leading-relaxed flex-1 min-w-0">
          {source.title}
        </p>
        <span className="text-[#8a8a8a] text-[13px] shrink-0">{source.domain}</span>
      </motion.div>
    )
  ))}
</div>
```

---

## Done! 🎉

After applying both patches:

1. Save the file
2. Go to Home page
3. Click "Conduct deep research..."
4. Select any research prompt
5. See the magic! ✨

The chat will now show research-appropriate content with:
- ✅ Research-focused reasoning
- ✅ Topic-specific sources
- ✅ Research memo artifact
- ✅ Monitor button with research content
