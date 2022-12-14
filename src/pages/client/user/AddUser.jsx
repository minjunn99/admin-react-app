// Import library
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, doc, setDoc, addDoc } from "firebase/firestore";
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
            setError("B???n c???n nh???p ????? th??ng tin t??i kho???n!");
            return;
        }

        if (!emailRegex.test(emailRef.current.value)) {
            setError("Email kh??ng h???p l???. B???n c???n nh???p l???i!");
            return;
        }

        if (!passwordRegex.test(passwordRef.current.value)) {
            setError("M???t kh???u kh??ng h???p l???. B???n c???n nh???p l???i!");
            return;
        }

        if (passwordRef.current.value !== repasswordRef.current.value) {
            setError("M???t kh???u kh??ng kh???p. Vui l??ng nh???p l???i!");
            return;
        }

        if (!phoneNumberRegex.test(phoneNumberRef.current.value)) {
            setError("S??? ??i???n tho???i kh??ng h???p l???. B???n c???n nh???p l???i!");
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

            // Create user cart collection in firestore
            await addDoc(collection(db, "cart"), {
                uid: res.user.uid,
                products: [],
                total: 0,
            });
        } catch {
            setError("L???i t???o t??i kho???n. Vui l??ng th??? l???i!");
            return;
        }

        navigate("/user");
    };

    return (
        <section className="flow">
            <h5>Th??m m???i kh??ch h??ng</h5>
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
                        Nh???p h??? t??n:
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
                        Nh???p t??n ng?????i d??ng:
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
                        Nh???p email:
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
                        Nh???p password:
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
                        Nh???p l???i password:
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
                        Nh???p s??? ??i???n tho???i:
                    </label>
                </div>
                <button
                    className="button text--center"
                    button-variant="contained"
                    button-color="green"
                >
                    t???o m???i
                </button>
            </form>
        </section>
    );
};

export default AddUser;
