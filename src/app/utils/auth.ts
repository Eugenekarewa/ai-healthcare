import { toast } from "react-hot-toast";

// Function to handle the login process
export const login = () => {
  try {
    if (!window.auth || !window.auth.login) {
      throw new Error("Authentication module is not available.");
    }
    window.auth.login(); // Trigger ICP login or another custom flow
    toast.success("User logged in.");
  } catch (error) {
    console.error("Error during login:", error);
    toast.error("Login failed. Please try again.");
  }
};

// Function to handle the logout process
export const logout = () => {
  try {
    if (!window.auth || !window.auth.logout) {
      throw new Error("Authentication module is not available.");
    }
    window.auth.logout(); // Trigger ICP logout or another custom logout method
    toast.success("User logged out.");
  } catch (error) {
    console.error("Error during logout:", error);
    toast.error("Logout failed. Please try again.");
  }
};

// Function to check if the user is authenticated
export const isAuthenticated = () => {
  return window.auth && window.auth.isAuthenticated;
};

// Function to get the current user's principal (identifier)
export const getUserPrincipal = () => {
  return window.auth && window.auth.principalText ? window.auth.principalText : null;
};

// Optional: Function to get user's authentication details (optional based on ICP)
export const getAuthDetails = () => {
  if (window.auth && window.auth.getDetails) {
    return window.auth.getDetails();
  }
  return null;
};
