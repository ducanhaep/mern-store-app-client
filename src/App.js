import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import ProductDetail from "./pages/ProductDetail";
import Headers from "./components/Headers";
import Search from "./pages/Search";
import Filter from "./pages/Filter";

function App() {
  return (
    <>
      <Headers />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Home />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/search/:value" element={<Search />} />
        <Route path="/filter/:option/:value" element={<Filter />} />
      </Routes>
    </>
  );
}

export default App;
