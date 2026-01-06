import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Copy } from "lucide-react";
interface FormData {
  alumno: string;
  dni: string;
  curso: string;
  correo: string;
  celular: string;
}

interface RegistrationFormProps {
  onSubmit: (data: FormData) => void;
  formData: FormData;
  setFormData: (data: FormData) => void;
}

const RegistrationForm = ({ onSubmit, formData, setFormData }: RegistrationFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.alumno || !formData.dni || !formData.curso || !formData.correo || !formData.celular) {
      toast({
        title: "Error",
        description: "Por favor complete todos los campos",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Generar texto para copiar
    const registroTexto = `REGISTRO DE MATRÍCULA - CCD
================================
ALUMNO: ${formData.alumno}
DNI: ${formData.dni}
CURSO: ${formData.curso}
CORREO: ${formData.correo}
CELULAR: ${formData.celular}
================================
Fecha: ${new Date().toLocaleDateString('es-PE')}`;
    
    // Copiar al portapapeles
    try {
      await navigator.clipboard.writeText(registroTexto);
      toast({
        title: "¡Registro copiado!",
        description: "Los datos han sido copiados al portapapeles. Puede pegarlos donde desee.",
      });
    } catch (err) {
      toast({
        title: "¡Registro exitoso!",
        description: "La matrícula ha sido registrada correctamente",
      });
    }
    
    onSubmit(formData);
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 animate-fade-in">
      <div className="space-y-2">
        <Label htmlFor="alumno" className="text-foreground font-semibold">
          ALUMNO :
        </Label>
        <Input
          id="alumno"
          name="alumno"
          value={formData.alumno}
          onChange={handleChange}
          className="ccd-input"
          placeholder="Nombre completo del alumno"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="dni" className="text-foreground font-semibold">
          DNI :
        </Label>
        <Input
          id="dni"
          name="dni"
          value={formData.dni}
          onChange={handleChange}
          className="ccd-input"
          placeholder="Documento de identidad"
          maxLength={8}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="curso" className="text-foreground font-semibold">
          CURSO :
        </Label>
        <Input
          id="curso"
          name="curso"
          value={formData.curso}
          onChange={handleChange}
          className="ccd-input"
          placeholder="Nombre del curso"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="correo" className="text-foreground font-semibold">
          CORREO :
        </Label>
        <Input
          id="correo"
          name="correo"
          type="email"
          value={formData.correo}
          onChange={handleChange}
          className="ccd-input"
          placeholder="correo@ejemplo.com"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="celular" className="text-foreground font-semibold">
          CELULAR :
        </Label>
        <Input
          id="celular"
          name="celular"
          value={formData.celular}
          onChange={handleChange}
          className="ccd-input"
          placeholder="Número de celular"
          maxLength={9}
        />
      </div>

      <Button
        type="button"
        onClick={() => window.print()}
        className="w-full ccd-gradient text-primary-foreground font-heading font-bold py-6 text-lg hover:opacity-90 transition-opacity mt-6"
      >
        MATRÍCULA EXITOSA
      </Button>
    </form>
  );
};

export default RegistrationForm;
