import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Phone, Mail, MapPin, Clock, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
const Contato = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Mensagem enviada! Retornaremos em breve.");
  };
  return <div className="min-h-screen">
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
                <div>
                  <label className="block text-sm font-medium mb-2">Nome Completo</label>
                  <Input type="text" placeholder="Seu nome" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <Input type="email" placeholder="seu@email.com" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Telefone</label>
                  <Input type="tel" placeholder="(31) 99999-9999" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Empresa</label>
                  <Input type="text" placeholder="Nome da empresa (opcional)" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Mensagem</label>
                  <Textarea placeholder="Como podemos ajudar?" rows={5} required />
                </div>
                <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary-dark text-lg py-6">
                  Enviar Mensagem
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
                      <p className="text-muted-foreground mb-2">(31) 2116-4735</p>
                      <a href="https://wa.me/553121164735" target="_blank" rel="noopener noreferrer" className="text-primary font-semibold hover:underline">
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
                      <a href="https://wa.me/553121164735" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                        (31) 2116-4735
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
            Agende sua visita pelo WhatsApp: <a href="https://wa.me/553121164735" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">(31) 2116-4735</a>
          </p>
        </div>
      </section>

      <Footer />
    </div>;
};
export default Contato;