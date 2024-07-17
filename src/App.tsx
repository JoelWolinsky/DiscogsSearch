import "./App.css";
import ArtistSearch from "./components/ArtistSearch/ArtistSearch";
import { QueryClient, QueryClientProvider } from "react-query";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <ArtistSearch />
      </div>
    </QueryClientProvider>
  );
}

export default App;
