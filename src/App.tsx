import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import "./assets/styles/headers.scss";
import { QueryClient, QueryClientProvider } from "react-query";
import Release from "./pages/ReleasePage/ReleasePage";
import ArtistSearch from "./components/ArtistSearch/ArtistSearch";
import ArtistPage from "./pages/ArtistPage/ArtistPage";

function App() {
  const queryClient = new QueryClient();

  return (
    <div className="app">
      <QueryClientProvider client={queryClient}>
        <Router>
          <ArtistSearch />
          <Routes>
            <Route
              path="/"
              element={<p className="h2">Welcome to Artist Search</p>}
            />
            <Route path="/artist/:artistId" element={<ArtistPage />} />
            <Route path="/release/:releaseId" element={<Release />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </div>
  );
}

export default App;
