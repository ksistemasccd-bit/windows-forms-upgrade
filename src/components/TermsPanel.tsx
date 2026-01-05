import { CheckCircle2, Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import bannerImage from "@/assets/banner-ccd.jpg";

const TermsPanel = () => {
  const terms = [
    "Incluye el certificado digital del CCD.",
    "Precio no incluye IGV.",
    "No se aceptan devoluciones de dinero.",
    "No transferible a otra persona.",
    "Las reprogramaciones de clases podrán ser solicitadas en caso de fuerza mayor, tales como situaciones imprevistas o emergencias. Nos comprometemos a informar con tiempo oportuno priorizando, agradecemos su comprensión y colaboración en estos casos.",
  ];

  return (
    <div className="relative overflow-hidden rounded-xl ccd-shadow h-full animate-slide-in-right">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bannerImage})` }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/80 to-transparent" />
      
      {/* Content */}
      <div className="relative z-10 p-8 h-full flex flex-col">
        {/* Header with Logo */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full ccd-gradient flex items-center justify-center">
              <span className="text-primary-foreground font-heading font-bold text-sm">CCD</span>
            </div>
          </div>
          
          {/* Social Icons */}
          <div className="flex gap-3">
            <a href="#" className="w-8 h-8 rounded-full bg-card/20 flex items-center justify-center hover:bg-card/40 transition-colors">
              <Facebook className="w-4 h-4 text-primary-foreground" />
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-card/20 flex items-center justify-center hover:bg-card/40 transition-colors">
              <Linkedin className="w-4 h-4 text-primary-foreground" />
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-card/20 flex items-center justify-center hover:bg-card/40 transition-colors">
              <Youtube className="w-4 h-4 text-primary-foreground" />
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-card/20 flex items-center justify-center hover:bg-card/40 transition-colors">
              <Instagram className="w-4 h-4 text-primary-foreground" />
            </a>
          </div>
        </div>

        {/* Welcome Text */}
        <div className="mb-6">
          <p className="text-primary-foreground/80 text-sm font-medium mb-1">
            BIENVENIDO AL CCD
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-primary-foreground leading-tight">
            TÉRMINOS Y<br />CONDICIONES
          </h2>
        </div>

        {/* Terms List */}
        <div className="space-y-3 flex-1">
          {terms.map((term, index) => (
            <div key={index} className="flex gap-3">
              <CheckCircle2 className="w-5 h-5 text-ccd-gold flex-shrink-0 mt-0.5" />
              <p className="text-primary-foreground/90 text-sm leading-relaxed">
                {term}
              </p>
            </div>
          ))}
        </div>

        {/* Website */}
        <div className="mt-6 pt-4 border-t border-primary-foreground/20">
          <p className="text-primary-foreground/70 text-sm text-center">
            www.ccdcapacitacion.edu.pe
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsPanel;
