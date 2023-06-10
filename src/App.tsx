import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Router from "./Router";
import Theme from "./Theme";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Theme>
        <Router />
      </Theme>
    </QueryClientProvider>
  );
}

export default App;
