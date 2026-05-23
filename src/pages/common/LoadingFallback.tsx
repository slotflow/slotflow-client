const LoadingFallback = () => {

  return (
    <div className="h-screen w-full flex items-center justify-center bg-[var(--background)]">
      <h1 className="text-3xl md:text-4xl font-extrabold tracking-wide relative overflow-hidden text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-white to-gray-300 text-shimmer">
        SlotFlow
      </h1>
    </div>
  );
};

export default LoadingFallback;
