import { Navigate, Outlet } from "react-router";
import { useAuth } from "../Contexts/AuthContext";

const AdminRoutes = () => {
    const { isAuthenticated, userRoles } = useAuth();

    if (isAuthenticated == null) return;

    return isAuthenticated == true && userRoles.includes("Administrator") ? (
        <Outlet />
    ) : (
        <Navigate to="/" replace={true} />
    );
};

export default AdminRoutes;
