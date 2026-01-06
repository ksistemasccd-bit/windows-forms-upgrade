import { CheckCircle2, Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import backgroundCcd from "@/assets/background-ccd.jpg";
const TermsPanel = () => {
  const terms = [
    "Incluye el certificado digital del CCD.",
    "Precio no incluye IGV.",
    "No se aceptan devoluciones de dinero.",
    "No transferible a otra persona.",
    "Las reprogramaciones de clases podrán ser solicitadas en caso de fuerza mayor, tales como situaciones imprevistas o emergencias. Nos comprometemos a informar con tiempo oportuno priorizando, agradecemos su comprensión y colaboración en estos casos.",
  ];

  return (
    <div className="relative overflow-hidden rounded-xl ccd-shadow h-full animate-slide-in-right terms-panel-capture" style={{ backgroundImage: `url(${backgroundCcd})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      {/* Overlay for contrast */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#003366]/90 via-[#004080]/90 to-[#0066a6]/90" />
      
      {/* Content */}
      <div className="relative z-10 p-8 h-full flex flex-col">
        {/* Header with Logo */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <img src="/logo-ccd-blanco.png" alt="CCD Logo" className="h-16" />
          </div>
          
          {/* Social Icons */}
          <div className="flex gap-3">
            <a href="#" className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/40 transition-colors">
              <Facebook className="w-4 h-4 text-white" />
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/40 transition-colors">
              <Linkedin className="w-4 h-4 text-white" />
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/40 transition-colors">
              <Youtube className="w-4 h-4 text-white" />
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/40 transition-colors">
              <Instagram className="w-4 h-4 text-white" />
            </a>
          </div>
        </div>

        {/* Welcome Text */}
        <div className="mb-6">
          <p className="text-white text-sm font-medium mb-1">
            BIENVENIDO AL CCD
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-white leading-tight">
            TÉRMINOS Y<br />CONDICIONES
          </h2>
        </div>

        {/* Terms List */}
        <div className="space-y-3 flex-1">
          {terms.map((term, index) => (
            <div key={index} className="flex gap-3">
              <CheckCircle2 className="w-5 h-5 text-ccd-gold flex-shrink-0 mt-0.5" />
              <p className="text-white text-sm leading-relaxed">
                {term}
              </p>
            </div>
          ))}
        </div>

        {/* Website */}
        <div className="mt-6 pt-4 border-t border-white/30">
          <p className="text-white text-sm text-center">
            www.ccdcapacitacion.edu.pe
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsPanel;
