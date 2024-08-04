import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Members from "./pages/Member";
import Home from "./pages/Home";
import { CallbackHandler } from "./components/CallbackHandler";
import { AuthProvider } from "./AuthContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { styled } from "styled-components";

const AppsBox = styled.div`
  height: 100vh;
`;

function App() {
  return (
    <AuthProvider>
      <AppsBox>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/members" element={<Members />} />
            <Route path="/callback" element={<CallbackHandler />} />
          </Routes>
          <Footer />
        </div>
      </AppsBox>
    </AuthProvider>
  );
}
export default App;
