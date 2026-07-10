
const WorkflowBackground = () => {
  return (
    <>

      <div className="absolute inset-0 -z-50 bg-background" />
      <div
  className="
    absolute
    right-0
    top-1/3
    h-80
    w-80
    rounded-full
    bg-primary/5
    blur-[140px]
  "
/>

      <div className="absolute inset-0 -z-40 opacity-[0.04]">

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

      <div
        className="
          absolute
          left-1/2
          top-40
          -z-30
          h-[700px]
          w-[700px]
          -translate-x-1/2
          rounded-full
          bg-primary/10
          blur-[160px]
        "
      />

      <div
        className="
          absolute
          bottom-0
          left-0
          right-0
          h-52
          bg-gradient-to-t
          from-background
          to-transparent
        "
      />
    </>
  );
};

export default WorkflowBackground;