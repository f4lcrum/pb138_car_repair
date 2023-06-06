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
import RepairListPage from "./pages/repair/RepairListPage";
import BrandListPage from "./pages/brand/BrandListPage";
import { QueryClient, QueryClientProvider } from "react-query";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const queryClient = new QueryClient();

const App = () => {
  return (
    <>
      <ThemeProvider theme={appTheme}>
        <CssBaseline />
        <QueryClientProvider client={queryClient}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Router>
              <Routes>
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/" element={<ProtectedRoute />}>
                  <Route path="/" element={<BasePage />}>
                    <Route path="vehicle" element={<VehicleListPage />} />
                    <Route path="fault" element={<RepairListPage />} />
                    <Route path="brand" element={<BrandListPage />} />
                    <Route
                      path="technicians"
                      element={<TechnicianListPage />}
                    />
                    <Route path="profile" element={<NotFoundPage />} />
                  </Route>
                </Route>
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Router>
          </LocalizationProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
};

export default App;
