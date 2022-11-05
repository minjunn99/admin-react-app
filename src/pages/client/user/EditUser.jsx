// Import library
import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { v4 } from "uuid";
import { MdAddPhotoAlternate } from "react-icons/md";

// Import component
import { db, storage } from "../../../firebase/firebaseConfig";
import { Loading } from "../../../components";
import { phoneNumberRegex } from "../../../utils/userReg";

const EditUser = () => {
    const { userId } = useParams();

    const fullNameRef = useRef();
    const displayNameRef = useRef();
    const emailRef = useRef();
    const phoneNumberRef = useRef();
    const photoRef = useRef();
    const buttonRef = useRef();

    const [avatar, setAvatar] = useState();
    const [error, setError] = useState("");
    const [user, setUser] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        return () => {
            avatar && URL.revokeObjectURL(avatar.preview);
        };
    }, [avatar]);

    useEffect(() => {
        getUserById(userId);
    }, [userId]);

    useEffect(() => {
        if (user) {
            fullNameRef.current.value = user.fullName;
            displayNameRef.current.value = user.displayName;
            emailRef.current.value = user.email;
            phoneNumberRef.current.value = user.phoneNumber;
        }
    }, [user]);

    async function getUserById(id) {
        const docRef = doc(db, "users", id);
        const docSnap = await getDoc(docRef);

        const docData = docSnap.data();

        setUser({
            id: id,
            ...docData,
        });
    }

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

        setError("");

        if (
            !fullNameRef.current.value ||
            !displayNameRef.current.value ||
            !phoneNumberRef.current.value
        ) {
            setError("Bạn cần nhập đủ thông tin tài khoản!");
            return;
        }

        if (!phoneNumberRegex.test(phoneNumberRef.current.value)) {
            setError("Số điện thoại không hợp lệ. Bạn cần nhập lại!");
            return;
        }

        const userObj = {
            ...user,
        };

        if (fullNameRef.current.value !== user.fullName) {
            userObj.fullName = fullNameRef.current.value;
        }

        if (displayNameRef.current.value !== user.displayName) {
            userObj.displayName = displayNameRef.current.value;
        }

        if (phoneNumberRef.current.value !== user.phoneNumber) {
            userObj.phoneNumber = phoneNumberRef.current.value;
        }

        if (photoRef.current.files.length) {
            const url = await uploadAndGetPhotoUrl();
            userObj.photoURL = url;
        }

        await setDoc(doc(db, "users", user.id), userObj);

        navigate("/user");
    };

    const handleChange = (e) => {
        const userDataRef = {
            fullName: fullNameRef.current.value,
            displayName: displayNameRef.current.value,
            phoneNumber: phoneNumberRef.current.value,
        };

        const userData = {
            fullName: user.fullName,
            displayName: user.displayName,
            phoneNumber: user.phoneNumber,
        };

        if (JSON.stringify(userDataRef) === JSON.stringify(userData)) {
            buttonRef.current.setAttribute("data-visible", "false");
        } else {
            buttonRef.current.setAttribute("data-visible", "true");
        }
    };

    if (!user) {
        return (
            <section>
                <Loading />
            </section>
        );
    }

    return (
        <section className="flow">
            <h5>Chỉnh sửa hồ sơ khách hàng</h5>
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
                        src={avatar ? avatar.preview : user.photoURL}
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
                        onChange={handleChange}
                        placeholder=" "
                    />
                    <label className="form--label" htmlFor="fullName">
                        Họ tên:
                    </label>
                </div>
                <div className="form--group">
                    <input
                        className="form--input"
                        type="text"
                        id="displayName"
                        ref={displayNameRef}
                        onChange={handleChange}
                        placeholder=" "
                    />
                    <label className="form--label" htmlFor="displayName">
                        Tên người dùng:
                    </label>
                </div>
                <div className="form--group">
                    <input
                        className="form--input"
                        type="email"
                        id="email"
                        ref={emailRef}
                        disabled={true}
                        placeholder=" "
                    />
                    <label className="form--label" htmlFor="email">
                        Email:
                    </label>
                </div>
                <div className="form--group">
                    <input
                        className="form--input"
                        type="text"
                        id="phoneNumber"
                        ref={phoneNumberRef}
                        onChange={handleChange}
                        placeholder=" "
                    />
                    <label className="form--label" htmlFor="phoneNumber">
                        Số điện thoại:
                    </label>
                </div>
                <button
                    className="button text--center"
                    button-variant="contained"
                    button-color="green"
                    data-visible="false"
                    ref={buttonRef}
                >
                    cập nhật
                </button>
            </form>
        </section>
    );
};

export default EditUser;
