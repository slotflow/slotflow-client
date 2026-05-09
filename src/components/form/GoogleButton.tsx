import React from 'react';
import { Button } from '../ui/button';
import { GoogleButtonProps } from '@/shared/interface/componentInterface';

const GoogleButton: React.FC<GoogleButtonProps> = ({
    onClick,
    text,
    className="w-full"
}) => {
    return (
        <Button
            title={text}
            onClick={onClick}
            variant="default"
            type="button"
            className={`${className} my-2
                relative flex items-center justify-center
                bg-white dark:bg-[var(--inputBg)]
                hover:bg-gray-100 dark:hover:bg-[var(--inputHover)]
                hover:border-[var(--mainColor)] dark:hover:border-[var(--mainColor)] hover:border-1 transition-colors
                rounded-md
                shadow-sm 
                text-black dark:text-white
                transition-colors
                cursor-pointer`}
        >
            <span
                className="w-5 h-5 mx-2"
                style={{
                    backgroundImage: `url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMTcuNiA5LjJsLS4xLTEuOEg5djMuNGg0LjhDMTMuNiAxMiAxMyAxMyAxMiAxMy42djIuMmgzYTguOCA4LjggMCAwIDAgMi42LTYuNnoiIGZpbGw9IiM0Mjg1RjQiIGZpbGwtcnVsZT0ibm9uemVybyIvPjxwYXRoIGQ9Ik05IDE4YzIuNCAwIDQuNS0uOCA2LTIuMmwtMy0yLjJhNS40IDUuNCAwIDAgMS04LTIuOUgxVjEzYTkgOSAwIDAgMCA4IDV6IiBmaWxsPSIjMzRBODUzIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNNCAxMC43YTUuNCA1LjQgMCAwIDEgMC0zLjRWNUgxYTkgOSAwIDAgMCAwIDhsMy0yLjN6IiBmaWxsPSIjRkJCQzA1IiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNOSAzLjZjMS4zIDAgMi41LjQgMy40IDEuM0wxNSAyLjNBOSA5IDAgMCAwIDEgNWwzIDIuNGE1LjQgNS40IDAgMCAxIDUtMy43eiIgZmlsbD0iI0VBNDMzNSIgZmlsbC1ydWxlPSJubm96ZXJvIi8+PHBhdGggZD0iTTAgMGgxOHYxOEgweiIvPjwvZz48L3N2Zz4=")`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "contain",
                }}
            />
            {text}
        </Button>
    )
}

export default GoogleButton;