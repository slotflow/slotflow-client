import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/utils/redux/appStore";

const ThemeSync = () => {
  const lightTheme = useSelector(
    (state: RootState) => state.app.lightTheme
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", !lightTheme);
  }, [lightTheme]);

  return null;
};

export default ThemeSync;
