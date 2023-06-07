import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import BasePage from "./pages/base-page/BasePage";
import RegisterPage from "./pages/RegisterPage";
import { appTheme } from "./themes/appTheme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import VehicleListPage from "./pages/vehicle/VehicleListPage";
import TechnicianListPage from "./pages/technician/TechnicianListPage";
import RepairListPage from "./pages/repair/RepairListPage";
import BrandListPage from "./pages/brand/BrandListPage";
import { QueryClient, QueryClientProvider } from "react-query";
import { Role } from "./models/authTypes.ts";
import AuthorizedRoute from "./components/AuthorizedRoute.tsx";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import HomePage from "./pages/HomePage.tsx";
import { ReactQueryDevtools } from "react-query/devtools";

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
                    <Route
                      path="vehicle"
                      element={
                        <AuthorizedRoute roles={[Role.CLIENT]}>
                          <VehicleListPage />
                        </AuthorizedRoute>
                      }
                    />
                    <Route
                      path="repair"
                      element={
                        <AuthorizedRoute roles={[Role.TECHNICIAN]}>
                          <RepairListPage />
                        </AuthorizedRoute>
                      }
                    />
                    <Route
                      path="brand"
                      element={
                        <AuthorizedRoute roles={[Role.ADMIN]}>
                          <BrandListPage />
                        </AuthorizedRoute>
                      }
                    />
                    <Route
                      path="technician"
                      element={
                        <AuthorizedRoute roles={[Role.ADMIN]}>
                          <TechnicianListPage />
                        </AuthorizedRoute>
                      }
                    />
                  </Route>
                </Route>
                <Route path="*" element={<HomePage />} />
              </Routes>
            </Router>
          </LocalizationProvider>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
};

export default App;
