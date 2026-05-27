// Quick JavaScript fix to apply to ActiveChatView.tsx
// This shows EXACTLY what text to find and replace

const fixes = [
  {
    // Fix 1: Replace line 1650 content
    find: `                    <div className="space-y-4 text-[14px]">
                      {/* Step 1 - Understanding Request */}
                      {reasoningSteps >= 1 && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4 }}
                        >
                          <p className="text-[#404040] leading-relaxed">
                            Okay, so I need to draft a Motion to Dismiss based on lack of personal jurisdiction. Let me think through this step by step.
                          </p>
                        </motion.div>
                      )}

                      {/* Step 2 - Reviewing Files */}
                      {reasoningSteps >= 2 && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4 }}
                        >
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
                        </motion.div>
                      )}

                      {/* Step 3 - Checking Practical Law */}
                      {reasoningSteps >= 3 && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4 }}
                        >
                          <p className="text-[#404040] leading-relaxed">
                            I should check Practical Law for motion templates and make sure I'm following the right procedural format. Don't want to miss any technical requirements that could get this kicked back.
                          </p>
                        </motion.div>
                      )}

                      {/* Step 4 - Searching Westlaw */}
                      {reasoningSteps >= 4 && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4 }}
                        >
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
                        </motion.div>
                      )}

                      {/* Step 5 - Building Arguments */}
                      {reasoningSteps >= 5 && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4 }}
                        >
                          <p className="text-[#404040] leading-relaxed">
                            Finally, I'll pull this together into a compelling argument. I need to select the most persuasive authorities, distinguish any cases that might hurt our position, and craft a narrative showing why the court clearly lacks jurisdiction over the defendant.
                          </p>
                        </motion.div>
                      )}
                    </div>`,
    
    replace: `                    <div className="space-y-4 text-[14px]">
                      <DynamicReasoningSteps 
                        reasoningSteps={reasoningSteps}
                        reasoningContent={reasoningContent}
                      />
                    </div>`
  }
];

console.log('Apply this fix to /src/app/components/ActiveChatView.tsx');
console.log('Replace lines 1650-1743');
