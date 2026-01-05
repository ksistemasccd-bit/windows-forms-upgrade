import { BookOpen } from "lucide-react";

const CCDLogo = ({ size = "default" }: { size?: "default" | "small" }) => {
  const isSmall = size === "small";

  return (
    <div className={`flex flex-col items-center ${isSmall ? "gap-1" : "gap-2"}`}>
      <div
        className={`relative flex items-center justify-center rounded-full ccd-gradient ${
          isSmall ? "w-16 h-16" : "w-24 h-24"
        }`}
      >
        <div
          className={`absolute inset-1 rounded-full bg-card flex items-center justify-center`}
        >
          <BookOpen
            className={`text-primary ${isSmall ? "w-8 h-8" : "w-12 h-12"}`}
            strokeWidth={1.5}
          />
        </div>
      </div>
      <span
        className={`font-heading font-extrabold text-primary tracking-wider ${
          isSmall ? "text-xl" : "text-3xl"
        }`}
      >
        CCD
      </span>
    </div>
  );
};

export default CCDLogo;
