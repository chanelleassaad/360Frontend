import {
  Route,
  Routes,
  useNavigate,
  useLocation,
  Navigate,
} from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import App from "../App";
import EditProjects from "../components/template/EditProjects";

const Router = () => {
  const { userToken, isLoading } = useSelector((state: any) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isLoading) return;

    console.log(userToken);

    // Allow access to the /admin route even when not logged in
    if (!userToken && location.pathname !== "/360-production/admin") {
      navigate("/360-production", { replace: true });
    }
  }, [userToken]);

  return (
    <Routes>
      {/* Default Route */}
      <Route
        path="*"
        element={<Navigate to="/360-production" replace={true} />}
      />

      {/* Public routes */}
      <Route path="/360-production" element={<App />} />
      <Route path="/360-production/admin" element={<LoginPage />} />

      {/* Private route */}
      <Route
        path="/360-production/admin/edit-projects"
        element={<EditProjects />}
      />
    </Routes>
  );
};

export default Router;
