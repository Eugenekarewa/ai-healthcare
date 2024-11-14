import { useState, useEffect } from "react";
import { login, logout, isAuthenticated, getUserPrincipal } from "../utils/auth";
import HealthRecords from "../components/HealthRecords"; // Import HealthRecords component
import Chat from "../components/Chat"; // Ensure Chat component is correctly imported

const Home = () => {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [userPrincipal, setUserPrincipal] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (isAuthenticated()) {
      setAuthenticated(true);
      setUserPrincipal(getUserPrincipal()); // Store the user principal for use in the app
    } else {
      setAuthenticated(false);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8 p-8">
      <header className="flex justify-between w-full max-w-screen-lg">
        <h1 className="text-2xl font-bold">AI-Powered Decentralized Healthcare Marketplace</h1>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => {
            if (authenticated) {
              logout();
            } else {
              login();
            }
            setAuthenticated(!authenticated);
            setUserPrincipal(null); // Reset user principal when logging out
          }}
        >
          {authenticated ? "Logout" : "Login"}
        </button>
      </header>

      {/* Render User Info */}
      {authenticated && userPrincipal && (
        <section className="w-full max-w-screen-lg">
          <p>Welcome, {userPrincipal}!</p>
        </section>
      )}

      {/* Health Records Section */}
      {authenticated && <HealthRecords />}

      {/* Chat Section */}
      {authenticated && <Chat />}

      {/* Loading State */}
      {loading && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="text-white">Loading...</div>
        </div>
      )}

      {/* Message if not authenticated */}
      {!authenticated && (
        <div className="text-center">
          <p>Please log in to access your health records and chat.</p>
        </div>
      )}
    </div>
  );
};

export default Home;
