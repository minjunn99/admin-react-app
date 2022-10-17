// Import library
import { Outlet, Navigate } from "react-router-dom";

// Import components
import { auth } from "../firebase/firebaseConfig";

const PrivateRoutes = () => {
    const currentUser = auth.currentUser;

    return !!currentUser ? <Navigate to="/" /> : <Outlet />;
};

export default PrivateRoutes;
