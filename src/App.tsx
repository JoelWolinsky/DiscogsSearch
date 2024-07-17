import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar";
import { QueryClient, QueryClientProvider } from "react-query";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <SearchBar />
      </div>
    </QueryClientProvider>
  );
}

export default App;
