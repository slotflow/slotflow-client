import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/shared/redux/appStore";

const ThemeSync: React.FC = () => {
  const lightTheme = useSelector(
    (state: RootState) => state.app.lightTheme
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", !lightTheme);
  }, [lightTheme]);

  return null;
};

export default ThemeSync;
