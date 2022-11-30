// Import library
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";

// Import components
import { Loading } from "../../../components";
import { db } from "../../../firebase/firebaseConfig";
import dateFormat from "../../../utils/dateFormat";

const Order = () => {
    const [orders, setOrders] = useState();

    useEffect(() => {
        getOrders();
    }, []);

    const getOrders = async () => {
        const result = [];
        const qSnapshot = await getDocs(collection(db, "order"));

        qSnapshot.forEach((doc) => {
            const data = doc.data();

            result.push({ id: doc.id, ...data });
        });

        setOrders(result);
    };

    if (!orders) {
        return (
            <section>
                <Loading />
            </section>
        );
    }

    return (
        <section className="flow">
            <h5>Báo cáo thống kê</h5>
            <div style={{ width: "100%", overflowX: "scroll" }}>
                <table className="table" style={{ width: "max(100%, 60rem)" }}>
                    <thead className="table--head">
                        <tr>
                            <th></th>
                            <th>họ tên</th>
                            <th>địa chỉ</th>
                            <th>ngày</th>
                            <th>tổng tiền</th>
                        </tr>
                    </thead>
                    <tbody className="table--body">
                        {/* Nếu chưa có dữ liệu sản phẩm */}
                        {orders.length === 0 && (
                            <tr>
                                <td colSpan={5}>Chưa có dữ liệu sản phẩm!</td>
                            </tr>
                        )}
                        {/* Có dữ liệu sản phẩm */}
                        {orders.length > 0 &&
                            orders.map((order, index) => (
                                <tr key={order.id}>
                                    <td>{index + 1}</td>
                                    <td>{order.fullName}</td>
                                    <td>{order.address}</td>
                                    <td>
                                        {dateFormat(
                                            order.createdAt.seconds * 1000
                                        )}
                                    </td>
                                    <td>{order.totalCost} VNĐ</td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default Order;
