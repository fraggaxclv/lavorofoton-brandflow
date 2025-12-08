import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Home from "./pages/Home";
import QuemSomos from "./pages/QuemSomos";
import SobreFoton from "./pages/SobreFoton";
import Modelos from "./pages/Modelos";
import Servicos from "./pages/Servicos";
import Contato from "./pages/Contato";
import DiagnosticoFrota from "./pages/DiagnosticoFrota";
import PedidoFaturamento from "./pages/PedidoFaturamento";
import ListaPedidos from "./pages/ListaPedidos";
import PropostaComercial from "./pages/PropostaComercial";
import Auth from "./pages/Auth";
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
import NotFound from "./pages/NotFound";
import WhatsAppButton from "./components/WhatsAppButton";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <WhatsAppButton />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
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
            <Route path="/servicos" element={<Servicos />} />
            <Route path="/contato" element={<Contato />} />
            <Route path="/diagnostico-frota" element={<DiagnosticoFrota />} />
            <Route path="/pedido-faturamento-lavoro" element={<PedidoFaturamento />} />
            <Route path="/pedido-faturamento-foton" element={<PedidoFaturamento />} />
            <Route path="/proposta-comercial-lavoro" element={<PropostaComercial />} />
            <Route 
              path="/admin/pedidos-faturamento" 
              element={
                <ProtectedRoute requireAdmin>
                  <ListaPedidos />
                </ProtectedRoute>
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
