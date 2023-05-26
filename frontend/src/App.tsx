import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import BasePage from "./pages/BasePage";
import RegisterPage from "./pages/RegisterPage";

const App = () => {
  return (
    <>
      <Router>
        <div>NavLinks for testing</div>
        <div>
          <NavLink to="/login">login </NavLink>
          <NavLink to="/register">register </NavLink>
          <NavLink to="/">home </NavLink>
        </div>

        <Routes>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<ProtectedRoute />}>
            <Route path="/" element={<BasePage />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
