# How to See the Chat-to-Monitor Conversion Feature

The **"Monitor this topic"** button appears in chat conversations, allowing you to convert any research or analysis discussion into an ongoing monitoring task.

## Quick Steps to Test the Feature:

### Option 1: Start a Fresh Research Chat (Recommended)

1. **Go to Home** - Click on the CoCounsel logo in the top-left to return to the home page
   
2. **Click "Conduct deep research..."** pill to see research prompts like:
   - "Research jurisdictional requirements"
   - "Research statute of limitations defenses"
   - "Research GDPR compliance for US companies"
   
3. **Select any research prompt** - This will auto-fill the input box

4. **Submit the prompt** - This creates a new chat and starts the AI response

5. **Look for the button** - After the AI responds (you'll see text content), scroll to the bottom of the assistant's last message and you'll see:
   ```
   🔔 Monitor this topic
   ```

6. **Click the button** to open the monitoring setup modal pre-filled with:
   - **Topic**: Extracted from your question
   - **Criteria**: Extracted from the AI's response

### Option 2: Ask Your Own Research Question

1. **Start from Home** - Return to home page
2. **Type a research question** like:
   - "What are the latest developments in AI regulation?"
   - "Research employment law changes in California"
   - "What's new in data privacy law?"
3. **Submit and wait for response**
4. **Look for button** at the bottom of the AI's response

### Option 3: Navigate to Existing Chat

The app has demo chats pre-loaded. These likely already have the monitor button shown:

1. Go to **History** page (clock icon in sidebar)
2. Click on any existing chat to open it
3. Scroll to the last assistant message
4. Look for the "Monitor this topic" button

## Button Appearance Criteria:

The button appears when:
- ✅ It's the **last assistant message** in the conversation
- ✅ The message has **text content**
- ✅ The message is over **100 characters** (for messages with reasoning)
- ✅ OR any length for regular messages

## Visual Design:

```
┌─────────────────────────────────┐
│  🔔  Monitor this topic         │
└─────────────────────────────────┘
```

- White background
- Green border (#1d4b34) on hover
- Bell icon on the left
- Medium font weight
- Rounded corners

## What Happens When You Click:

1. **Monitoring Setup Modal opens** with pre-filled data:
   - Topic from your question (first 100 chars)
   - Criteria from AI response (first 300 chars)

2. **You can customize**:
   - Topic name
   - Monitoring criteria
   - Frequency (Daily, Weekly, Monthly)
   - Practice areas (if applicable)

3. **Click "Create Monitor"** to save

4. **View your monitors** by going to:
   - Knowledge page → "Monitoring & Alerts" tab
   - Or click the notification bell in the sidebar

## Troubleshooting:

**"I don't see the button"**
- Make sure you're looking at the LAST assistant message
- Scroll all the way to the bottom of that message
- The message needs to have text content (not just loading)
- Try starting a fresh research chat from Home

**"I keep seeing the motion to dismiss demo"**
- This is a pre-loaded demo conversation
- To test the monitoring feature properly, start a NEW chat from Home
- Click the CoCounsel logo (top-left) to return to Home

**"The button doesn't do anything"**
- Make sure you're clicking the "Monitor this topic" button
- Check browser console for any errors
- Try refreshing the page and starting a new chat
