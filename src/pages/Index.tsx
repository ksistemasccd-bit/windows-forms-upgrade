import { useState, useRef } from "react";
import CCDLogo from "@/components/CCDLogo";
import RegistrationForm from "@/components/RegistrationForm";
import TermsPanel from "@/components/TermsPanel";
import QRCodeSection from "@/components/QRCodeSection";
import { Button } from "@/components/ui/button";
import { FileDown, Camera, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

interface FormData {
  alumno: string;
  dni: string;
  curso: string;
  correo: string;
  celular: string;
}

const Index = () => {
  const { toast } = useToast();
  const formRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState<FormData>({
    alumno: "",
    dni: "",
    curso: "",
    correo: "",
    celular: "",
  });
  const [isRegistered, setIsRegistered] = useState(false);

  const handleSubmit = (data: FormData) => {
    setIsRegistered(true);
    console.log("Registration data:", data);
  };

  const handleCopyData = async () => {
    const registroTexto = `REGISTRO DE MATRÍCULA - CCD
================================
ALUMNO: ${formData.alumno}
DNI: ${formData.dni}
CURSO: ${formData.curso}
CORREO: ${formData.correo}
CELULAR: ${formData.celular}
================================
Fecha: ${new Date().toLocaleDateString('es-PE')}`;
    
    try {
      await navigator.clipboard.writeText(registroTexto);
      toast({
        title: "¡Datos copiados!",
        description: "Los datos han sido copiados al portapapeles.",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "No se pudo copiar los datos.",
        variant: "destructive",
      });
    }
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    
    doc.setFontSize(20);
    doc.setTextColor(0, 51, 102);
    doc.text("REGISTRO DE MATRÍCULA - CCD", 20, 30);
    
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text("================================", 20, 45);
    doc.text(`ALUMNO: ${formData.alumno}`, 20, 60);
    doc.text(`DNI: ${formData.dni}`, 20, 75);
    doc.text(`CURSO: ${formData.curso}`, 20, 90);
    doc.text(`CORREO: ${formData.correo}`, 20, 105);
    doc.text(`CELULAR: ${formData.celular}`, 20, 120);
    doc.text("================================", 20, 135);
    doc.text(`Fecha: ${new Date().toLocaleDateString('es-PE')}`, 20, 150);
    
    doc.save(`matricula-${formData.dni || 'registro'}.pdf`);
    
    toast({
      title: "¡PDF descargado!",
      description: "El archivo PDF se ha descargado correctamente.",
    });
  };

  const handleCaptureImage = async () => {
    if (formRef.current) {
      try {
        const canvas = await html2canvas(formRef.current);
        const link = document.createElement('a');
        link.download = `registro-${formData.dni || 'matricula'}.png`;
        link.href = canvas.toDataURL();
        link.click();
        
        toast({
          title: "¡Imagen descargada!",
          description: "La imagen se ha descargado correctamente.",
        });
      } catch (err) {
        toast({
          title: "Error",
          description: "No se pudo capturar la imagen.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border py-3 px-4 md:px-8 ccd-shadow">
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          <img src="/icon-ccd.ico" alt="CCD Logo" className="w-8 h-8" />
          <h1 className="font-heading font-bold text-primary text-sm md:text-base">
            CENTRO DE CAPACITACIÓN Y DESARROLLO - CCD
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* Title */}
        <h2 className="font-heading text-2xl md:text-4xl font-extrabold text-primary mb-8 animate-fade-in">
          REGISTRO DE MATRÍCULA CCD 2026
        </h2>

        {/* Grid Layout */}
        <div ref={formRef} className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-background p-4 rounded-lg">
          {/* Left Section - Logo and QR */}
          <div className="lg:col-span-2 flex flex-col items-center gap-8">
            <CCDLogo />
            <QRCodeSection dni={formData.dni} showQR={formData.dni.length >= 8} />
          </div>

          {/* Middle Section - Form */}
          <div className="lg:col-span-5">
            <div className="ccd-card p-6 md:p-8">
              <RegistrationForm 
                onSubmit={handleSubmit}
                formData={formData}
                setFormData={setFormData}
              />
            </div>
          </div>

          {/* Right Section - Terms */}
          <div className="lg:col-span-5">
            <TermsPanel />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-primary py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <p className="text-primary-foreground/80 text-sm text-center mb-4">
            © 2026 Centro de Capacitación y Desarrollo CCD. Todos los derechos reservados.
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              onClick={handleDownloadPDF}
              variant="outline"
              className="bg-primary-foreground/10 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/20"
            >
              <FileDown className="w-4 h-4 mr-2" />
              DESCARGAR PDF
            </Button>
            
            <Button 
              onClick={handleCaptureImage}
              variant="outline"
              className="bg-primary-foreground/10 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/20"
            >
              <Camera className="w-4 h-4 mr-2" />
              CAPTURAR FOTO
            </Button>
            
            <Button 
              onClick={handleCopyData}
              variant="outline"
              className="bg-primary-foreground/10 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/20"
            >
              <Copy className="w-4 h-4 mr-2" />
              COPIAR DATOS
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
