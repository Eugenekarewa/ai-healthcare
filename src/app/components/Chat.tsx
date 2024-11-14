import { useState, useEffect } from "react";
import { login, logout } from "../utils/auth";
import { useApi } from "../hooks/useApi";
import { getConversation } from "../utils/chat";
import TextInput from "./TextInput";
import toast from "react-hot-toast";
import { encryptData } from "../utils/encryptData";
import Loading from "./Loading.tsx";

const Chat = () => {
  const [question, setQuestion] = useState<string>("");
  const [openaiKey, setOpenaiKey] = useState<string>("");
  const { loading, chatMessage, chatCompletionHandler } = useApi();
  const [localChatMessage, setLocalChatMessage] = useState<any[]>(chatMessage);

  // Fetch conversation history for authenticated users
  const updateChatMessage = async () => {
    const auth = window.auth || {}; // Safe check for window.auth
    if (auth?.principalText && auth.isAuthenticated) {
      try {
        const conversation = await getConversation(auth.principalText);
        if (conversation) {
          setLocalChatMessage(conversation.conversation);
        }
      } catch (error) {
        toast.error("Error fetching conversation history");
      }
    }
  };

  useEffect(() => {
    updateChatMessage();
  }, []);

  // Handle question submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const auth = window.auth || {}; // Safe check for window.auth
    if (!auth?.isAuthenticated) {
      toast.error("You are not authenticated");
      return;
    }

    const openaiKeyFromLocalStorage = localStorage.getItem("icp-dai-open-ai");
    if (!openaiKeyFromLocalStorage) {
      toast.error("No OpenAI key found");
      return;
    }

    if (question) {
      const history = [...localChatMessage, { content: question, role: "user" }];
      setLocalChatMessage(history);
      try {
        await chatCompletionHandler(history); // Use the correct handler function
        setQuestion(""); // Clear input after submission
      } catch (error) {
        toast.error("Error processing your message");
      }
    }
  };

  // Validate and save OpenAI API key
  const onValidateOpenaiAPI = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^sk-[a-zA-Z0-9]{32,}$/.test(value)) {
      setOpenaiKey(value);
    } else {
      setOpenaiKey("");
    }
  };

  const onSaveOpenaiKey = () => {
    if (!openaiKey) {
      toast.error("Invalid OpenAI key");
      return;
    }
    const encryptedApiKey = encryptData(openaiKey);
    localStorage.setItem("icp-dai-open-ai", encryptedApiKey);
    toast.success("OpenAI key successfully saved");
    setOpenaiKey("");
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h1>Healthcare Assistant Chat</h1>
        <button
          className="auth-button"
          onClick={() => (window.auth?.isAuthenticated ? logout() : login())}
        >
          {window.auth?.isAuthenticated ? "Log out" : "Login"}
        </button>
      </div>

      <div className="api-key-section">
        <TextInput
          onChange={onValidateOpenaiAPI}
          placeholder="Enter your OpenAI API key..."
        />
        <button className="save-button" onClick={onSaveOpenaiKey}>
          Save API Key
        </button>
      </div>

      <div className="chat-container-inner">
        <div className="chat-messages">
          {localChatMessage.map((message, index) => (
            <div
              key={index}
              className={`chat-bubble ${message.role === "user" ? "user" : "assistant"}`}
            >
              {message.content}
            </div>
          ))}
          {loading && <div className="chat-bubble assistant"><Loading /></div>}
        </div>

        <div className="chat-input-section">
          <input
            type="text"
            placeholder="Ask me anything..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}
          />
          {!loading && <button className="send-button" onClick={handleSubmit}>Send</button>}
        </div>
      </div>
    </div>
  );
};

export default Chat;
