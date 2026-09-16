import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '@/app/store/slices/appSlice';
import { AppDispatch, RootState } from '@/app/store/appStore';
import { Button } from '../ui/button';

const ThemeToggler = () => {
  const dispatch = useDispatch<AppDispatch>();

  const themeMode = useSelector((store: RootState) => store.app.lightTheme);

  const changeTheme = () => {
    dispatch(toggleTheme());
  };

  return (
    <Button
      variant='outline'
      onClick={changeTheme}
      aria-label="Toggle theme"
      className="ml-3 rounded-full p-2.5 cursor-pointer"
    >
      <motion.div
        key={themeMode ? 'moon' : 'sun'}
        initial={{ rotate: -180 }}
        animate={{ rotate: 0 }}
        transition={{
          duration: 0.35,
          ease: 'easeInOut',
        }}
      >
        {themeMode ? <Moon size={20} /> : <Sun size={20} />}
      </motion.div>
    </Button>
  );
};

export default ThemeToggler;
