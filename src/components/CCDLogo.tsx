import logoCCD from "@/assets/logo-ccd.png";

const CCDLogo = ({ size = "default" }: { size?: "default" | "small" }) => {
  const isSmall = size === "small";

  return (
    <div className="flex flex-col items-center">
      <img 
        src={logoCCD} 
        alt="Logo CCD - Centro de Capacitación y Desarrollo" 
        className={isSmall ? "w-20 h-auto" : "w-32 h-auto"}
      />
    </div>
  );
};

export default CCDLogo;