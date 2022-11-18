// Import library
import React, { useEffect, useState, useRef } from "react";
import { getDoc, doc, setDoc } from "firebase/firestore";
import { useParams, useNavigate } from "react-router-dom";

// Import component
import { db } from "../../../firebase/firebaseConfig";
import categoryProduct from "../../../utils/categoryProduct";
import { Loading } from "../../../components";

const EditProduct = () => {
    const { productId } = useParams();

    const nameRef = useRef();
    const descRef = useRef();
    const costRef = useRef();
    const buttonRef = useRef();

    const [error, setError] = useState("");
    const [product, setProduct] = useState();
    const [detailFields, setDetailFields] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        getProductById(productId);
    }, [productId]);

    useEffect(() => {
        if (product) {
            nameRef.current.value = product.name;
            descRef.current.value = product.description;
            costRef.current.value = product.cost.slice(0, -4);
        }
    }, [product]);

    async function getProductById(id) {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);
        const docData = docSnap.data();
        localStorage.setItem("product", JSON.stringify({ id, ...docData }));
        setProduct({
            id,
            ...docData,
        });
        const detailFieldRs = categoryProduct.find(
            (value) =>
                docData.category === value.category &&
                docData.slug === value.slug
        );
        setDetailFields(detailFieldRs.detailFields);
    }

    function handleDetail(e, index) {
        product.detail[index][e.target.name] = e.target.value;
        setProduct({ ...product });
    }

    const handleSkus = (e, index) => {
        product.skus[index][e.target.name] = e.target.value;
        setProduct({ ...product });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        if (nameRef.current.value !== product.name) {
            product.name = nameRef.current.value;
        }

        if (descRef.current.value !== product.description) {
            product.description = descRef.current.value;
        }

        if (costRef.current.value !== product.cost) {
            product.cost = costRef.current.value;
        }

        product.cost += " VNĐ";
        product.total = product.skus.reduce((total, sku) => {
            return total + parseInt(sku.quantity);
        }, 0);

        // Check data is changed
        const prevProduct = JSON.parse(localStorage.getItem("product"));
        if (JSON.stringify(product) === JSON.stringify(prevProduct)) {
            setError("Dữ liệu chưa thay đổi!");
            return;
        }

        const productObj = {
            category: product.category,
            cost: product.cost,
            createdAt: product.createdAt,
            description: product.description,
            detail: product.detail,
            name: product.name,
            photos: product.photos,
            skus: product.skus,
            total: product.total,
        };

        setDoc(doc(db, "products", product.id), productObj).then(() => {
            localStorage.removeItem("product");
        });

        navigate("/product");
    };

    if (!product) {
        return (
            <section>
                <Loading />
            </section>
        );
    }

    return (
        <section className="flow">
            <h5>Chỉnh sửa thông tin sản phẩm</h5>
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
                {/* Hình ảnh */}
                <div className="fs-400" style={{ fontWeight: "700" }}>
                    Hình ảnh
                </div>
                <div className="d-flex" style={{ flexWrap: "wrap" }}>
                    {product.photos.map((photoUrl, index) => (
                        <div
                            key={index}
                            className="form--photos"
                            style={{ width: "10rem" }}
                        >
                            <img src={photoUrl} alt="product img" />
                        </div>
                    ))}
                </div>
                {/* Thông tin chung */}
                <div className="fs-400" style={{ fontWeight: "700" }}>
                    Thông tin chung
                </div>
                <div className="form--group">
                    <input
                        className="form--input"
                        type="text"
                        id="name"
                        ref={nameRef}
                        placeholder=" "
                    />
                    <label className="form--label" htmlFor="name">
                        Nhập tên:
                    </label>
                </div>
                <div className="form--group">
                    <input
                        className="form--input"
                        type="text"
                        id="desc"
                        ref={descRef}
                        placeholder=" "
                    />
                    <label className="form--label" htmlFor="desc">
                        Nhập mô tả:
                    </label>
                </div>
                <div className="form--group">
                    <input
                        className="form--input"
                        type="number"
                        id="cost"
                        ref={costRef}
                        placeholder=" "
                    />
                    <label className="form--label" htmlFor="cost">
                        Nhập giá:
                    </label>
                </div>
                {/* Thông tin sản phẩm */}
                <div className="fs-400" style={{ fontWeight: "700" }}>
                    Thông tin chi tiết
                </div>
                {detailFields.map(({ name, label }, index) => (
                    <div className="form--group" key={index}>
                        <input
                            className="form--input"
                            type="text"
                            id={name}
                            name={name}
                            value={product.detail[index][name]}
                            onChange={(e) => handleDetail(e, index)}
                            placeholder=" "
                        />
                        <label className="form--label" htmlFor={name}>
                            Nhập {label}:
                        </label>
                    </div>
                ))}
                {/* Hàng tồn */}
                <div className="fs-400" style={{ fontWeight: "700" }}>
                    Thông tin thêm
                </div>
                {product.skus.map((sku, index) => (
                    <div className="d-flex" key={index}>
                        <div className="form--group" style={{ flex: 1 }}>
                            <input
                                className="form--input"
                                id={"color" + index}
                                name="color"
                                value={sku.color}
                                onChange={(e) => handleSkus(e, index)}
                                placeholder=" "
                                type="text"
                            />
                            <label
                                className="form--label"
                                htmlFor={"color" + index}
                            >
                                Nhập màu:
                            </label>
                        </div>
                        <div className="form--group" style={{ flex: 1 }}>
                            <input
                                className="form--input"
                                id={"quantity" + index}
                                name="quantity"
                                value={sku.quantity}
                                onChange={(e) => handleSkus(e, index)}
                                type="number"
                                placeholder=" "
                            />
                            <label
                                className="form--label"
                                htmlFor={"quantity" + index}
                            >
                                Nhập số lượng:
                            </label>
                        </div>
                    </div>
                ))}
                <button
                    className="button text--center"
                    button-variant="contained"
                    button-color="green"
                    ref={buttonRef}
                >
                    cập nhật
                </button>
            </form>
        </section>
    );
};

export default EditProduct;
