import { useState } from "react";
import { toast } from "react-hot-toast";
import { getConversation, chatCompletion } from "../utils/chat"; // Assumed location of these utils
import { getHealthRecords, saveHealthRecord } from "../utils/healthRecords"; // Assumed location

// Define custom hook
export const useApi = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [chatMessage, setChatMessage] = useState<any[]>([]);
  const [records, setRecords] = useState<any[]>([]);

  // Fetch health records for the user
  const fetchHealthRecords = async (userId: string) => {
    setLoading(true);
    try {
      const records = await getHealthRecords(userId);
      setRecords(records);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Failed to fetch health records");
    }
  };

  // Save a new health record
  const saveHealthRecordToBackend = async (userId: string, record: string) => {
    setLoading(true);
    try {
      await saveHealthRecord(userId, record);
      toast.success("Health record saved successfully");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Failed to save health record");
    }
  };

  // Fetch conversation for the user
  const fetchConversation = async (userId: string) => {
    setLoading(true);
    try {
      const conversation = await getConversation(userId);
      setChatMessage(conversation || []);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Failed to fetch conversation");
    }
  };

  // Send a message to the chat API
  const chatCompletionHandler = async (messages: any[]) => {
    setLoading(true);
    try {
      const response = await chatCompletion(messages);
      setChatMessage((prevMessages) => [...prevMessages, response]);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Failed to send message");
    }
  };

  // Update chat messages after getting a conversation
  const setChatMessageHandler = (messages: any[]) => {
    setChatMessage(messages);
  };

  return {
    loading,
    chatMessage,
    records,
    fetchHealthRecords,
    saveHealthRecordToBackend,
    fetchConversation,
    chatCompletionHandler,
    setChatMessageHandler,
  };
};
