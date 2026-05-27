# Before & After Comparison

## BEFORE (Current - Motion to Dismiss hardcoded)

When you select **"Research jurisdictional requirements"** you see:

```
💭 Reasoning
   
   Okay, so I need to draft a Motion to Dismiss based on 
   lack of personal jurisdiction. Let me think through this step by step.

   First, I'll review the project files to get a clear picture of the case. 
   I'm looking for:
   • What the complaint alleges about the defendant's contacts with the forum
   • Any precedents or similar cases we've dealt with before
   • Specific facts I can use to challenge jurisdiction

   I should check Practical Law for motion templates and make sure I'm 
   following the right procedural format...

   Now I'll search Westlaw for the strongest authorities on personal 
   jurisdiction. I need:
   • Recent cases with similar fact patterns
   • Circuit-specific precedents that favor our position
   • Any Supreme Court decisions that support dismissal

   Finally, I'll pull this together into a compelling argument...
```

```
🔍 Search results

   📖 Motion to Dismiss for Lack of Personal Jurisdiction - Practical Law
   ⚖️ Personal Jurisdiction Standards and Requirements
   📖 Federal Civil Procedure: Jurisdiction Challenges  
   📄 Federal Rules of Civil Procedure - Rule 12(b)(2)
   ⚖️ Recent Case Law: Minimum Contacts Analysis
   📄 Supreme Court Decisions on Personal Jurisdiction
```

```
📄 Motion
   Motion to Dismiss - Personal Jurisdiction
```

**Problem**: This is confusing! The user asked for RESEARCH but the AI is talking about DRAFTING a motion.

---

## AFTER (With dynamic content)

When you select **"Research jurisdictional requirements"** you see:

```
💭 Reasoning
   
   Okay, I need to research Personal Jurisdiction Requirements. 
   Let me think through this systematically to find the most relevant 
   authorities and analysis.

   First, I'll identify the key legal questions and framework. 
   I'm looking for:
   • The controlling legal standards and tests that courts apply
   • Any recent developments or changes in the law
   • Jurisdictional variations that might affect the analysis

   I should check Practical Law for research guides and make sure I 
   understand the current state of the law. This will help me structure 
   my research strategy efficiently.

   Now I'll search Westlaw and other legal databases for the most 
   authoritative sources. I need:
   • Supreme Court and circuit court decisions establishing the framework
   • Recent cases applying the law to similar fact patterns
   • Law review articles and secondary sources for deeper analysis

   Finally, I'll synthesize this into a comprehensive analysis. I need to 
   organize the authorities by issue, identify any splits in authority, 
   and provide clear guidance on how the law applies to our situation.
```

```
🔍 Search results

   📖 Personal Jurisdiction Standards - Practical Law
   ⚖️ International Shoe v. Washington Analysis
   📖 Minimum Contacts Framework - Research Guide
   ⚖️ Daimler AG v. Bauman (Supreme Court)
   📄 Federal Rules of Civil Procedure - Rule 12(b)(2)
   ⚖️ Recent Circuit Decisions on Personal Jurisdiction
```

```
📄 Research memo
   Personal Jurisdiction Research
```

**Result**: Perfect! The AI is clearly doing RESEARCH, using research-appropriate language, citing foundational cases, and producing a research memo (not a motion).

---

## Key Differences

| Element | BEFORE | AFTER |
|---------|--------|-------|
| **Task framing** | "draft a Motion to Dismiss" | "research Personal Jurisdiction Requirements" |
| **Approach** | "review project files", "get facts" | "identify key legal questions", "find authoritative sources" |
| **Practical Law** | "motion templates", "procedural format" | "research guides", "understand current state of law" |
| **Westlaw search** | "strongest authorities for our position" | "most authoritative sources establishing framework" |
| **Sources** | Motion-focused | Research-focused (International Shoe, Daimler AG) |
| **Output type** | Motion | Research memo |
| **Artifact name** | Motion to Dismiss | Personal Jurisdiction Research |

---

## For GDPR Research Prompt

**After implementation**, selecting **"Research GDPR compliance for US companies"** will show:

```
💭 Reasoning
   
   Okay, I need to research GDPR Compliance Requirements. Let me think 
   through this systematically to find the most relevant authorities 
   and analysis.

   ...
```

```
🔍 Search results

   📖 GDPR Compliance Overview - Practical Law
   📄 General Data Protection Regulation (Official Text)
   ⚖️ Schrems II Decision Analysis  
   📖 Data Subject Rights Guide
   📄 EDPB Guidelines and Recommendations
   ⚖️ Cross-Border Data Transfer Requirements
```

```
📄 Research memo
   GDPR Compliance Research
```

---

## The "Monitor this topic" Button

**BEFORE**: 
```
🔔 Monitor this topic
   Topic: "Research personal jurisdiction requirements..." (first 100 chars of prompt)
   Criteria: "Okay, so I need to draft a Motion to Dismiss..." (❌ wrong content)
```

**AFTER**:
```
🔔 Monitor this topic  
   Topic: "Research personal jurisdiction requirements..." (first 100 chars of prompt)
   Criteria: "Okay, I need to research Personal Jurisdiction Requirements..." (✅ correct content)
```

The monitor button will now be pre-filled with the appropriate research content, making it actually useful for setting up legal research monitoring!
