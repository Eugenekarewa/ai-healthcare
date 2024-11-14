// TextInput.tsx
interface TextInputProps {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Function to handle input changes
    placeholder?: string; // Optional placeholder text
  }
  
  const TextInput = ({ onChange, placeholder }: TextInputProps) => (
    <input
      type="text"
      className="text-input"
      onChange={onChange}  // Calls onChange prop when the user types
      placeholder={placeholder}  // Display placeholder text
      required
    />
  );
  
  export default TextInput;
  