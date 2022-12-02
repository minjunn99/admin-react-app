// Import library
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";

// Import components
import { Loading } from "../../../components";
import { db } from "../../../firebase/firebaseConfig";
import dateFormat, { dateToTimestamp } from "../../../utils/dateFormat";

const Order = () => {
    const [orders, setOrders] = useState();
    const [ordersFilter, setOrdersFilter] = useState();
    const [dateFilter, setDateFilter] = useState({
        dateStart: "",
        dateEnd: "",
    });

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
        setOrdersFilter(result);
    };

    const handleDateFilter = (e) => {
        const date = new Date(e.target.value).valueOf();

        if (!date) {
            dateFilter[e.target.id] = "";
            setDateFilter({ ...dateFilter });
            return;
        }

        const dateFormatRs = dateFormat(date);
        dateFilter[e.target.id] = dateFormatRs;
        setDateFilter({ ...dateFilter });
    };

    const handleFilter = () => {
        if (!dateFilter.dateStart || !dateFilter.dateEnd) {
            return;
        }

        const dateStart = dateToTimestamp(dateFilter.dateStart);
        const dateEnd = dateToTimestamp(dateFilter.dateEnd);

        const arrayFilter = orders.filter((order) => {
            let orderTimestamp = order.createdAt.seconds * 1000;
            return orderTimestamp >= dateStart && orderTimestamp <= dateEnd;
        });

        setOrdersFilter(arrayFilter);
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
            {/* Filters */}
            <div className="d-flex justify--between items--center">
                {/* Dates */}
                <div className="d-flex items--center">
                    <div
                        className="d-flex items--center"
                        style={{ "--gap": "0.25rem" }}
                    >
                        <label
                            style={{ fontWeight: "500" }}
                            htmlFor="dateStart"
                        >
                            Ngày bắt đầu:
                        </label>
                        <input
                            type="date"
                            id="dateStart"
                            onChange={handleDateFilter}
                        />
                    </div>
                    <div
                        className="d-flex items--center"
                        style={{ "--gap": "0.25rem" }}
                    >
                        <label style={{ fontWeight: "500" }} htmlFor="dateEnd">
                            Ngày kết thúc:
                        </label>
                        <input
                            type="date"
                            id="dateEnd"
                            onChange={handleDateFilter}
                        />
                    </div>
                </div>
                {/* Buttons */}
                <button
                    className="button fs-200"
                    button-variant="outlined"
                    button-color="green"
                    onClick={handleFilter}
                >
                    lọc
                </button>
            </div>
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
                        {ordersFilter.length === 0 && (
                            <tr>
                                <td colSpan={5}>Chưa có dữ liệu đơn hàng!</td>
                            </tr>
                        )}
                        {/* Có dữ liệu sản phẩm */}
                        {ordersFilter.length > 0 &&
                            ordersFilter.map((order, index) => (
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
