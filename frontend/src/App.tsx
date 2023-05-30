import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import BasePage from "./pages/base-page/BasePage";
import RegisterPage from "./pages/RegisterPage";
import { appTheme } from "./themes/appTheme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import VehicleListPage from "./pages/vehicle/VehicleListPage";
import NotFoundPage from "./pages/NotFoundPage";
import TechnicianListPage from "./pages/technic/TechnicianListPage";
import FaultListPage from "./pages/fault/FaultListPage";
import BrandListPage from "./pages/brand/BrandListPage";

const App = () => {
  return (
    <>
      <ThemeProvider theme={appTheme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<ProtectedRoute />}>
              <Route path="/" element={<BasePage />}>
                <Route path="vehicle" element={<VehicleListPage />} />
                <Route path="fault" element={<FaultListPage />} />
                <Route path="brand" element={<BrandListPage />} />
                <Route path="technicians" element={<TechnicianListPage />} />
                <Route path="profile" element={<NotFoundPage />} />
              </Route>
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </>
  );
};

export default App;
