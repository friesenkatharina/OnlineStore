import { useTheme } from "../context/ThemeContext"; // Adjust the path as necessary
import "../styles/index.css";

const Toggle = () => {
  const { theme, toggleTheme } = useTheme();

  console.log("Current theme:", theme);

  return (
    <button onClick={toggleTheme}>
      Switch to {theme === "light" ? "Dark" : "Light"} Mode
    </button>
  );
};

export default Toggle;
