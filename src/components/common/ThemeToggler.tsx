import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "@/shared/redux/slices/appSlice";
import { AppDispatch, RootState } from "@/shared/redux/appStore";

const ThemeToggler = () => {
    const dispatch = useDispatch<AppDispatch>();

    const themeMode = useSelector(
        (store: RootState) => store.app.lightTheme
    );

    const changeTheme = () => {
        dispatch(toggleTheme());
    };

    return (
        <button
            onClick={changeTheme}
            aria-label="Toggle theme"
            className="ml-3 rounded-full p-2 transition-colors cursor-pointer"
        >
            <motion.div
                key={themeMode ? "moon" : "sun"}
                initial={{ rotate: -180 }}
                animate={{ rotate: 0 }}
                transition={{
                    duration: 0.35,
                    ease: "easeInOut",
                }}
            >
                {themeMode ? <Moon size={20} /> : <Sun size={20} />}
            </motion.div>
        </button>
    );
};

export default ThemeToggler;