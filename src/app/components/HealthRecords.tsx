import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { getConversation, chatCompletion } from "../utils/chat";
import { getHealthRecords, saveHealthRecord } from "../utils/healthRecords";
import { getUserPrincipal } from "../utils/auth";

export default function HealthcareChat() {
  const [chatQuestion, setChatQuestion] = useState(""); // Chat input state
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const [healthRecordInput, setHealthRecordInput] = useState(""); // Separate state for health record input
  const [healthRecords, setHealthRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [userPrincipal, setUserPrincipal] = useState<string | null>(null);

  // Fetch conversation when the component loads
  const fetchConversation = async () => {
    if (!userPrincipal) return;

    setLoading(true);
    try {
      const conversation = await getConversation(userPrincipal);
      setChatMessages(conversation || []);
    } catch (error) {
      toast.error("Error fetching conversation");
    } finally {
      setLoading(false);
    }
  };

  // Fetch health records when the component loads
  const fetchHealthRecords = async () => {
    if (!userPrincipal) return;

    setLoading(true);
    try {
      const records = await getHealthRecords(userPrincipal);
      setHealthRecords(records);
    } catch (error) {
      toast.error("Error fetching health records");
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission for chat
  const handleSubmitChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatQuestion.trim()) return;

    const newChatMessages = [...chatMessages, { content: chatQuestion, role: "user" }];
    setChatMessages(newChatMessages);

    setLoading(true);
    try {
      const response = await chatCompletion(newChatMessages);
      setChatMessages([...newChatMessages, { content: response, role: "assistant" }]);
      setChatQuestion(""); // Clear chat input field
    } catch (error) {
      toast.error("Error processing your message");
    } finally {
      setLoading(false);
    }
  };

  // Save a new health record
  const handleSaveHealthRecord = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!healthRecordInput.trim() || !userPrincipal) return;

    setLoading(true);
    try {
      const newRecord = await saveHealthRecord(userPrincipal, healthRecordInput);
      setHealthRecords([...healthRecords, newRecord]);
      toast.success("Health record saved successfully");
      setHealthRecordInput(""); // Clear input field after saving
    } catch (error) {
      toast.error("Error saving health record");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    try {
      const principal = getUserPrincipal();
      if (principal) {
        setUserPrincipal(principal);
      } else {
        toast.error("User is not authenticated. Please log in.");
      }
    } catch (error) {
      console.error("Error fetching user principal:", error);
      toast.error("An error occurred while fetching user information.");
    }
  }, []);

  useEffect(() => {
    if (userPrincipal) {
      fetchConversation();
      fetchHealthRecords();
    }
  }, [userPrincipal]);

  return (
    <div>
      <h1>Healthcare Chat</h1>

      {/* Display Health Records */}
      <h2>Health Records</h2>
      <ul>
        {healthRecords.map((record, index) => (
          <li key={index}>
            <strong>{record.date}</strong>: {record.details}
          </li>
        ))}
      </ul>

      {/* Form to Add New Health Record */}
      <form onSubmit={handleSaveHealthRecord}>
        <input
          type="text"
          placeholder="Enter health record details"
          value={healthRecordInput}
          onChange={(e) => setHealthRecordInput(e.target.value)}
        />
        <button type="submit">Save Health Record</button>
      </form>

      {/* Chat Section */}
      <h2>Chat</h2>
      <div>
        {loading && <p>Loading...</p>}
        {chatMessages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.role === "user" ? "You" : "Assistant"}:</strong> {msg.content}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmitChat}>
        <input
          type="text"
          placeholder="Ask a question..."
          value={chatQuestion}
          onChange={(e) => setChatQuestion(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
