import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";

const ThemeChanger = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // When mounted on client, now we can show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const setLight = () => {
    setTheme("light");
  };

  const setDark = () => {
    setTheme("dark");
  };

  return (
    <button
      className="cursor-pointer bg-th-accent-7 transition p-2 rounded-md flex justify-center items-center"
      onClick={() => (theme === "light" ? setDark() : setLight())}
    >
      {theme === "light" ? (
        <MoonIcon className="text-th-accent-6 cursor-pointer w-6 h-6" />
      ) : theme === "dark" ? (
        <SunIcon className="text-th-accent-6 cursor-pointer w-6 h-6" />
      ) : (
        <MoonIcon className="text-th-accent-6 cursor-pointer w-6 h-6" />
      )}
    </button>
  );
};

export default ThemeChanger;
