// utils/healthRecords.ts

export const getHealthRecords = async (userId: string) => {
    try {
      // Replace with actual logic to fetch health records (e.g., from a database or Web3 contract)
      const response = await fetch(`/api/getHealthRecords?userId=${userId}`);
      if (!response.ok) throw new Error("Failed to fetch health records");
      return await response.json();
    } catch (error) {
      console.error("Error fetching health records:", error);
      return null;
    }
  };
  
  export const saveHealthRecord = async (userId: string, record: any) => {
    try {
      // Replace with actual logic to save a health record (e.g., to a backend or Web3 contract)
      const response = await fetch("/api/saveHealthRecord", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, record }),
      });
      if (!response.ok) throw new Error("Failed to save health record");
      return await response.json();
    } catch (error) {
      console.error("Error saving health record:", error);
      return null;
    }
  };
  