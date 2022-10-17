// Import library
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";

// Import component
import { useAuth } from "../../contexts/AuthContext";
import { auth, db } from "../../firebase/firebaseConfig";

const Signin = () => {
    const { signin, signout } = useAuth();

    const emailRef = useRef();
    const passwordRef = useRef();

    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        if (!emailRef.current.value || !passwordRef.current.value) {
            setError("Bạn chưa nhập đủ thông tin. Vui lòng thực hiện lại!");
            return;
        }

        try {
            await signin(emailRef.current.value, passwordRef.current.value);
            const { uid } = auth.currentUser;
            const docRef = doc(db, "users", uid);
            const docSnap = await getDoc(docRef);
            const { role } = docSnap.data();

            if (role !== "admin") {
                await signout();
                setError("Tài khoản không có quyền đăng nhập!");
                return;
            }

            navigate("/");
        } catch {
            setError(
                "Bạn nhập sai email hoặc mật khẩu. Vui lòng thực hiện lại!"
            );
            return;
        }
    };

    return (
        <div className="signin w-screen h-screen d-flex justify--center items--center">
            <div className="signin--container flow">
                <h4 className="text--center text--capitalize">Đăng nhập</h4>
                <form className="form flow" onSubmit={handleSubmit}>
                    {error && (
                        <p
                            className="text--center"
                            style={{
                                color: "#ff3333",
                                fontWeight: 500,
                            }}
                        >
                            {error}
                        </p>
                    )}
                    <div className="form--group">
                        <input
                            className="form--input"
                            type="email"
                            id="email"
                            ref={emailRef}
                            placeholder=" "
                        />
                        <label className="form--label" htmlFor="email">
                            Nhập email:
                        </label>
                    </div>
                    <div className="form--group">
                        <input
                            className="form--input"
                            type="password"
                            id="password"
                            ref={passwordRef}
                            placeholder=" "
                        />
                        <label className="form--label" htmlFor="password">
                            Nhập password:
                        </label>
                    </div>
                    <button
                        className="button w-full text--center"
                        button-variant="contained"
                        button-color="primary"
                    >
                        đăng nhập
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Signin;
