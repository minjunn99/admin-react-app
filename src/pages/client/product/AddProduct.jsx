// Import library
import React, { useEffect, useRef, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { AiFillPlusSquare } from "react-icons/ai";
import { TiDelete } from "react-icons/ti";

// Import component
import categoryProduct from "../../../utils/categoryProduct";
import ProductConstructor from "../../../utils/ProductConstructor";
import dateFormat from "../../../utils/dateFormat";

import { db, storage } from "../../../firebase/firebaseConfig";

const AddProduct = () => {
    const photoRef = useRef();
    const nameRef = useRef();
    const descRef = useRef();
    const costRef = useRef();
    const [error, setError] = useState("");
    const [categoryIndex, setCategoryIndex] = useState(0);
    const [images, setImages] = useState([]);
    const [details, setDetails] = useState([]);
    const [skus, setSkus] = useState([
        {
            color: "",
            quantity: 0,
        },
    ]);

    const navigate = useNavigate();

    const product = useMemo(() => {
        const result = new ProductConstructor();
        return result;
    }, []);

    useEffect(() => {
        const { detailFields } = categoryProduct[categoryIndex];
        const detailFieldsRs = [];
        detailFields.forEach(({ name }) => {
            detailFieldsRs.push({ [name]: "" });
        });
        setDetails(detailFieldsRs);
    }, [categoryIndex]);

    function handleClicktoOpenFile() {
        photoRef.current.click();
    }

    function handleFileChange(e) {
        setImages([...images, e.target.files[0]]);
    }

    function handleDelImage(index) {
        const image = images[index];
        const imagesFilter = images.filter((image, idx) => idx !== index);
        setImages(imagesFilter);

        // Remove data image blob
        URL.revokeObjectURL(image.preview);
    }

    const handleCategory = (index) => {
        setCategoryIndex(index);
    };

    const handleDetail = (e, index) => {
        details[index][e.target.name] = e.target.value;
    };

    const handleCreateSku = () => {
        const sku = {
            color: "",
            quantity: 0,
        };

        setSkus([...skus, sku]);
    };

    const handleSkus = (e, index) => {
        skus[index][e.target.name] = e.target.value;
    };

    async function uploadAndGetPhotoUrl(photo) {
        const imgRef = ref(
            storage,
            `product/${nameRef.current.value}/${nameRef.current.value + v4()}`
        );

        await uploadBytes(imgRef, photo);
        return getDownloadURL(imgRef);
    }

    async function getAllUrls() {
        const urls = await Promise.all(
            [...images].map((image) => uploadAndGetPhotoUrl(image))
        );
        return urls;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Set error empty
        setError("");

        // Validation
        if (
            !nameRef ||
            !descRef ||
            !costRef ||
            !images.length ||
            !skus.length
        ) {
            setError("B???n c???n nh???p ????? th??ng tin s???n ph???m");
            return;
        }

        // Update data of product
        product.name = nameRef.current.value;
        product.description = descRef.current.value;
        product.detail = [...details];
        product.skus = skus;
        product.cost = costRef.current.value + " VN??";
        product.total = product.skus.reduce((total, sku) => {
            return total + parseInt(sku.quantity);
        }, 0);
        product.createdAt = dateFormat(Date.now());

        // Upload and get photo url of product
        product.photos = await getAllUrls();

        // Create product collection in firestore
        await addDoc(collection(db, "products"), {
            ...product,
            category: categoryProduct[categoryIndex].category,
            slug: categoryProduct[categoryIndex].slug,
            categoryDetail: categoryProduct[categoryIndex].name,
        });

        // Navigate for product page
        navigate("/product");
    };

    return (
        <section className="flow" onSubmit={handleSubmit}>
            <h5>Th??m m???i s???n ph???m</h5>
            <form className="form form--manage">
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
                {/* H??nh ???nh */}
                <div className="fs-400" style={{ fontWeight: "700" }}>
                    H??nh ???nh
                </div>
                <div className="d-flex" style={{ flexWrap: "wrap" }}>
                    <div
                        className="d-flex justify--center items--center"
                        style={{
                            width: "5rem",
                            height: "5rem",
                            border: "thin dashed",
                            cursor: "pointer",
                        }}
                        onClick={handleClicktoOpenFile}
                    >
                        <AiFillPlusSquare />
                        <input
                            type="file"
                            id="file"
                            ref={photoRef}
                            onChange={handleFileChange}
                            accept="image/*"
                            style={{ display: "none" }}
                        />
                    </div>
                    {images.map((image, index) => {
                        const file = image;
                        file.preview = URL.createObjectURL(file);

                        return (
                            <div key={index} className="form--photos">
                                <span
                                    onClick={() => handleDelImage(index)}
                                    className="d-inline-block"
                                >
                                    <TiDelete />
                                </span>
                                <img src={file.preview} alt="product img" />
                            </div>
                        );
                    })}
                </div>
                {/* Th??ng tin chung */}
                <div className="fs-400" style={{ fontWeight: "700" }}>
                    Th??ng tin chung
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
                        Nh???p t??n:
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
                        Nh???p m?? t???:
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
                        Nh???p gi??:
                    </label>
                </div>
                {/* C??c lo???i s???n ph???m */}
                <div className="fs-400" style={{ fontWeight: "700" }}>
                    Lo???i s???n ph???m
                </div>
                {/* Th??ng tin s???n ph???m */}
                <div className="fs-400" style={{ fontWeight: "700" }}>
                    Th??ng tin chi ti???t
                </div>
                <div className="d-flex" style={{ flexWrap: "wrap" }}>
                    {categoryProduct.map((category, index) => (
                        <div
                            key={index}
                            className={`form--button ${
                                categoryIndex === index ? "active" : ""
                            }`}
                            onClick={() => handleCategory(index)}
                        >
                            {category.name}
                        </div>
                    ))}
                </div>
                {categoryProduct[categoryIndex].detailFields.map(
                    ({ name, label }, index) => (
                        <div className="form--group" key={index}>
                            <input
                                className="form--input"
                                type="text"
                                id={name}
                                name={name}
                                onChange={(e) => handleDetail(e, index)}
                                placeholder=" "
                            />
                            <label className="form--label" htmlFor={name}>
                                Nh???p {label}:
                            </label>
                        </div>
                    )
                )}
                {/* Nh???p th??ng tin th??m */}
                <div className="fs-400" style={{ fontWeight: "700" }}>
                    Th??ng tin th??m
                </div>
                {skus.map((sku, index) => (
                    <div className="d-flex" key={index}>
                        <div className="form--group" style={{ flex: 1 }}>
                            <input
                                className="form--input"
                                id={"color" + index}
                                name="color"
                                onChange={(e) => handleSkus(e, index)}
                                placeholder=" "
                                type="text"
                            />
                            <label
                                className="form--label"
                                htmlFor={"color" + index}
                            >
                                Nh???p m??u:
                            </label>
                        </div>
                        <div className="form--group" style={{ flex: 1 }}>
                            <input
                                className="form--input"
                                id={"quantity" + index}
                                name="quantity"
                                onChange={(e) => handleSkus(e, index)}
                                type="number"
                                placeholder=" "
                            />
                            <label
                                className="form--label"
                                htmlFor={"quantity" + index}
                            >
                                Nh???p s??? l?????ng:
                            </label>
                        </div>
                    </div>
                ))}
                <div>
                    <div
                        className="button fs-200"
                        button-variant="outlined"
                        button-color="green"
                        onClick={handleCreateSku}
                    >
                        th??m lo???i
                    </div>
                </div>
                <button
                    className="button"
                    button-variant="contained"
                    button-color="green"
                >
                    th??m m???i
                </button>
            </form>
        </section>
    );
};

export default AddProduct;
