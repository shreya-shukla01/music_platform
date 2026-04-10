import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import GalaxyPage from "@/pages/GalaxyPage";
import NotFound from "@/pages/not-found";
import SpaceCursor from "@/components/SpaceCursor";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={GalaxyPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
        <SpaceCursor />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
