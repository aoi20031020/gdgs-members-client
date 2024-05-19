import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Members from "./pages/Member";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/members" element={<Members />} />
      </Routes>
      <Footer />
    </div>
  );
}
export default App;
