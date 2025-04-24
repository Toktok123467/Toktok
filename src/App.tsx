
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { B
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import PopularPage from "./pages/PopularPage";
import BattlesPage from "./pages/BattlesPage";
import MarketplacePage from "./pages/MarketplacePage";
import DashboardPage from "./pages/DashboardPage";
import WalletPage from "./pages/WalletPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/popular" element={<PopularPage />} />
            <Route path="/battles" element={<BattlesPage />} />
            <Route path="/featured" element={<BattlesPage />} /> {/* Same as battles for now */}
            <Route path="/marketplace" element={<MarketplacePage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/wallet" element={<WalletPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
