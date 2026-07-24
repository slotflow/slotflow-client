import { Moon, Sun } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "@/shared/redux/slices/appSlice";
import { AppDispatch, RootState } from "@/shared/redux/appStore";

const ThemeToggle = () => {

    const dispatch = useDispatch<AppDispatch>();

    const themeMode = useSelector((store: RootState) => store.app.lightTheme);

    const changeTheme = () => {
        dispatch(toggleTheme());
    };

    return (
        <button
            onClick={changeTheme}
            className="ml-3 rounded-full p-2 transition hover:bg-muted"
        >
            {themeMode ? <Moon size={20} /> : <Sun size={20} />}
        </button>
    )
}

export default ThemeToggle;