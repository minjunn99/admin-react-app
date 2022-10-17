// Import library
import React from "react";
import ReactLoading from "react-loading";

// Import components

const Loading = () => {
    return (
        <div
            className="w-full d-flex justify--center items--center"
            style={{ height: "100%" }}
        >
            <div className="text--center">
                <ReactLoading type="spin" color="#000" />
                <p style={{ marginTop: "0.5rem" }}>Tải dữ liệu</p>
            </div>
        </div>
    );
};

export default Loading;
