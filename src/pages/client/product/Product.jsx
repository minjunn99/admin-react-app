// Import library
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    collection,
    // doc,
    // deleteDoc,
    getDocs,
} from "firebase/firestore";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";

// Import component
import { db } from "../../../firebase/firebaseConfig";
import { Loading } from "../../../components";

const Product = () => {
    const [products, setProducts] = useState();

    useEffect(() => {
        getProducts();
    }, [products]);

    const getProducts = async () => {
        const result = [];
        const qSnapshot = await getDocs(collection(db, "products"));

        qSnapshot.forEach((doc) => {
            const data = doc.data();

            result.push({ id: doc.id, ...data });
        });

        setProducts(result);
    };

    const handleClick = (productId) => {};

    if (!products) {
        return (
            <section>
                <Loading />
            </section>
        );
    }

    return (
        <section className="flow">
            <div className="d-flex justify--between items--center">
                <h5>Quản lý sản phẩm</h5>
                <Link
                    to="/add_product"
                    className="button"
                    button-variant="contained"
                    button-color="green"
                >
                    thêm sản phẩm
                </Link>
            </div>
            <div style={{ width: "100%", overflowX: "scroll" }}>
                <table className="table" style={{ width: "max(100%, 60rem)" }}>
                    <thead className="table--head">
                        <tr>
                            <th></th>
                            <th>hình ảnh</th>
                            <th>tên sản phẩm</th>
                            <th>số lượng</th>
                            <th>giá</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className="table--body">
                        {/* Nếu chưa có dữ liệu sản phẩm */}
                        {products.length === 0 && (
                            <tr>
                                <td colSpan={6}>Chưa có dữ liệu sản phẩm!</td>
                            </tr>
                        )}
                        {/* Có dữ liệu sản phẩm */}
                        {products.length > 0 &&
                            products.map((product, index) => (
                                <tr key={product.id}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <img
                                            style={{
                                                width: "10rem",
                                                height: "10rem",
                                                objectFit: "cover",
                                            }}
                                            src={product.photos[0]}
                                            alt={product.name}
                                        />
                                    </td>
                                    <td>{product.name}</td>
                                    <td>{product.total}</td>
                                    <td>{product.cost}</td>
                                    <td>
                                        <Link
                                            to={`/edit_product/${product.id}`}
                                            className="table--button"
                                            style={{ marginRight: "0.25rem" }}
                                        >
                                            <FiEdit />
                                        </Link>
                                        <div
                                            className="table--button"
                                            onClick={() =>
                                                handleClick(product.id)
                                            }
                                        >
                                            <RiDeleteBinLine />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default Product;
