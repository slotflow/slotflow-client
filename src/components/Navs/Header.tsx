import React from 'react';
import { Button } from '../ui/button';
import { Moon, Sun } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import logo from '../../assets/logos/logo-transparent.png';
import { toggleTheme } from '@/shared/redux/slices/appSlice';
import { navigation, redirectPaths } from '@/shared/utils/constants';
import { AppDispatch, RootState } from '../../shared/redux/appStore';

const Header: React.FC = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const themeMode: boolean = useSelector((store: RootState) => store.app.lightTheme);

  const changeTheme = (): void => {
    dispatch(toggleTheme());
  }

  return (
    <nav className={`w-full bg-[var(--background)] fixed transition-colors duration-300 ease-in-out z-50`}>
      <div className={`max-w-7xl mx-auto flex h-16 items-center justify-between`}>

        <div className='w-3/12 flex items-center' onClick={() => navigate('/')} >
          <div className='flex items-center justify-center hidden md:block'>
            <img src={logo} className='size-8' />
          </div>
          <h4 className="ml-2 text-[var(--mainColor)] text-3xl font-bold italic px-2 rounded-lg cursor-pointer">Slotflow</h4>
        </div>

        <div className='w-6/12'>
          <div className="flex flex-1 items-center justify-center">
            <div className="hidden sm:ml-6 md:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    aria-current={item.current ? 'page' : undefined}
                    className="rounded-md px-3 py-2 text-sm font-medium text-[var(--textOne)] hover:text-[var(--textOneHover)]"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className='w-3/12 flex justify-end items-center'>
          <Button
            title="Login"
            variant={"ghost"}
            onClick={() => navigate(redirectPaths.LOGIN)}
            className="cursor-pointer px-4 py-2 rounded-lg text-sm font-semibold bg-[var(--mainColor)] text-white hover:opacity-90 transition border border-[var(--mainColor)] hover:text-[var(--mainColor)] "
          >
            Login
          </Button>

          <Button
            title="Sign Up"
            variant={"ghost"}
            onClick={() => navigate(redirectPaths.REGISTER)}
            className="hidden md:blockml-2 cursor-pointer px-4 py-2 rounded-lg text-sm font-semibold border border-[var(--mainColor)] text-[var(--mainColor)] hover:bg-[var(--mainColor)] hover:text-white transition"
          >
            Sign Up
          </Button>
          {themeMode ?
            <div className="relative flex rounded-full cursor-pointer mx-3" onClick={changeTheme}>
              <Sun />
            </div>
            :
            <div className="relative flex rounded-full cursor-pointer mx-3" onClick={changeTheme}>
              <Moon />
            </div>
          }
        </div>

      </div>

      {/* <div className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              aria-current={item.current ? 'page' : undefined}
              className="item.current ? 'bg-[var(--menuItemHoverBg)] text-[var(--textOne)]' : 'text-[var(--textOne)] hover:bg-[var(--menuItemHoverBg)] hover:text-[var(--textOneHover)] block rounded-md px-3 py-2 text-base font-medium"
            >
              {item.name}
            </a>
          ))}
        </div>
      </div> */}

    </nav>
  )
}

export default Header