// Pure frontend implementation - no backend required
export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export async function* streamChat(messages: Message[]) {
  // Mock response for demo purposes
  yield "This is a mock chat response. All functionality uses frontend-only mock data.";
}

export async function* streamChatHybrid(messages: Message[], cocounselToken: string, conversationId?: string) {
  // Mock response for demo purposes
  yield "This is a mock hybrid chat response. All functionality uses frontend-only mock data.";
}

export async function generateChatTitle(prompt: string): Promise<string> {
  // For demo purposes, use simple title generation
  // In production, this would call an API to generate a smart title

  // Generate a simple title from the prompt
  if (prompt.length <= 30) {
    return prompt;
  }

  // Try to find a good breaking point
  const firstSentence = prompt.split(/[.!?]/)[0];
  if (firstSentence && firstSentence.length <= 40) {
    return firstSentence.trim();
  }

  // Fallback to truncation at word boundary
  const truncated = prompt.substring(0, 35);
  const lastSpace = truncated.lastIndexOf(' ');
  if (lastSpace > 20) {
    return truncated.substring(0, lastSpace) + "...";
  }

  return truncated + "...";
}