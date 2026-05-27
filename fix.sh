#!/bin/bash

# Create a marker file with the replacement for reasoning steps
cat > /tmp/reasoning_replacement.txt << 'EOF'
                    <div className="space-y-4 text-[14px]">
                      <DynamicReasoningSteps 
                        reasoningSteps={reasoningSteps}
                        reasoningContent={reasoningContent}
                      />
                    </div>
EOF

# Create a marker file with the replacement for source items
cat > /tmp/source_replacement.txt << 'EOF'
                    <div className="text-[14px]">
                      <DynamicSourceItems 
                        sourcesItems={sourcesItems}
                        sourceContent={sourceContent}
                      />
                    </div>
EOF

echo "Created replacement files"
echo "Now run the python fix script in your Mac Terminal"
echo "Or manually replace the hardcoded sections in ActiveChatView.tsx"
