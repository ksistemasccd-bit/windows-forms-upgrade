import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { Gift } from "lucide-react";

interface QRCodeSectionProps {
  dni: string;
  showQR: boolean;
}

const QRCodeSection = ({ dni, showQR }: QRCodeSectionProps) => {
  const qrValue = dni || "CCD-REGISTRO-2025";

  return (
    <div className="flex flex-col items-center gap-4 animate-fade-in">
      {/* QR Code */}
      <div className="p-4 bg-card rounded-lg ccd-shadow">
        {showQR ? (
          <QRCodeSVG
            value={qrValue}
            size={120}
            level="H"
            includeMargin
            className="rounded"
          />
        ) : (
          <div className="w-[120px] h-[120px] bg-muted rounded flex items-center justify-center">
            <span className="text-muted-foreground text-xs text-center px-2">
              Complete el formulario para generar QR
            </span>
          </div>
        )}
      </div>

      {/* DNI Display */}
      <div className="text-center">
        <p className="font-heading font-bold text-2xl text-primary">
          {dni || "--------"}
        </p>
      </div>

      {/* Benefits Button */}
      <Button
        variant="default"
        className="ccd-gradient text-primary-foreground font-heading font-bold px-8 py-5 text-sm hover:opacity-90 transition-opacity gap-2"
      >
        <Gift className="w-4 h-4" />
        BENEFICIOS
      </Button>
    </div>
  );
};

export default QRCodeSection;
