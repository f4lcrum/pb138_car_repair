import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import BasePage from "./pages/base-page/BasePage";
import RegisterPage from "./pages/RegisterPage";
import { appTheme } from "./themes/appTheme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import CarListPage from "./pages/car/CarListPage";
import NotFoundPage from "./pages/NotFoundPage";

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
                <Route path="car" element={<CarListPage />} />
                <Route path="repair" element={<NotFoundPage />} />
                <Route path="brand" element={<NotFoundPage />} />
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
