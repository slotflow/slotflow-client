const FAQBackground = () => {
  return (
    <>
      <div className="absolute inset-0 -z-50 bg-background" />
      <div className="absolute inset-0 -z-40 opacity-[0.03]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `
              linear-gradient(to right, currentColor 1px, transparent 1px),
              linear-gradient(to bottom, currentColor 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>
      <div className="absolute left-1/2 top-0 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-primary/8 blur-[140px] -z-30" />
      <div className="absolute bottom-0 left-0 h-[260px] w-[260px] rounded-full bg-primary/5 blur-[100px] -z-30" />
      <div className="absolute right-0 bottom-20 h-[260px] w-[260px] rounded-full bg-primary/5 blur-[100px] -z-30" />
    </>
  );
};

export default FAQBackground;