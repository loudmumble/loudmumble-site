export const AsciiHeader = () => {
  const ascii = `
██╗      ██████╗ ██╗   ██╗██████╗ ███╗   ███╗██╗   ██╗███╗   ███╗██████╗ ██╗     ███████╗
██║     ██╔═══██╗██║   ██║██╔══██╗████╗ ████║██║   ██║████╗ ████║██╔══██╗██║     ██╔════╝
██║     ██║   ██║██║   ██║██║  ██║██╔████╔██║██║   ██║██╔████╔██║██████╔╝██║     █████╗  
██║     ██║   ██║██║   ██║██║  ██║██║╚██╔╝██║██║   ██║██║╚██╔╝██║██╔══██╗██║     ██╔══╝  
███████╗╚██████╔╝╚██████╔╝██████╔╝██║ ╚═╝ ██║╚██████╔╝██║ ╚═╝ ██║██████╔╝███████╗███████╗
╚══════╝ ╚═════╝  ╚═════╝ ╚═════╝ ╚═╝     ╚═╝ ╚═════╝ ╚═╝     ╚═╝╚═════╝ ╚══════╝╚══════╝`;

  return (
    <div className="flex justify-center my-6">
      <pre 
        className="ascii-art text-terminal-magenta text-glow-subtle whitespace-pre overflow-x-auto"
        style={{ 
          textShadow: '0 0 10px hsl(300 100% 60% / 0.6), 0 0 20px hsl(300 100% 60% / 0.3)'
        }}
      >
        {ascii}
      </pre>
    </div>
  );
};

export const AsciiHeaderMobile = () => {
  return (
    <div className="flex justify-center my-4">
      <h1 
        className="text-2xl md:text-3xl font-bold text-terminal-magenta text-glow-subtle tracking-widest"
        style={{ 
          textShadow: '0 0 10px hsl(300 100% 60% / 0.6), 0 0 20px hsl(300 100% 60% / 0.3)'
        }}
      >
        loudmumble
      </h1>
    </div>
  );
};
