import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { InternoAuthProvider } from "@/contexts/InternoAuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import InternoProtectedRoute from "@/components/interno/InternoProtectedRoute";
import { ScrollToTop } from "@/components/ScrollToTop";
import Home from "./pages/Home";
import QuemSomos from "./pages/QuemSomos";
import SobreFoton from "./pages/SobreFoton";
import Modelos from "./pages/Modelos";
import Servicos from "./pages/Servicos";
import Contato from "./pages/Contato";

import PedidoFaturamento from "./pages/PedidoFaturamento";
import ListaPedidos from "./pages/ListaPedidos";
import PropostaComercial from "./pages/PropostaComercial";

import S315 from "./pages/models/S315";
import Foton7T from "./pages/models/Foton7T";
import Foton9T from "./pages/models/Foton9T";
import Foton1217 from "./pages/models/Foton1217";
import Foton17T from "./pages/models/Foton17T";
import TunlandV9 from "./pages/models/TunlandV9";
import TunlandV7 from "./pages/models/TunlandV7";
import EWonder from "./pages/models/EWonder";
import EToano from "./pages/models/EToano";
import EView from "./pages/models/EView";
import EAumark9T from "./pages/models/EAumark9T";
import EAumark12T from "./pages/models/EAumark12T";
import IBlue6T from "./pages/models/IBlue6T";
import NotFound from "./pages/NotFound";
import WhatsAppButton from "./components/WhatsAppButton";
import ComparativoAumark1217 from "./pages/ComparativoAumark1217";
import CalculadoraROI from "./pages/CalculadoraROI";
import EWonderLanding from "./pages/EWonderLanding";
import CalculadoraEWonder from "./pages/CalculadoraEWonder";

// Páginas do sistema interno
import InternoLogin from "./pages/interno/InternoLogin";
import RecuperarSenha from "./pages/interno/RecuperarSenha";
import RedefinirSenha from "./pages/interno/RedefinirSenha";
import InternoDashboard from "./pages/interno/InternoDashboard";
import InternoClientes from "./pages/interno/InternoClientes";
import InternoNegociacoes from "./pages/interno/InternoNegociacoes";
import InternoConsultores from "./pages/interno/InternoConsultores";
import InternoConsultorPerfil from "./pages/interno/InternoConsultorPerfil";
import InternoRelatorioPerdas from "./pages/interno/InternoRelatorioPerdas";
import InternoPedidosPublicos from "./pages/interno/InternoPedidosPublicos";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 2, // 2 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes (previously cacheTime)
      retry: 2,
      refetchOnWindowFocus: false,
      refetchOnMount: true,
    },
    mutations: {
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <AuthProvider>
          <WhatsAppButton />
          <Routes>
            {/* Rotas públicas do site */}
            <Route path="/" element={<Home />} />
            <Route path="/quem-somos" element={<QuemSomos />} />
            <Route path="/sobre-foton" element={<SobreFoton />} />
            <Route path="/modelos" element={<Modelos />} />
            <Route path="/modelos/aumark-s315" element={<S315 />} />
            <Route path="/modelos/aumark-715" element={<Foton7T />} />
            <Route path="/modelos/aumark-916" element={<Foton9T />} />
            <Route path="/modelos/aumark-1217" element={<Foton1217 />} />
            <Route path="/modelos/auman-d-1722" element={<Foton17T />} />
            <Route path="/modelos/tunland-v9" element={<TunlandV9 />} />
            <Route path="/modelos/tunland-v7" element={<TunlandV7 />} />
            <Route path="/modelos/ewonder" element={<EWonder />} />
            <Route path="/modelos/etoano" element={<EToano />} />
            <Route path="/modelos/eview" element={<EView />} />
            <Route path="/modelos/eaumark-9t" element={<EAumark9T />} />
            <Route path="/modelos/eaumark-12t" element={<EAumark12T />} />
            <Route path="/modelos/iblue-6t" element={<IBlue6T />} />
            <Route path="/servicos" element={<Servicos />} />
            <Route path="/contato" element={<Contato />} />
            <Route path="/comparativo-aumark-1217" element={<ComparativoAumark1217 />} />
            <Route path="/calculadora-roi" element={<CalculadoraROI />} />
            <Route path="/comparativo-ewonder" element={<EWonderLanding />} />
            <Route path="/calculadora-ewonder" element={<CalculadoraEWonder />} />
            
            <Route path="/pedido-faturamento-lavoro" element={<PedidoFaturamento />} />
            <Route path="/proposta-comercial-lavoro" element={<PropostaComercial />} />
            <Route 
              path="/admin/pedidos-faturamento" 
              element={
                <ProtectedRoute requireAdmin>
                  <ListaPedidos />
                </ProtectedRoute>
              } 
            />

            {/* Rotas do sistema interno */}
            <Route 
              path="/interno/login" 
              element={
                <InternoAuthProvider>
                  <InternoLogin />
                </InternoAuthProvider>
              } 
            />
            <Route 
              path="/interno/recuperar-senha" 
              element={<RecuperarSenha />} 
            />
            <Route 
              path="/interno/redefinir-senha" 
              element={<RedefinirSenha />} 
            />
            <Route 
              path="/interno/dashboard" 
              element={
                <InternoAuthProvider>
                  <InternoProtectedRoute allowedRoles={['admin', 'vendedor']}>
                    <InternoDashboard />
                  </InternoProtectedRoute>
                </InternoAuthProvider>
              } 
            />
            <Route 
              path="/interno/clientes" 
              element={
                <InternoAuthProvider>
                  <InternoProtectedRoute allowedRoles={['admin', 'vendedor']}>
                    <InternoClientes />
                  </InternoProtectedRoute>
                </InternoAuthProvider>
              } 
            />
            <Route 
              path="/interno/negociacoes" 
              element={
                <InternoAuthProvider>
                  <InternoProtectedRoute allowedRoles={['admin', 'vendedor']}>
                    <InternoNegociacoes />
                  </InternoProtectedRoute>
                </InternoAuthProvider>
              } 
            />
            <Route 
              path="/interno/consultores" 
              element={
                <InternoAuthProvider>
                  <InternoProtectedRoute allowedRoles={['admin']}>
                    <InternoConsultores />
                  </InternoProtectedRoute>
                </InternoAuthProvider>
              } 
            />
            <Route 
              path="/interno/consultor/:id" 
              element={
                <InternoAuthProvider>
                  <InternoProtectedRoute allowedRoles={['admin']}>
                    <InternoConsultorPerfil />
                  </InternoProtectedRoute>
                </InternoAuthProvider>
              } 
            />
            <Route 
              path="/interno/relatorio-perdas" 
              element={
                <InternoAuthProvider>
                  <InternoProtectedRoute allowedRoles={['admin']}>
                    <InternoRelatorioPerdas />
                  </InternoProtectedRoute>
                </InternoAuthProvider>
              } 
            />
            <Route 
              path="/interno/pedidos-publicos" 
              element={
                <InternoAuthProvider>
                  <InternoProtectedRoute allowedRoles={['admin']}>
                    <InternoPedidosPublicos />
                  </InternoProtectedRoute>
                </InternoAuthProvider>
              } 
            />
            <Route 
              path="/interno/meu-perfil" 
              element={
                <InternoAuthProvider>
                  <InternoProtectedRoute allowedRoles={['admin', 'vendedor']}>
                    <InternoConsultorPerfil />
                  </InternoProtectedRoute>
                </InternoAuthProvider>
              } 
            />

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
