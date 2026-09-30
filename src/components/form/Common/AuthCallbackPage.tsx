import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { redirectPaths } from '@/shared/utils/constants/routeConstants';
import { useAuthCallback } from '@/hooks/useAuthCallback';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import { authCallbackLoadingSteps } from '@/shared/utils/constants/landingConstants';

export const AuthCallbackPage: React.FC = () => {

  const { goTo } = useAppNavigation();
  const { stepIndex, error } = useAuthCallback();

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <AnimatePresence mode="wait">
          {error ? (
            <motion.div
              key="error-card"
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.95 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="flex flex-col items-center justify-center text-center rounded-2xl bg-gradient-to-b from-red-50 to-white dark:from-red-950/30 dark:to-gray-900/60 p-8 border border-red-200/80 dark:border-red-900/50 shadow-xl backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.1 }}
                className="flex h-14 w-14 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400 ring-8 ring-red-50 dark:ring-red-950/40 mb-5"
              >
                <svg
                  className="h-7 w-7"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                  />
                </svg>
              </motion.div>

              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                Authentication Failed
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300 max-w-xs">
                {error}
              </p>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => goTo(redirectPaths.LOGIN)}
                className="cursor-pointer mt-6 w-full rounded-xl bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 dark:from-red-700 dark:to-red-600 dark:hover:from-red-600 dark:hover:to-red-500 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-red-500/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 transition-all duration-200"
              >
                Return to Login
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="loading-card"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="flex flex-col items-center justify-center text-center space-y-6"
            >
              <div className="relative flex items-center justify-center h-20 w-20">
                <motion.div
                  className="absolute inset-0 rounded-full bg-indigo-500/20 dark:bg-indigo-400/20 blur-xl"
                  animate={{
                    scale: [1, 1.35, 1],
                    opacity: [0.3, 0.75, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />

                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-indigo-200 dark:border-indigo-900/60 border-t-indigo-600 dark:border-t-indigo-400"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />

                <motion.div
                  className="absolute inset-2 rounded-full border-2 border-indigo-400/30 dark:border-indigo-500/30 border-b-indigo-500 dark:border-b-indigo-400"
                  animate={{ rotate: -360 }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />

                <motion.div
                  className="h-8 w-8 rounded-full bg-gradient-to-tr from-indigo-600 to-indigo-500 shadow-lg flex items-center justify-center text-white"
                  animate={{ scale: [0.9, 1.05, 0.9] }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <svg
                    className="size-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                    />
                  </svg>
                </motion.div>
              </div>

              <div className="flex flex-col items-center justify-center space-y-2 h-16">
                <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                  Completing Authentication
                </h2>

                <AnimatePresence mode="wait">
                  <motion.p
                    key={stepIndex}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3 }}
                    className="text-sm font-medium text-indigo-600 dark:text-indigo-400"
                  >
                    {authCallbackLoadingSteps[stepIndex]}
                  </motion.p>
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AuthCallbackPage;