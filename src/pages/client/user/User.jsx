// Import library
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";

// Import component
import { db } from "../../../firebase/firebaseConfig";
import { Loading } from "../../../components";

const User = () => {
    const [users, setUsers] = useState();

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        const result = [];
        const q = query(collection(db, "user"), where("role", "==", "user"));
        const qSnapshot = await getDocs(q);

        qSnapshot.forEach((doc) => {
            const data = doc.data();

            result.push({ id: doc.id, ...data });
        });

        setUsers(result);
    };

    if (!users) {
        return (
            <section>
                <Loading />
            </section>
        );
    }

    return (
        <section className="flow">
            <div className="d-flex justify--between items--center">
                <h5>Quản lý khách hàng</h5>
                <Link
                    to="/add_user"
                    className="button"
                    button-variant="contained"
                    button-color="green"
                >
                    thêm khách hàng
                </Link>
            </div>
            <table className="table" style={{ width: "max(100%, 60rem)" }}>
                <thead className="table--head">
                    <tr>
                        <th></th>
                        <th>thông tin cơ bản</th>
                        <th>tên hiển thị</th>
                        <th>số điện thoại</th>
                        <th>ngày tạo</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody className="table--body">
                    {/* Nếu chưa có dữ liệu khách hàng */}
                    {users.length === 0 && (
                        <tr>
                            <td colSpan={6}>Chưa có dữ liệu khách hàng!</td>
                        </tr>
                    )}
                    {/* Có dữ liệu khách hàng */}
                    {users.length > 0 &&
                        users.map((user, index) => (
                            <tr key={user.id}>
                                <td>{index}</td>
                                <td>
                                    <div className="d-flex">
                                        <img
                                            style={{
                                                width: "48px",
                                                height: "48px",
                                                borderRadius: "100%",
                                                objectFit: "cover",
                                            }}
                                            src={user.photoURL}
                                            alt={user.displayName}
                                        />
                                        <div>
                                            <div className="fs-400 text--capitalize">
                                                {user.fullName}
                                            </div>
                                            <p>{user.email}</p>
                                        </div>
                                    </div>
                                </td>
                                <td>{user.displayName}</td>
                                <td>{user.phoneNumber}</td>
                                <td>Mar 27, 2016</td>
                                <td>
                                    <Link
                                        to={`/edit_user/${user.id}`}
                                        className="table--button"
                                        style={{ marginRight: "0.25rem" }}
                                    >
                                        <FiEdit />
                                    </Link>
                                    <div className="table--button">
                                        <RiDeleteBinLine />
                                    </div>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </section>
    );
};

export default User;
