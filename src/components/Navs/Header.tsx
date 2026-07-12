import { useState } from "react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import logo from "../../assets/logos/logo-transparent.png";
import { toggleTheme } from "@/shared/redux/slices/appSlice";
import { navigation, redirectPaths } from "@/shared/utils/constants";
import { AppDispatch, RootState } from "../../shared/redux/appStore";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const themeMode = useSelector(
    (store: RootState) => store.app.lightTheme
  );

  const changeTheme = () => {
    dispatch(toggleTheme());
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  return (
    <nav className="relative z-50 w-full transition-colors duration-300">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between">
        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          className="flex flex-1 cursor-pointer items-center"
        >
          <img src={logo} className="size-8" alt="Slotflow Logo" />

          <h4 className="ml-2 rounded-lg px-2 text-3xl font-bold italic text-[var(--mainColor)]">
            Slotflow
          </h4>

          {/* Desktop Navigation */}
          <div className="ml-8 hidden md:flex items-center space-x-2">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-[var(--textOne)] transition hover:bg-muted hover:text-[var(--textOneHover)]"
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center">
          {/* Desktop Buttons */}
          <Button
            title="Login"
            variant="ghost"
            onClick={() => navigate(redirectPaths.LOGIN)}
            className="hidden sm:flex rounded-lg border border-[var(--mainColor)] bg-[var(--mainColor)] px-4 py-2 text-sm font-semibold text-white transition hover:text-[var(--mainColor)] hover:opacity-90"
          >
            Login
          </Button>

          <Button
            title="Sign Up"
            variant="ghost"
            onClick={() => navigate(redirectPaths.REGISTER)}
            className="ml-2 hidden md:flex rounded-lg border border-[var(--mainColor)] px-4 py-2 text-sm font-semibold text-[var(--mainColor)] transition hover:bg-[var(--mainColor)] hover:text-white"
          >
            Sign Up
          </Button>

          {/* Theme */}
          <button
            onClick={changeTheme}
            className="ml-3 rounded-full p-2 transition hover:bg-muted"
          >
            {themeMode ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          {/* Hamburger */}
          <button
            onClick={toggleMobileMenu}
            className="ml-2 rounded-xl p-2 transition hover:bg-muted md:hidden"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={mobileMenuOpen ? "close" : "menu"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </motion.div>
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="absolute left-0 right-0 top-full md:hidden"
          >
            <div className="mx-4 mt-3 overflow-hidden rounded-2xl border bg-background/90 shadow-2xl backdrop-blur-xl">
              <motion.div
                initial="hidden"
                animate="show"
                variants={{
                  hidden: {},
                  show: {
                    transition: {
                      staggerChildren: 0.08,
                    },
                  },
                }}
                className="flex flex-col p-3"
              >
                {navigation.map((item) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    variants={{
                      hidden: {
                        opacity: 0,
                        x: -20,
                      },
                      show: {
                        opacity: 1,
                        x: 0,
                      },
                    }}
                    className="rounded-xl px-4 py-3 text-sm font-medium transition hover:bg-muted"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </motion.a>
                ))}

                <div className="mt-4 flex flex-col gap-2 border-t pt-4">
                  <Button
                    title="Login"
                    onClick={() => {
                      navigate(redirectPaths.LOGIN);
                      setMobileMenuOpen(false);
                    }}
                  >
                    Login
                  </Button>

                  <Button
                    title="Sign Up"
                    variant="outline"
                    onClick={() => {
                      navigate(redirectPaths.REGISTER);
                      setMobileMenuOpen(false);
                    }}
                  >
                    Sign Up
                  </Button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Header;