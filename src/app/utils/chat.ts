// utils/chat.ts

export const getConversation = async (userId: string) => {
    try {
      // Replace this with actual logic to retrieve the conversation from your backend or smart contract
      const response = await fetch(`/api/getConversation?userId=${userId}`);
      if (!response.ok) throw new Error("Failed to fetch conversation");
      return await response.json();
    } catch (error) {
      console.error("Error fetching conversation:", error);
      return null;
    }
  };
  
  export const chatCompletion = async (history: Array<{ content: string, role: string }>) => {
    try {
      // Replace this with actual API call to your AI model or Web3-enabled chat completion
      const response = await fetch("/api/chatCompletion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });
      if (!response.ok) throw new Error("Failed to get chat completion");
      return await response.json();
    } catch (error) {
      console.error("Error fetching chat completion:", error);
      return null;
    }
  };
  