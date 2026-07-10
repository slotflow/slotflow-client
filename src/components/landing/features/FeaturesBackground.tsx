const FeaturesBackground = () => {
  return (
    <>
      <div className="absolute inset-0 -z-50 bg-background" />
      <div className="absolute inset-0 -z-40 opacity-[0.035]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `
              linear-gradient(to right, currentColor 1px, transparent 1px),
              linear-gradient(to bottom, currentColor 1px, transparent 1px)
            `,
            backgroundSize: "56px 56px",
          }}
        />
      </div>
      <div className="absolute left-1/2 top-1/3 -translate-x-1/2 h-[650px] w-[650px] rounded-full bg-primary/10 blur-[150px] -z-30" />
      <div className="absolute left-0 bottom-0 h-[320px] w-[320px] rounded-full bg-primary/5 blur-[120px] -z-30" />
      <div className="absolute right-0 top-20 h-[300px] w-[300px] rounded-full bg-primary/5 blur-[120px] -z-30" />
    </>
  );
};

export default FeaturesBackground;