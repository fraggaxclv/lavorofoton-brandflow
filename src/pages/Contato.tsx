import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Phone, Mail, MapPin, Clock, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { 
  useFormSecurity, 
  validateEmail, 
  validatePhone, 
  validateRequired, 
  sanitizeInput 
} from "@/hooks/useFormSecurity";

const Contato = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    empresa: '',
    mensagem: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Security hook with rate limiting (3 submissions per hour)
  const { 
    honeypotValue, 
    setHoneypotValue, 
    incrementRateLimit, 
    canSubmit 
  } = useFormSecurity({
    maxAttempts: 3,
    windowMs: 60 * 60 * 1000, // 1 hour
    key: 'contact-form'
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: sanitizeInput(value) }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!validateRequired(formData.nome)) {
      newErrors.nome = 'Nome é obrigatório';
    }

    if (!validateRequired(formData.email)) {
      newErrors.email = 'Email é obrigatório';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!validateRequired(formData.telefone)) {
      newErrors.telefone = 'Telefone é obrigatório';
    } else if (!validatePhone(formData.telefone)) {
      newErrors.telefone = 'Telefone inválido. Use o formato (XX) XXXXX-XXXX';
    }

    if (!validateRequired(formData.mensagem)) {
      newErrors.mensagem = 'Mensagem é obrigatória';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Security checks
    const securityCheck = canSubmit();
    if (!securityCheck.allowed) {
      toast.error(securityCheck.error);
      return;
    }

    // Validate form
    if (!validateForm()) {
      toast.error('Por favor, corrija os erros no formulário.');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Increment rate limit
      incrementRateLimit();
      
      // Here you would send the data to your backend
      // For now, just show success message
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
      
      toast.success("Mensagem enviada! Retornaremos em breve.");
      
      // Reset form
      setFormData({
        nome: '',
        email: '',
        telefone: '',
        empresa: '',
        mensagem: ''
      });
    } catch {
      toast.error('Erro ao enviar mensagem. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="mt-16 pt-20 pb-12 bg-industrial-dark text-primary-foreground">
        <div className="container-lavoro text-center">
          <h1 className="mb-4">Contato</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Estamos prontos para atender. Fale com nossos especialistas.
          </p>
        </div>
      </section>

      {/* Contato Principal */}
      <section className="section-padding">
        <div className="container-lavoro">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Formulário */}
            <div>
              <h2 className="mb-6">Envie sua Mensagem</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Honeypot field - hidden from users, visible to bots */}
                <div className="absolute left-[-9999px] opacity-0 h-0 overflow-hidden" aria-hidden="true">
                  <label htmlFor="website_url">Website</label>
                  <input
                    type="text"
                    id="website_url"
                    name="website_url"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypotValue}
                    onChange={(e) => setHoneypotValue(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Nome Completo *</label>
                  <Input 
                    type="text" 
                    placeholder="Seu nome" 
                    value={formData.nome}
                    onChange={(e) => handleInputChange('nome', e.target.value)}
                    className={errors.nome ? 'border-destructive' : ''}
                    maxLength={100}
                    required 
                  />
                  {errors.nome && <p className="text-sm text-destructive mt-1">{errors.nome}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Email *</label>
                  <Input 
                    type="email" 
                    placeholder="seu@email.com" 
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={errors.email ? 'border-destructive' : ''}
                    maxLength={255}
                    required 
                  />
                  {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Telefone *</label>
                  <Input 
                    type="tel" 
                    placeholder="(31) 99999-9999" 
                    value={formData.telefone}
                    onChange={(e) => handleInputChange('telefone', e.target.value)}
                    className={errors.telefone ? 'border-destructive' : ''}
                    maxLength={20}
                    required 
                  />
                  {errors.telefone && <p className="text-sm text-destructive mt-1">{errors.telefone}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Empresa</label>
                  <Input 
                    type="text" 
                    placeholder="Nome da empresa (opcional)" 
                    value={formData.empresa}
                    onChange={(e) => handleInputChange('empresa', e.target.value)}
                    maxLength={100}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Mensagem *</label>
                  <Textarea 
                    placeholder="Como podemos ajudar?" 
                    rows={5} 
                    value={formData.mensagem}
                    onChange={(e) => handleInputChange('mensagem', e.target.value)}
                    className={errors.mensagem ? 'border-destructive' : ''}
                    maxLength={1000}
                    required 
                  />
                  {errors.mensagem && <p className="text-sm text-destructive mt-1">{errors.mensagem}</p>}
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-primary text-primary-foreground hover:bg-primary-dark text-lg py-6"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
                </Button>
              </form>
            </div>

            {/* Informações de Contato */}
            <div>
              <h2 className="mb-6">Fale Conosco</h2>
              <div className="space-y-6">
                {/* WhatsApp */}
                <div className="card-premium p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MessageSquare className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">WhatsApp</h3>
                      <p className="text-muted-foreground mb-2">(31) 99697-0656</p>
                      <a href="https://wa.me/5531996970656" target="_blank" rel="noopener noreferrer" className="text-primary font-semibold hover:underline">
                        Iniciar conversa →
                      </a>
                    </div>
                  </div>
                </div>

                {/* Telefone */}
                <div className="card-premium p-6">
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">Telefone</h3>
                      <a href="https://wa.me/5531996970656" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                        (31) 99697-0656
                      </a>
                      <p className="text-sm text-muted-foreground">Seg a Sex, 8h às 18h</p>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="card-premium p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">Email</h3>
                      <p className="text-muted-foreground">contato@lavorofoton.com.br</p>
                      <p className="text-sm text-muted-foreground">Resposta em até 24h</p>
                    </div>
                  </div>
                </div>

                {/* Localização */}
                <div className="card-premium p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">Localização</h3>
                      <p className="text-muted-foreground text-center">Rua Cornélio Vaz De Melo, 11 
Jardim Industrial  
Contagem, 
Minas Gerais, Brasil</p>
                      <p className="text-sm text-muted-foreground">Visite nossa concessionária</p>
                    </div>
                  </div>
                </div>

                {/* Horário */}
                <div className="card-premium p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">Horário</h3>
                      <p className="text-muted-foreground">Segunda a Sexta: 8h às 18h</p>
                      <p className="text-muted-foreground">Sábado: 8h às 12h</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Visita */}
      <section className="section-padding bg-industrial-light">
        <div className="container-lavoro text-center">
          <h2 className="mb-6">Prefere uma Visita Presencial?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Nossa equipe está pronta para recebê-lo. Conheça nossa estrutura e veja de perto os caminhões Foton.
          </p>
          <p className="text-lg font-semibold text-foreground">
            Agende sua visita pelo WhatsApp: <a href="https://wa.me/5531996970656" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">(31) 99697-0656</a>
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contato;
