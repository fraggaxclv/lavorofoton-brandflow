import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CheckCircle, ArrowRight, Truck, Wrench, Gauge, Zap, Shield, Users } from "lucide-react";
import foton1217 from "@/assets/foton-1217.jpg";
import cumminsLogo from "@/assets/cummins-logo.png";
import zfLogo from "@/assets/zf-logo.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().trim().min(1, { message: "Nome é obrigatório" }).max(100),
  whatsapp: z.string().trim().min(1, { message: "WhatsApp é obrigatório" }).max(20),
  city: z.string().trim().min(1, { message: "Cidade/Estado é obrigatório" }).max(100),
  operationType: z.string().trim().max(200),
  currentDemand: z.string().trim().max(500),
});

const Foton1217 = () => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      whatsapp: "",
      city: "",
      operationType: "",
      currentDemand: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const message = `*Nova Solicitação - Foton 1217*\n\nNome: ${values.name}\nWhatsApp: ${values.whatsapp}\nCidade/Estado: ${values.city}\nTipo de operação: ${values.operationType}\nDemanda atual: ${values.currentDemand}`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/5531999998888?text=${encodedMessage}`, "_blank");
    
    toast({
      title: "Redirecionando para WhatsApp",
      description: "Você será atendido em breve!",
    });
    
    form.reset();
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="mt-16 pt-20 pb-16 bg-gradient-to-br from-industrial-dark via-industrial-dark to-industrial-darker">
        <div className="container-lavoro">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-primary-foreground">
              <h1 className="mb-6 text-5xl md:text-6xl font-bold leading-tight">
                Foton 1217. O melhor três-quartos do mercado.
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8">
                Mais força, mais capacidade, mais tecnologia. O caminhão que domina o segmento 3/4 com autoridade.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <Button size="lg" className="text-lg" asChild>
                  <a href="#contato">Solicitar Proposta</a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg border-2 border-primary-foreground bg-background/10 hover:bg-primary-foreground hover:text-foreground text-primary-foreground"
                  asChild
                >
                  <a href="https://wa.me/5531999998888" target="_blank" rel="noopener noreferrer">
                    Falar no WhatsApp
                  </a>
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Atendimento rápido, direto com um consultor Lavoro.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-[var(--shadow-strong)]">
              <img src={foton1217} alt="Foton 1217 - O melhor três-quartos do mercado" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Seção 1 - Por que é o melhor */}
      <section className="section-padding">
        <div className="container-lavoro">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="mb-8">O três-quartos que entrega mais onde importa.</h2>
            <div className="space-y-6 text-lg text-muted-foreground">
              <p>
                O Foton 1217 não concorre. <strong className="text-foreground">Ele lidera.</strong>
              </p>
              <p>
                É o caminhão 3/4 com o conjunto mecânico mais respeitado do segmento e a maior capacidade de carga entre seus concorrentes.
              </p>
              <p className="text-xl font-semibold text-foreground">
                Se o negócio exige força real, tecnologia confiável e custo operacional inteligente, o 1217 é a escolha óbvia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Seção 2 - Diferenciais */}
      <section className="section-padding bg-industrial-light">
        <div className="container-lavoro">
          <h2 className="mb-12 text-center">Diferenciais que ninguém iguala</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Diferencial 1 */}
            <div className="card-premium p-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Truck className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">Carrega até 1 tonelada a mais que a concorrência</h3>
              </div>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span>Mais carga por viagem.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span>Mais eficiência na rota.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span>Mais lucro por dia.</span>
                </li>
              </ul>
              <p className="mt-4 font-semibold text-foreground">
                A diferença se paga sozinha na operação.
              </p>
            </div>

            {/* Diferencial 2 */}
            <div className="card-premium p-8">
              <div className="flex items-start gap-4 mb-4">
                <img src={cumminsLogo} alt="Cummins" className="w-16 h-16 object-contain" />
                <h3 className="text-2xl font-bold">Motor Cummins</h3>
              </div>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span>Confiabilidade global.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span>Resposta rápida.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span>Excelente desempenho.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span>Economia real no dia a dia.</span>
                </li>
              </ul>
              <p className="mt-4 font-semibold text-foreground">
                É motor de respeito — para quem trabalha de verdade.
              </p>
            </div>

            {/* Diferencial 3 */}
            <div className="card-premium p-8">
              <div className="flex items-start gap-4 mb-4">
                <img src={zfLogo} alt="ZF" className="w-16 h-16 object-contain" />
                <h3 className="text-2xl font-bold">Câmbio ZF</h3>
              </div>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span>Precisão alemã.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span>Trocas suaves.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span>Menor fadiga para o motorista.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span>Mais controle nas manobras.</span>
                </li>
              </ul>
              <p className="mt-4 font-semibold text-foreground">
                O casamento perfeito com o motor Cummins.
              </p>
            </div>

            {/* Diferencial 4 */}
            <div className="card-premium p-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Zap className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">Injeção eletrônica Bosch</h3>
              </div>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span>Mais eficiência.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span>Mais economia.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span>Mais estabilidade.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span>Menor manutenção preventiva.</span>
                </li>
              </ul>
              <p className="mt-4 font-semibold text-foreground">
                Tecnologia que transforma combustível em performance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Seção 3 - Conjunto mais forte */}
      <section className="section-padding">
        <div className="container-lavoro">
          <div className="max-w-5xl mx-auto">
            <h2 className="mb-12 text-center">A soma que faz o 1217 ser imbatível.</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="card-premium p-6 text-center">
                <CheckCircle className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-bold text-lg">Motor Cummins</h3>
              </div>
              <div className="card-premium p-6 text-center">
                <CheckCircle className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-bold text-lg">Câmbio ZF</h3>
              </div>
              <div className="card-premium p-6 text-center">
                <CheckCircle className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-bold text-lg">Injeção Bosch</h3>
              </div>
              <div className="card-premium p-6 text-center">
                <CheckCircle className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-bold text-lg">+1 tonelada de capacidade</h3>
              </div>
            </div>
            <p className="text-center text-xl text-muted-foreground max-w-3xl mx-auto">
              Nenhum outro caminhão da categoria entrega esse conjunto.
              <br />
              <strong className="text-foreground">É força, confiabilidade e custo-benefício em um único veículo.</strong>
            </p>
          </div>
        </div>
      </section>

      {/* Seção 4 - Aplicações */}
      <section className="section-padding bg-industrial-light">
        <div className="container-lavoro">
          <h2 className="mb-8 text-center">Versátil para qualquer tipo de trabalho.</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="card-premium p-6">
              <Truck className="w-10 h-10 text-primary mb-3" />
              <h3 className="font-bold text-lg mb-2">Distribuição urbana</h3>
            </div>
            <div className="card-premium p-6">
              <Gauge className="w-10 h-10 text-primary mb-3" />
              <h3 className="font-bold text-lg mb-2">Logística regional</h3>
            </div>
            <div className="card-premium p-6">
              <Shield className="w-10 h-10 text-primary mb-3" />
              <h3 className="font-bold text-lg mb-2">Atacarejo e varejo</h3>
            </div>
            <div className="card-premium p-6">
              <Zap className="w-10 h-10 text-primary mb-3" />
              <h3 className="font-bold text-lg mb-2">E-commerce e marketplace</h3>
            </div>
            <div className="card-premium p-6">
              <Users className="w-10 h-10 text-primary mb-3" />
              <h3 className="font-bold text-lg mb-2">Empresas de frota</h3>
            </div>
            <div className="card-premium p-6">
              <Wrench className="w-10 h-10 text-primary mb-3" />
              <h3 className="font-bold text-lg mb-2">Transportadores autônomos</h3>
            </div>
          </div>
          <div className="text-center">
            <p className="text-lg text-muted-foreground mb-4">
              <strong className="text-foreground">Implementos:</strong> baú, carga seca, refrigerado, basculante, plataforma
            </p>
            <p className="text-xl font-semibold text-foreground">
              Se precisa carregar mais, rodar mais e gastar menos — o 1217 faz.
            </p>
          </div>
        </div>
      </section>

      {/* Seção 5 - Ficha técnica */}
      <section className="section-padding">
        <div className="container-lavoro">
          <h2 className="mb-12 text-center">Ficha Técnica</h2>
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="card-premium p-6">
              <div className="text-4xl font-bold text-primary mb-2">—</div>
              <div className="text-muted-foreground">PBT</div>
            </div>
            <div className="card-premium p-6">
              <div className="text-4xl font-bold text-primary mb-2">—</div>
              <div className="text-muted-foreground">Potência</div>
            </div>
            <div className="card-premium p-6">
              <div className="text-4xl font-bold text-primary mb-2">—</div>
              <div className="text-muted-foreground">Torque</div>
            </div>
            <div className="card-premium p-6">
              <div className="text-4xl font-bold text-primary mb-2">+1t</div>
              <div className="text-muted-foreground">Acima da concorrência</div>
            </div>
            <div className="card-premium p-6">
              <div className="text-4xl font-bold text-primary mb-2">—</div>
              <div className="text-muted-foreground">Entre eixos</div>
            </div>
            <div className="card-premium p-6">
              <div className="text-4xl font-bold text-primary mb-2">—</div>
              <div className="text-muted-foreground">Dimensões</div>
            </div>
          </div>
          <p className="text-center text-sm text-muted-foreground mt-8">
            Valores técnicos completos podem ser ajustados conforme ficha oficial Foton.
          </p>
        </div>
      </section>

      {/* Seção 6 - Comparativo */}
      <section className="section-padding bg-industrial-light">
        <div className="container-lavoro">
          <div className="max-w-4xl mx-auto">
            <h2 className="mb-8 text-center">Onde outros três-quartos chegam no limite, o 1217 começa a trabalhar.</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <span className="text-lg">Mais capacidade de carga</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <span className="text-lg">Conjunto mecânico superior (Cummins + ZF + Bosch)</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <span className="text-lg">Melhor equilíbrio entre potência e consumo</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <span className="text-lg">Cabine confortável e durável</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <span className="text-lg">Manobrabilidade excelente</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <span className="text-lg">Confiabilidade operacional diária</span>
              </div>
            </div>
            <p className="text-center text-2xl font-bold text-primary">
              O três-quartos que tem cara de médio e preço de leve.
            </p>
          </div>
        </div>
      </section>

      {/* Seção 7 - Lavoro Foton */}
      <section className="section-padding">
        <div className="container-lavoro">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="mb-8">A concessionária que entrega mais do que caminhões.</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="card-premium p-6 text-left">
                <CheckCircle className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-bold text-lg mb-2">Atendimento consultivo</h3>
              </div>
              <div className="card-premium p-6 text-left">
                <CheckCircle className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-bold text-lg mb-2">Entendimento do negócio antes da proposta</h3>
              </div>
              <div className="card-premium p-6 text-left">
                <CheckCircle className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-bold text-lg mb-2">Suporte técnico e pós-venda presentes</h3>
              </div>
              <div className="card-premium p-6 text-left">
                <CheckCircle className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-bold text-lg mb-2">Condições especiais de financiamento</h3>
              </div>
              <div className="card-premium p-6 text-left md:col-span-2">
                <CheckCircle className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-bold text-lg mb-2">Parceria real no crescimento do cliente</h3>
              </div>
            </div>
            <p className="text-lg text-muted-foreground italic">
              Aqui, cada caminhão entregue carrega a nossa reputação.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Final com Formulário */}
      <section id="contato" className="section-padding bg-gradient-to-br from-industrial-dark to-industrial-darker text-primary-foreground">
        <div className="container-lavoro">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="mb-6">Pronto para colocar o melhor três-quartos do mercado na sua operação?</h2>
            <p className="text-xl text-muted-foreground">
              Fale agora com um consultor da Lavoro Foton e descubra a condição ideal para o seu 1217.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="card-premium p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome</FormLabel>
                        <FormControl>
                          <Input placeholder="Seu nome completo" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="whatsapp"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>WhatsApp</FormLabel>
                        <FormControl>
                          <Input placeholder="(00) 00000-0000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cidade/Estado</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: Belo Horizonte/MG" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="operationType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tipo de operação</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: Distribuição urbana, logística" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="currentDemand"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Demanda atual</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Conte-nos sobre sua necessidade..."
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button type="submit" size="lg" className="flex-1">
                      Quero uma proposta agora
                    </Button>
                    <Button
                      type="button"
                      size="lg"
                      variant="outline"
                      className="flex-1"
                      asChild
                    >
                      <a href="https://wa.me/5531999998888" target="_blank" rel="noopener noreferrer">
                        Falar no WhatsApp
                      </a>
                    </Button>
                  </div>

                  <p className="text-center text-sm text-muted-foreground">
                    Atendimento rápido. Sem complicação. Sem enrolação.
                  </p>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Foton1217;
