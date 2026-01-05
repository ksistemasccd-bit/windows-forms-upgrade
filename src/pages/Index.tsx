import { useState } from "react";
import CCDLogo from "@/components/CCDLogo";
import RegistrationForm from "@/components/RegistrationForm";
import TermsPanel from "@/components/TermsPanel";
import QRCodeSection from "@/components/QRCodeSection";

interface FormData {
  alumno: string;
  dni: string;
  curso: string;
  correo: string;
  celular: string;
}

const Index = () => {
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
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
      <footer className="bg-primary py-4 mt-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
          <p className="text-primary-foreground/80 text-sm">
            © 2026 Centro de Capacitación y Desarrollo CCD. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
