import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  TrendingUp, 
  FileText, 
  Target, 
  CheckCircle2, 
  Shield, 
  Upload,
  Building2,
  Truck,
  DollarSign,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import logoFotonLavoro from "@/assets/logo-foton-lavoro.png";

const DiagnosticoFrota = () => {
  const { toast } = useToast();
  const [currentBlock, setCurrentBlock] = useState(0);
  const [formData, setFormData] = useState({
    // Bloco 1
    cnpj: "",
    razaoSocial: "",
    nomeResponsavel: "",
    telefoneWhatsapp: "",
    emailResponsavel: "",
    telefone: "",
    estado: "",
    segmento: "",
    // Bloco 2
    qtdVeiculos: "",
    tiposVeiculos: "",
    idadeMedia: "",
    operacao: "",
    kmMes: "",
    marcasAtuais: "",
    // Bloco 3
    faturamento: "",
    margem: "",
    bancosUsados: "",
    financiamentosAtivos: "",
    // Bloco 4
    modelosDesejados: "",
    qtdDesejada: "",
    prazo: "",
    usoOperacional: "",
    // Bloco 5
    urgencia: "",
  });

  const [uploadedFiles, setUploadedFiles] = useState<{[key: string]: File}>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (key: string, file: File | null) => {
    if (file) {
      setUploadedFiles(prev => ({ ...prev, [key]: file }));
    }
  };

  const handleSubmit = () => {
    toast({
      title: "Diagnóstico enviado!",
      description: "Nas próximas horas você receberá uma análise completa da sua operação, preparada sob medida pela equipe Lavoro Foton.",
      duration: 6000,
    });
    
    // Aqui você pode integrar com backend/API
    console.log("Form Data:", formData);
    console.log("Uploaded Files:", uploadedFiles);
  };

  const beneficios = [
    "Pré-análise de crédito que aumenta a chance de aprovação",
    "Proposta personalizada em vez de improviso",
    "Estudo de economia por km",
    "Simulação de expansão com impacto real no caixa",
    "Economia de tempo na negociação",
    "Prioridade na disponibilidade dos veículos",
    "Análise consultiva de 40 anos de experiência no setor"
  ];

  const scrollToForm = () => {
    const formSection = document.getElementById('formulario');
    formSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* HERO */}
      <section className="relative gradient-hero text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
        
        <div className="container-lavoro relative z-10 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center space-y-6 md:space-y-8">
            {/* Logo Lavoro Foton */}
            <div className="flex justify-center mb-4 animate-fade-in">
              <img src={logoFotonLavoro} alt="Lavoro Foton" className="h-14 md:h-20 w-auto" />
            </div>
            
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Análise Estratégica Gratuita</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Todo grande crescimento começa com uma decisão inteligente.
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.3s' }}>
              Receba uma análise completa da sua frota, das suas rotas e do seu potencial de crédito — antes mesmo de conversarmos.
            </p>
            
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 md:p-8 max-w-2xl mx-auto text-left animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <p className="text-white/90 leading-relaxed space-y-2">
                <span className="block">Empresas que expandem rápido não improvisam.</span>
                <span className="block">Elas se preparam, analisam e tomam decisões com dados.</span>
                <span className="block font-semibold text-white">Este diagnóstico coloca você nessa categoria.</span>
              </p>
            </div>
            
            <Button 
              size="lg" 
              onClick={scrollToForm}
              className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6 h-auto shadow-2xl animate-fade-in group"
              style={{ animationDelay: '0.5s' }}
            >
              Iniciar Diagnóstico Estratégico
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      {/* RECONHECIMENTO */}
      <section className="section-padding bg-muted/30">
        <div className="container-lavoro">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                  Você já sabe: a logística não perdoa improviso.
                </h2>
                
                <div className="space-y-4 text-lg text-muted-foreground">
                  <p className="flex items-start gap-3">
                    <span className="text-destructive mt-1">•</span>
                    <span>Custos subindo.</span>
                  </p>
                  <p className="flex items-start gap-3">
                    <span className="text-destructive mt-1">•</span>
                    <span>Crédito difícil.</span>
                  </p>
                  <p className="flex items-start gap-3">
                    <span className="text-destructive mt-1">•</span>
                    <span>Veículos parados por manutenção.</span>
                  </p>
                  <p className="flex items-start gap-3">
                    <span className="text-destructive mt-1">•</span>
                    <span>Operação disputando centavos no km rodado.</span>
                  </p>
                </div>
                
                <p className="text-lg font-semibold text-foreground pt-4 border-t border-border">
                  Os empresários que crescem encontraram um padrão:
                  <span className="block text-primary mt-2">eles antecipam informações e negociam com preparo.</span>
                </p>
              </div>
              
              <div className="relative">
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border-2 border-primary/20 flex items-center justify-center">
                  <Truck className="w-32 h-32 text-primary/40" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PONTO DE VIRADA */}
      <section className="section-padding">
        <div className="container-lavoro">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Target className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">A Revelação</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              Existe uma forma muito mais inteligente de negociar sua próxima frota.
            </h2>
            
            <div className="bg-card border border-border rounded-2xl p-8 md:p-12 text-left space-y-6 shadow-xl">
              <p className="text-lg md:text-xl leading-relaxed">
                Antes mesmo de você falar com um consultor,
                <span className="font-semibold text-foreground"> a equipe da Lavoro analisa sua empresa, seu faturamento, sua frota atual e sua capacidade de crédito.</span>
              </p>
              
              <p className="text-lg md:text-xl leading-relaxed text-primary font-semibold">
                Quando você chega para conversar, já existe uma proposta pensada exclusivamente para você.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFÍCIOS */}
      <section className="section-padding bg-muted/30">
        <div className="container-lavoro">
          <div className="max-w-5xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                Por que o Diagnóstico Estratégico funciona tão bem?
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {beneficios.map((beneficio, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-4 p-6 bg-card border border-border rounded-xl hover:shadow-lg transition-all hover:scale-105 group"
                >
                  <div className="flex-shrink-0">
                    <CheckCircle2 className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                  </div>
                  <p className="text-base md:text-lg leading-relaxed">{beneficio}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FORMULÁRIO */}
      <section id="formulario" className="section-padding">
        <div className="container-lavoro">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-6 mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                Complete seu Diagnóstico Estratégico
              </h2>
              <p className="text-lg text-muted-foreground">
                Cada informação aumenta a precisão da sua análise
              </p>
            </div>

            {/* BLOCO 1 - Perfil da Empresa */}
            <div className="space-y-8">
              <div className="bg-card border-2 border-primary/20 rounded-2xl p-6 md:p-8 space-y-6 shadow-xl">
                <div className="flex items-center gap-3 pb-4 border-b border-border">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Perfil da Empresa</h3>
                    <p className="text-sm text-muted-foreground">Entender sua estrutura permite uma análise mais precisa</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cnpj">CNPJ *</Label>
                    <Input 
                      id="cnpj"
                      placeholder="00.000.000/0000-00"
                      value={formData.cnpj}
                      onChange={(e) => handleInputChange('cnpj', e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="razaoSocial">Razão Social *</Label>
                    <Input 
                      id="razaoSocial"
                      placeholder="Nome da empresa"
                      value={formData.razaoSocial}
                      onChange={(e) => handleInputChange('razaoSocial', e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="nomeResponsavel">Nome do Responsável *</Label>
                    <Input 
                      id="nomeResponsavel"
                      placeholder="Nome completo"
                      value={formData.nomeResponsavel}
                      onChange={(e) => handleInputChange('nomeResponsavel', e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="telefoneWhatsapp">Telefone com WhatsApp *</Label>
                    <Input 
                      id="telefoneWhatsapp"
                      placeholder="(00) 00000-0000"
                      value={formData.telefoneWhatsapp}
                      onChange={(e) => handleInputChange('telefoneWhatsapp', e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="emailResponsavel">E-mail *</Label>
                    <Input 
                      id="emailResponsavel"
                      type="email"
                      placeholder="seuemail@empresa.com"
                      value={formData.emailResponsavel}
                      onChange={(e) => handleInputChange('emailResponsavel', e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="telefone">Telefone Empresa</Label>
                    <Input 
                      id="telefone"
                      placeholder="(00) 00000-0000"
                      value={formData.telefone}
                      onChange={(e) => handleInputChange('telefone', e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="estado">Estado *</Label>
                    <Select onValueChange={(value) => handleInputChange('estado', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="MG">Minas Gerais</SelectItem>
                        <SelectItem value="SP">São Paulo</SelectItem>
                        <SelectItem value="RJ">Rio de Janeiro</SelectItem>
                        <SelectItem value="ES">Espírito Santo</SelectItem>
                        <SelectItem value="outro">Outro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="segmento">Segmento de Atuação *</Label>
                    <Input 
                      id="segmento"
                      placeholder="Ex: Distribuição, Mudanças, Agricultura..."
                      value={formData.segmento}
                      onChange={(e) => handleInputChange('segmento', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* BLOCO 2 - Frota Atual */}
              <div className="bg-card border-2 border-primary/20 rounded-2xl p-6 md:p-8 space-y-6 shadow-xl">
                <div className="flex items-center gap-3 pb-4 border-b border-border">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Truck className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Frota Atual</h3>
                    <p className="text-sm text-muted-foreground">Aqui analisamos custo por km e vida útil operacional</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="qtdVeiculos">Quantidade de Veículos</Label>
                    <Input 
                      id="qtdVeiculos"
                      type="number"
                      placeholder="Ex: 5"
                      value={formData.qtdVeiculos}
                      onChange={(e) => handleInputChange('qtdVeiculos', e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="tiposVeiculos">Tipos de Veículos</Label>
                    <Input 
                      id="tiposVeiculos"
                      placeholder="Ex: 3/4, Toco, Truck..."
                      value={formData.tiposVeiculos}
                      onChange={(e) => handleInputChange('tiposVeiculos', e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="idadeMedia">Idade Média da Frota</Label>
                    <Input 
                      id="idadeMedia"
                      placeholder="Ex: 5 anos"
                      value={formData.idadeMedia}
                      onChange={(e) => handleInputChange('idadeMedia', e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="kmMes">Km/Mês (média)</Label>
                    <Input 
                      id="kmMes"
                      placeholder="Ex: 5000 km/mês"
                      value={formData.kmMes}
                      onChange={(e) => handleInputChange('kmMes', e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="operacao">Tipo de Operação</Label>
                    <Input 
                      id="operacao"
                      placeholder="Ex: Urbana, rodoviária, mista..."
                      value={formData.operacao}
                      onChange={(e) => handleInputChange('operacao', e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="marcasAtuais">Marcas Atuais</Label>
                    <Input 
                      id="marcasAtuais"
                      placeholder="Ex: Mercedes, Volkswagen..."
                      value={formData.marcasAtuais}
                      onChange={(e) => handleInputChange('marcasAtuais', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* BLOCO 3 - Indicadores Financeiros */}
              <div className="bg-card border-2 border-primary/20 rounded-2xl p-6 md:p-8 space-y-6 shadow-xl">
                <div className="flex items-center gap-3 pb-4 border-b border-border">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Indicadores Financeiros</h3>
                    <p className="text-sm text-muted-foreground">Esses dados ampliam suas chances de crédito e condições melhores</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="faturamento">Faturamento Mensal Aproximado</Label>
                    <Select onValueChange={(value) => handleInputChange('faturamento', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ate-50k">Até R$ 50.000</SelectItem>
                        <SelectItem value="50k-100k">R$ 50.000 - R$ 100.000</SelectItem>
                        <SelectItem value="100k-300k">R$ 100.000 - R$ 300.000</SelectItem>
                        <SelectItem value="300k-500k">R$ 300.000 - R$ 500.000</SelectItem>
                        <SelectItem value="acima-500k">Acima de R$ 500.000</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="margem">Margem Aproximada</Label>
                    <Select onValueChange={(value) => handleInputChange('margem', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ate-5">Até 5%</SelectItem>
                        <SelectItem value="5-10">5% - 10%</SelectItem>
                        <SelectItem value="10-20">10% - 20%</SelectItem>
                        <SelectItem value="acima-20">Acima de 20%</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="bancosUsados">Bancos que Você Usa</Label>
                    <Input 
                      id="bancosUsados"
                      placeholder="Ex: Banco do Brasil, Bradesco..."
                      value={formData.bancosUsados}
                      onChange={(e) => handleInputChange('bancosUsados', e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="financiamentosAtivos">Financiamentos Ativos?</Label>
                    <Textarea 
                      id="financiamentosAtivos"
                      placeholder="Descreva brevemente..."
                      value={formData.financiamentosAtivos}
                      onChange={(e) => handleInputChange('financiamentosAtivos', e.target.value)}
                      rows={3}
                    />
                  </div>
                </div>
              </div>

              {/* BLOCO 4 - Intenção de Expansão */}
              <div className="bg-card border-2 border-primary/20 rounded-2xl p-6 md:p-8 space-y-6 shadow-xl">
                <div className="flex items-center gap-3 pb-4 border-b border-border">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Intenção de Expansão</h3>
                    <p className="text-sm text-muted-foreground">Planejamos o que faz sentido para o seu crescimento — sem exageros</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="modelosDesejados">Modelos Desejados</Label>
                    <Input 
                      id="modelosDesejados"
                      placeholder="Ex: Aumark S315, Tunland V9..."
                      value={formData.modelosDesejados}
                      onChange={(e) => handleInputChange('modelosDesejados', e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="qtdDesejada">Quantidade Desejada</Label>
                    <Input 
                      id="qtdDesejada"
                      type="number"
                      placeholder="Ex: 3"
                      value={formData.qtdDesejada}
                      onChange={(e) => handleInputChange('qtdDesejada', e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="prazo">Prazo Pretendido</Label>
                    <Select onValueChange={(value) => handleInputChange('prazo', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="24">24 meses</SelectItem>
                        <SelectItem value="36">36 meses</SelectItem>
                        <SelectItem value="48">48 meses</SelectItem>
                        <SelectItem value="60">60 meses</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="usoOperacional">Uso Operacional Pretendido</Label>
                    <Textarea 
                      id="usoOperacional"
                      placeholder="Descreva como pretende usar os veículos..."
                      value={formData.usoOperacional}
                      onChange={(e) => handleInputChange('usoOperacional', e.target.value)}
                      rows={3}
                    />
                  </div>
                </div>
              </div>

              {/* BLOCO 5 - Upload de Documentos */}
              <div className="bg-card border-2 border-primary/20 rounded-2xl p-6 md:p-8 space-y-6 shadow-xl">
                <div className="flex items-center gap-3 pb-4 border-b border-border">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Upload de Documentos</h3>
                    <p className="text-sm text-muted-foreground">Aumente até 3x suas chances de aprovação enviando seus documentos</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    { key: 'comprovante', label: 'Comprovante de Endereço' },
                    { key: 'extratos', label: 'Extratos dos Últimos 90 Dias' },
                    { key: 'balanco', label: 'Balanço / DRE' },
                    { key: 'contrato', label: 'Contrato Social' },
                    { key: 'documentos', label: 'Documentos dos Sócios' },
                  ].map((doc) => (
                    <div key={doc.key} className="flex items-center justify-between p-4 border border-border rounded-lg hover:border-primary/50 transition-colors">
                      <Label htmlFor={doc.key} className="cursor-pointer flex items-center gap-2 flex-1">
                        <Upload className="w-4 h-4 text-muted-foreground" />
                        <span>{doc.label}</span>
                        {uploadedFiles[doc.key] && (
                          <span className="text-xs text-primary">({uploadedFiles[doc.key].name})</span>
                        )}
                      </Label>
                      <Input 
                        id={doc.key}
                        type="file"
                        className="hidden"
                        onChange={(e) => handleFileUpload(doc.key, e.target.files?.[0] || null)}
                      />
                      <Button variant="outline" size="sm" asChild>
                        <label htmlFor={doc.key} className="cursor-pointer">
                          Escolher arquivo
                        </label>
                      </Button>
                    </div>
                  ))}
                </div>

                <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg border border-border">
                  <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground">
                    Seus dados são tratados com estrita confidencialidade e criptografia avançada. Apenas o setor financeiro da Lavoro tem acesso aos documentos enviados.
                  </p>
                </div>
              </div>

              {/* URGÊNCIA */}
              <div className="bg-gradient-to-br from-primary/5 to-primary/10 border-2 border-primary/30 rounded-2xl p-6 md:p-8 space-y-6 shadow-xl">
                <h3 className="text-2xl font-bold text-center">
                  Quanto antes você agir, mais cedo aparece a solução.
                </h3>
                
                <div className="space-y-2">
                  <Label className="text-base font-semibold">Qual o seu nível de urgência para ampliar a frota?</Label>
                  <Select onValueChange={(value) => handleInputChange('urgencia', value)}>
                    <SelectTrigger className="bg-background">
                      <SelectValue placeholder="Selecione seu nível de urgência" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="alta">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-red-500"></div>
                          <span className="font-semibold text-red-600">Alta</span>
                          <span className="text-muted-foreground">(preciso imediatamente)</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="media">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                          <span className="font-semibold text-yellow-600">Média</span>
                          <span className="text-muted-foreground">(30 dias)</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="baixa">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                          <span className="font-semibold text-green-600">Baixa</span>
                          <span className="text-muted-foreground">(planejamento 2025)</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* CTA FINAL */}
              <div className="text-center space-y-6 py-8">
                <div className="space-y-4">
                  <h3 className="text-2xl md:text-3xl font-bold">
                    Este é o primeiro passo de uma negociação inteligente.
                  </h3>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Finalize seu diagnóstico e permita que a Lavoro prepare uma análise completa da sua operação. É assim que as empresas líderes negociam.
                  </p>
                </div>
                
                <Button 
                  size="lg" 
                  onClick={handleSubmit}
                  className="btn-primary-large text-lg px-12 py-6 h-auto group"
                >
                  Finalizar Diagnóstico e Receber Análise Estratégica
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DiagnosticoFrota;
