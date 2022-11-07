// Import library
import { Outlet, Navigate } from "react-router-dom";

// Import components
import { auth } from "../firebase/firebaseConfig";

const AuthRoutes = () => {
    const currentUser = auth.currentUser;

    return !!currentUser ? <Navigate to="/" /> : <Outlet />;
};

export default AuthRoutes;
