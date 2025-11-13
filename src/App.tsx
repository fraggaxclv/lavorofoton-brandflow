import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import QuemSomos from "./pages/QuemSomos";
import Modelos from "./pages/Modelos";
import Servicos from "./pages/Servicos";
import Contato from "./pages/Contato";
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
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quem-somos" element={<QuemSomos />} />
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
          <Route path="/servicos" element={<Servicos />} />
          <Route path="/contato" element={<Contato />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
