// Import library
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import { v4 } from "uuid";
import { MdAddPhotoAlternate } from "react-icons/md";

// Import component
import avatarDefault from "../../../assets/userprofile.jpg";
import { useAuth } from "../../../contexts/AuthContext";
import { db, storage } from "../../../firebase/firebaseConfig";
import {
    emailRegex,
    passwordRegex,
    phoneNumberRegex,
} from "../../../utils/userReg";
import UserConstructor from "../../../utils/UserConstructor";
import dateFormat from "../../../utils/dateFormat";

const AddUser = () => {
    const { signup } = useAuth();

    const fullNameRef = useRef();
    const displayNameRef = useRef();
    const emailRef = useRef();
    const phoneNumberRef = useRef();
    const passwordRef = useRef();
    const repasswordRef = useRef();
    const photoRef = useRef();

    const [error, setError] = useState("");
    const [avatar, setAvatar] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        return () => {
            avatar && URL.revokeObjectURL(avatar.preview);
        };
    }, [avatar]);

    function handleClicktoOpenFile() {
        photoRef.current.click();
    }

    function handleFileChange(e) {
        const file = e.target.files[0];
        file.preview = URL.createObjectURL(file);
        setAvatar(file);
    }

    async function uploadAndGetPhotoUrl() {
        const imgRef = ref(
            storage,
            `avatar/${displayNameRef.current.value}/${
                displayNameRef.current.value + v4()
            }`
        );

        await uploadBytes(imgRef, photoRef.current.files[0]);
        return getDownloadURL(imgRef);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userObj = new UserConstructor();
        // Set error empty
        setError("");

        // Validation
        if (
            !fullNameRef.current.value ||
            !displayNameRef.current.value ||
            !emailRef.current.value ||
            !phoneNumberRef.current.value ||
            !passwordRef.current.value ||
            !repasswordRef.current.value
        ) {
            setError("Bạn cần nhập đủ thông tin tài khoản!");
            return;
        }

        if (!emailRegex.test(emailRef.current.value)) {
            setError("Email không hợp lệ. Bạn cần nhập lại!");
            return;
        }

        if (!passwordRegex.test(passwordRef.current.value)) {
            setError("Mật khẩu không hợp lệ. Bạn cần nhập lại!");
            return;
        }

        if (passwordRef.current.value !== repasswordRef.current.value) {
            setError("Mật khẩu không khớp. Vui lòng nhập lại!");
            return;
        }

        if (!phoneNumberRegex.test(phoneNumberRef.current.value)) {
            setError("Số điện thoại không hợp lệ. Bạn cần nhập lại!");
            return;
        }

        // Update data of userObj
        userObj.fullName = fullNameRef.current.value;
        userObj.displayName = displayNameRef.current.value;
        userObj.email = emailRef.current.value;
        userObj.phoneNumber = phoneNumberRef.current.value;

        // Check if user have photos
        if (photoRef.current.files.length) {
            // Upload image to firebase storage and get url image
            const url = await uploadAndGetPhotoUrl();
            // Set image of user
            userObj.photoURL = url;
        }

        // Subcribed account to authentication firebase
        try {
            const res = await signup(
                emailRef.current.value,
                passwordRef.current.value
            );
            // Update user profile
            updateProfile(res.user, {
                displayName: userObj.displayName,
                photoURL: userObj.image,
            })
                .then(() => {
                    console.log(res.user);
                })
                .catch((err) => {
                    console.log(err);
                });

            userObj.createdAt = dateFormat(res.user.metadata.createdAt);

            // Create user collection in firestore
            await setDoc(doc(db, "users", res.user.uid), {
                ...userObj,
            });
        } catch {
            setError("Lỗi tạo tài khoản. Vui lòng thử lại!");
            return;
        }

        navigate("/user");
    };

    return (
        <section className="flow">
            <h5>Thêm mới khách hàng</h5>
            <form className="form form--manage" onSubmit={handleSubmit}>
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
                <div className="form--preview" onClick={handleClicktoOpenFile}>
                    <img
                        src={avatar ? avatar.preview : avatarDefault}
                        alt="sad"
                    />
                    <MdAddPhotoAlternate className="form--icon" />
                    <input
                        type="file"
                        id="file"
                        ref={photoRef}
                        accept="image/*"
                        onChange={handleFileChange}
                        style={{ display: "none" }}
                    />
                </div>
                <div className="form--group">
                    <input
                        className="form--input"
                        type="text"
                        id="fullName"
                        ref={fullNameRef}
                        placeholder=" "
                    />
                    <label className="form--label" htmlFor="fullName">
                        Nhập họ tên:
                    </label>
                </div>
                <div className="form--group">
                    <input
                        className="form--input"
                        type="text"
                        id="displayName"
                        ref={displayNameRef}
                        placeholder=" "
                    />
                    <label className="form--label" htmlFor="displayName">
                        Nhập tên người dùng:
                    </label>
                </div>
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
                <div className="form--group">
                    <input
                        className="form--input"
                        type="password"
                        id="repassword"
                        ref={repasswordRef}
                        placeholder=" "
                    />
                    <label className="form--label" htmlFor="repassword">
                        Nhập lại password:
                    </label>
                </div>
                <div className="form--group">
                    <input
                        className="form--input"
                        type="text"
                        id="phoneNumber"
                        ref={phoneNumberRef}
                        placeholder=" "
                    />
                    <label className="form--label" htmlFor="phoneNumber">
                        Nhập số điện thoại:
                    </label>
                </div>
                <button
                    className="button text--center"
                    button-variant="contained"
                    button-color="green"
                >
                    tạo mới
                </button>
            </form>
        </section>
    );
};

export default AddUser;
