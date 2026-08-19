import { jsx } from "react/jsx-runtime";
import { createContext, useContext, useEffect, useState } from "react";
const ThemeContext = createContext(void 0);
function ThemeProvider({
  children,
  defaultTheme = "light",
  switchable = false
}) {
  const [theme, setTheme] = useState(() => {
    if (switchable) {
      const stored = localStorage.getItem("theme");
      return stored || defaultTheme;
    }
    return defaultTheme;
  });
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    if (switchable) {
      localStorage.setItem("theme", theme);
    }
  }, [theme, switchable]);
  const toggleTheme = switchable ? () => {
    setTheme((prev) => prev === "light" ? "dark" : "light");
  } : void 0;
  return /* @__PURE__ */ jsx(ThemeContext.Provider, { value: { theme, toggleTheme, switchable }, children });
}
function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
export {
  ThemeProvider,
  useTheme
};
