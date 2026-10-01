const ChatSidebarShimmer = () => {
  return (
    <div className="w-4/12 space-y-2">
      <div className="w-full h-12 rounded-md shimmer"></div>
      {[...Array(10)].map((_, index) => (
        <div key={index} className="flex items-center h-20 w-full mb-2 animate-pulse">
          <div className="w-12 h-12 shimmer rounded-full"></div>
          <div className="flex-1 space-y-2 ml-2">
            <div className="w-full h-4 shimmer rounded"></div>
            <div className="w-2/4 h-3 shimmer rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatSidebarShimmer;
