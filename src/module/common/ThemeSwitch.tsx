import { useState, useEffect } from "react";
import { VisuallyHidden } from "@react-aria/visually-hidden";
import { useTheme } from "@/hooks/use-theme";
import { Button } from "@nextui-org/react";
import { MoonFilledIcon, SunFilledIcon } from "@/assets/icons";


export const ThemeSwitch = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    setIsMounted(true);
  }, [isMounted]);

  if (!isMounted) return <div className="w-6 h-6" />;

  const isLightTheme = theme === "light";

  return (
    <Button
      aria-label={isLightTheme ? "Switch to dark mode" : "Switch to light mode"}
      onPress={toggleTheme}
      className="px-2 py-1 transition-opacity hover:opacity-80 cursor-pointer rounded-lg"
      isIconOnly
    >
      {isLightTheme ? (
        <MoonFilledIcon />
      ) : (
        <SunFilledIcon />
      )}
      <VisuallyHidden>
        {isLightTheme ? "Dark Mode" : "Light Mode"}
      </VisuallyHidden>
    </Button>
  );
};
