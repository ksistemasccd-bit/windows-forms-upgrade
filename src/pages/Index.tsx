import { useState, useRef } from "react";
import CCDLogo from "@/components/CCDLogo";
import RegistrationForm from "@/components/RegistrationForm";
import TermsPanel from "@/components/TermsPanel";
import QRCodeSection from "@/components/QRCodeSection";
import { Button } from "@/components/ui/button";
import { FileDown, Camera, Copy, Printer, Image } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { QRCodeCanvas } from "qrcode.react";

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
  const mainRef = useRef<HTMLDivElement>(null);
  const qrRef = useRef<HTMLDivElement>(null);
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

  const handleDownloadPDF = async () => {
    if (formRef.current) {
      try {
        // Capture the entire form section as image
        const canvas = await html2canvas(formRef.current, {
          useCORS: true,
          allowTaint: true,
          background: '#ffffff',
          width: formRef.current.scrollWidth,
          height: formRef.current.scrollHeight,
          windowWidth: 1400, // Force desktop width for horizontal layout
        } as any);
        
        const imgData = canvas.toDataURL('image/png', 1.0);
        
        // Create PDF in landscape orientation for horizontal layout
        const doc = new jsPDF({
          orientation: 'landscape',
          unit: 'mm',
          format: 'a4'
        });
        
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        
        // Calculate dimensions to fit the image
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const ratio = Math.min(pageWidth / imgWidth, pageHeight / imgHeight);
        
        const finalWidth = imgWidth * ratio * 0.95;
        const finalHeight = imgHeight * ratio * 0.95;
        
        // Center the image on the page
        const xOffset = (pageWidth - finalWidth) / 2;
        const yOffset = (pageHeight - finalHeight) / 2;
        
        doc.addImage(imgData, 'PNG', xOffset, yOffset, finalWidth, finalHeight);
        
        doc.save(`matricula-${formData.dni || 'registro'}.pdf`);
        
        toast({
          title: "¡PDF descargado!",
          description: "El archivo PDF se ha descargado correctamente.",
        });
      } catch (err) {
        toast({
          title: "Error",
          description: "No se pudo generar el PDF.",
          variant: "destructive",
        });
      }
    }
  };

  const handleCaptureImage = async () => {
    if (formRef.current) {
      try {
        // Force the element to render at full desktop width
        const element = formRef.current;
        const originalStyle = element.style.cssText;
        
        // Temporarily set fixed width for consistent capture
        element.style.width = '1200px';
        element.style.minWidth = '1200px';
        
        // Wait for styles to apply
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Capture with high quality settings
        const canvas = await html2canvas(element, {
          useCORS: true,
          allowTaint: true,
          logging: false,
          imageTimeout: 0,
          onclone: (clonedDoc) => {
            const clonedElement = clonedDoc.querySelector('[data-capture="true"]') as HTMLElement;
            if (clonedElement) {
              clonedElement.style.width = '1200px';
              clonedElement.style.display = 'flex';
              clonedElement.style.flexDirection = 'row';
            }
          }
        } as any);
        
        // Restore original styles
        element.style.cssText = originalStyle;
        
        const link = document.createElement('a');
        link.download = `registro-${formData.dni || 'matricula'}.png`;
        link.href = canvas.toDataURL('image/png', 1.0);
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

  const handlePrint = () => {
    window.print();
  };

  const handlePhotoCapture = async () => {
    if (mainRef.current) {
      try {
        // Create a wrapper div with white background and proper styling
        const wrapper = document.createElement('div');
        wrapper.style.cssText = 'position: absolute; left: -9999px; top: 0; width: 1200px; background: white; padding: 20px;';
        document.body.appendChild(wrapper);
        
        // Clone the main content
        const clone = mainRef.current.cloneNode(true) as HTMLElement;
        clone.style.width = '100%';
        wrapper.appendChild(clone);
        
        // Wait for rendering
        await new Promise(resolve => setTimeout(resolve, 200));
        
        const canvas = await html2canvas(wrapper, {
          useCORS: true,
          allowTaint: true,
          logging: false,
        } as any);
        
        // Remove the wrapper
        document.body.removeChild(wrapper);
        
        const link = document.createElement('a');
        link.download = `foto-registro-${formData.dni || 'matricula'}.png`;
        link.href = canvas.toDataURL('image/png', 1.0);
        link.click();
        
        toast({
          title: "¡Foto capturada!",
          description: "La imagen se ha descargado correctamente.",
        });
      } catch (err) {
        toast({
          title: "Error",
          description: "No se pudo capturar la foto.",
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
        <div ref={mainRef} className="bg-white p-6 rounded-lg">
          {/* Title */}
          <h2 className="font-heading text-2xl md:text-4xl font-extrabold text-primary mb-8 animate-fade-in">
            REGISTRO DE MATRÍCULA CCD 2026
          </h2>

          {/* Grid Layout */}
          <div ref={formRef} data-capture="true" className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white p-4 rounded-lg">
            {/* Left Section - Logo and QR */}
            <div className="lg:col-span-2 flex flex-col items-center gap-8">
              <CCDLogo />
              <div ref={qrRef}>
                <QRCodeSection dni={formData.dni} showQR={formData.dni.length >= 8} />
              </div>
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
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-primary py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <p className="text-primary-foreground/80 text-sm text-center mb-4">
            © 2026 Centro de Capacitación y Desarrollo CCD. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
