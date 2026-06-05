import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";

export default function Privacidade() {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Política de Privacidade | Lavoro Foton"
        description="Como a Lavoro Foton coleta, utiliza e protege seus dados pessoais — em conformidade com a LGPD."
        path="/privacidade"
      />
      <Navbar />
      <main className="mt-16 max-w-3xl mx-auto px-6 py-12 prose prose-slate dark:prose-invert">
        <h1>Política de Privacidade</h1>
        <p className="text-sm text-muted-foreground">
          Última atualização: {new Date().toLocaleDateString("pt-BR")}
        </p>

        <h2>1. Quem somos</h2>
        <p>
          Lavoro Foton é a concessionária oficial da marca Foton em Belo Horizonte e Minas Gerais.
          Operamos o site lavorofoton.com.br e as ferramentas relacionadas, incluindo a Calculadora
          de TCO. Esta política descreve, de forma simples e direta, como tratamos seus dados em
          conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018 — LGPD).
        </p>

        <h2>2. Dados que coletamos</h2>
        <ul>
          <li><strong>Dados de contato:</strong> nome, e-mail, telefone/WhatsApp e empresa (opcional), informados por você ao solicitar o PDF da simulação, formulário de contato ou orçamento.</li>
          <li><strong>Dados da simulação:</strong> parâmetros que você insere na calculadora (modelo, km/mês, preço de combustível etc.) e os resultados gerados.</li>
          <li><strong>Dados técnicos:</strong> endereço IP, user agent e data/hora de acesso, registrados por questões de segurança e auditoria.</li>
        </ul>

        <h2>3. Finalidade do tratamento</h2>
        <ul>
          <li>Enviar o PDF da análise solicitada e prestar atendimento consultivo sobre os veículos Foton.</li>
          <li>Aprimorar nossos produtos, conteúdos e cálculos de TCO com base em dados agregados.</li>
          <li>Cumprir obrigações legais, contratuais e de auditoria.</li>
        </ul>

        <h2>4. Base legal</h2>
        <p>
          O tratamento ocorre com base no <em>consentimento</em> (art. 7º, I da LGPD), no
          <em> legítimo interesse</em> da Lavoro Foton em manter contato consultivo após uma solicitação
          explícita (art. 7º, IX) e no cumprimento de obrigações legais (art. 7º, II).
        </p>

        <h2>5. Compartilhamento</h2>
        <p>
          Não vendemos seus dados. Compartilhamos apenas com prestadores que viabilizam o serviço
          (hospedagem em nuvem, envio de e-mails transacionais) e com autoridades, quando exigido por lei.
        </p>

        <h2>6. Retenção</h2>
        <p>
          Mantemos os dados pelo prazo necessário para atender você e cumprir obrigações legais
          (até <strong>5 anos</strong> da última interação). Após isso, são anonimizados ou excluídos.
        </p>

        <h2>7. Seus direitos (LGPD)</h2>
        <p>
          Você pode, a qualquer momento, solicitar: confirmação do tratamento, acesso aos dados,
          correção, anonimização, portabilidade, eliminação dos dados tratados com base no
          consentimento, informação sobre compartilhamentos e revogação do consentimento.
        </p>
        <p>
          Para exercer qualquer direito, envie e-mail para{" "}
          <a href="mailto:contato@lavorofoton.com.br">contato@lavorofoton.com.br</a>.
        </p>

        <h2>8. Segurança</h2>
        <p>
          Adotamos controles técnicos e organizacionais (criptografia em trânsito, controle de
          acesso, registros de auditoria) para proteger seus dados.
        </p>

        <h2>9. Encarregado pelo tratamento de dados (DPO)</h2>
        <p>
          Em caso de dúvidas, fale com o nosso encarregado pelo e-mail{" "}
          <a href="mailto:contato@lavorofoton.com.br">contato@lavorofoton.com.br</a>.
        </p>
      </main>
    </div>
  );
}
