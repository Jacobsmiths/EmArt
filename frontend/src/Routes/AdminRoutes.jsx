import { Navigate, Outlet } from "react-router";
import { useAuth } from "../Contexts/AuthContext";

const AdminRoutes = () => {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated == null) return;

    return isAuthenticated == true ? (
        <Outlet />
    ) : (
        <Navigate to="/" replace={true} />
    );
};

export default AdminRoutes;
