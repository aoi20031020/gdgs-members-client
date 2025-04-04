import { Navigate, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Members from "./pages/Member";
import Home from "./pages/Home";
import { AuthProvider } from "./AuthContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { styled } from "styled-components";
import Login from "./pages/Login";
import { useAuth } from "./hooks/useAuth";

const AppsBox = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Main = styled.main`
  flex: 1;
`;

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <AppsBox>
        <Header />
        <Main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/members"
              element={
                <PrivateRoute>
                  <Members />
                </PrivateRoute>
              }
            />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Main>
        <Footer />
      </AppsBox>
    </AuthProvider>
  );
}

export default App;
