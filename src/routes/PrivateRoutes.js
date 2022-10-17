// Import library
import { Outlet, Navigate } from "react-router-dom";

// Import components
import { auth } from "../firebase/firebaseConfig";

const PrivateRoutes = () => {
    const currentUser = auth.currentUser;

    return !!currentUser ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoutes;
