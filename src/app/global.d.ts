export {};

declare global {
  interface Window {
    auth: {
      login: () => void;
      logout: () => void;
      isAuthenticated: boolean;
      principalText?: string;
      getDetails?: () => any;
    };
  }
}
