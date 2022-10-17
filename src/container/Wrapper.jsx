// Import library
import React from "react";
import { useOutlet } from "react-router-dom";

// Import components
import { Sidebar } from "../components";

const Wrapper = () => {
    const outlet = useOutlet();

    return (
        <main className="wrapper">
            <Sidebar />
            {outlet}
        </main>
    );
};

export default Wrapper;
