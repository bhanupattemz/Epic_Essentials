import React, { useEffect, Fragment, useState } from "react";
import SideBar from "./SideBar";
import "./UpdateProduct.css";
import { BsAlphabetUppercase } from "react-icons/bs";
import { FaRupeeSign } from "react-icons/fa";
import { CgDetailsMore } from "react-icons/cg";
import { BiSolidCategory } from "react-icons/bi";
import { CiImageOn } from "react-icons/ci";
import { BsBoxes } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { adminUpdateProduct, getProductDetails } from "../../actions/ProductAction";
import Loader from "../layout/Loader/Loader";
import { useNavigate, useParams } from "react-router-dom";
import { IoIosRemoveCircle } from "react-icons/io";
import SpecificationShow from "./Specification"
import { useAlert } from "react-alert"
import MetaData from "../layout/MetaData";
export default function UpdateProduct() {
    const alert = useAlert()
    const navigate = useNavigate();
    const { _id } = useParams();
    const categoryData = [
        "Phone",
        "Monitor",
        "Mouse",
        "Chair",
        "Desk",
        "Keyboard",
        "Headset",
        "PC",
        "Mousepad",
        "Controller",
        "Speakers"
    ];
    const { product } = useSelector(state => state.productDetails);
    const { loading } = useSelector(state => state.products)
    const [delImages, setDelImages] = useState([]);
    const [data, setData] = useState({
        name: product?.name || "",
        price: product?.price || "",
        description: product?.discription || "",
        category: product?.category || "",
        stock: product?.stock || "",
    });

    const [imgPrev, setImgPrev] = useState([]);
    const [images, setImages] = useState([]);
    const [specifications, setSpecifications] = useState(product.specifications || [])
    const [speciClick, setSpeciClick] = useState(false)
    const [keyval, setkeyValue] = useState({
        key: "",
        value: ""
    })
    const delSpecification = (key) => {
        const data = specifications.filter((item) => item.key !== key)

        setSpecifications(data)
    }
    const specificationsAddHandler = (e) => {
        e.preventDefault()
        let dup = false;
        for (let item of specifications) {
            if (item.key === keyval.key) {
                dup = true
            }
        }
        if (dup) {
            alert.error("specification already Init")
        } else {

            setSpecifications(val => [...val, keyval])

        }
    }
    const dispatch = useDispatch();

    const formSubmitHandler = (e) => {
        e.preventDefault();
        const myForm = new FormData();

        myForm.set("name", data.name);
        myForm.set("price", data.price);
        myForm.set("discription", data.description);
        myForm.set("stock", data.stock);
        myForm.set("category", data.category);
        images.forEach((file) => {
            myForm.append("images", file);
        });
        delImages.forEach((url) => {
            product.images.forEach((img) => {
                if (img.url === url) {
                    myForm.append("delImages", img.public_id);
                }
            });
        });
        myForm.set("specifications", JSON.stringify(specifications))
        dispatch(adminUpdateProduct(myForm, _id))
            .then(() => {
                navigate(`/products/${_id}`);
            })
            .catch((error) => {
                console.error("Error updating product:", error);
            });
    };


    const removeImgHandler = (img) => {
        setDelImages((prevDelImages) => [...prevDelImages, img]);
        setImgPrev((prevImgPrev) => prevImgPrev.filter((item) => item !== img));
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImages(files);

        files.forEach((file) => {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImgPrev((prev) => [...prev, reader.result]);
                }
            };
            reader.readAsDataURL(file);
        });
    };

    useEffect(() => {
        if (product && product.images) {
            setImgPrev(product.images.map((img) => img.url));
            setData({
                name: product?.name || "",
                price: product?.price || "",
                description: product?.discription || "",
                category: product?.category || "",
                stock: product?.stock || "",
            })
        }
    }, [product]);

    useEffect(() => {
        if (_id) {
            dispatch(getProductDetails(_id));
        }
    }, [_id, dispatch]);

    return (
        <Fragment>
            <MetaData title="Admin Update Product -- Epic Essentials" />
            {loading ? <Loader /> :
                <main className="update-product-main">
                    <section className="update-product-sidebar">
                        <SideBar />
                    </section>
                    <section className="update-product-main-container">
                        <h2>Update Product</h2>
                        {speciClick ?
                            <div className="update-product-specification-container">
                                <div>
                                    <form className="update-product-specification-form">
                                        <div>
                                            <label htmlFor="type">Type: </label>
                                            <input type="text" id="type" name="key" value={keyval.key} onChange={(e) => setkeyValue({ ...keyval, key: e.target.value })} required />
                                        </div>
                                        <div>
                                            <label htmlFor="value">Value: </label>
                                            <input type="text" id="value" name="value" value={keyval.value} onChange={(e) => setkeyValue({ ...keyval, value: e.target.value })} required />
                                        </div>
                                        <button onClick={specificationsAddHandler}>ADD</button>
                                    </form>
                                </div>
                                <div>
                                    {specifications.length > 0 && <SpecificationShow items={specifications} delHandler={delSpecification} />}
                                </div>
                                <button onClick={() => setSpeciClick(false)}>Back</button>
                            </div> :
                            <form onSubmit={formSubmitHandler} className="update-product-form" encType="multipart/form-data">
                                <div className="update-product-input-div">
                                    <label htmlFor="name"><BsAlphabetUppercase /></label>
                                    <input
                                        type="text"
                                        id="name"
                                        placeholder="name"
                                        name="name"
                                        onChange={(e) => setData({ ...data, name: e.target.value })}
                                        value={data.name}
                                        required
                                    />
                                </div>
                                <div className="update-product-input-div">
                                    <label htmlFor="price"><FaRupeeSign /></label>
                                    <input
                                        type="number"
                                        id="price"
                                        placeholder="price"
                                        name="price"
                                        onChange={(e) => setData({ ...data, price: e.target.value })}
                                        value={data.price}
                                        required
                                    />
                                </div>
                                <div className="update-product-input-div">
                                    <label htmlFor="description"><CgDetailsMore /></label>
                                    <input
                                        type="text"
                                        id="description"
                                        placeholder="description"
                                        name="description"
                                        onChange={(e) => setData({ ...data, description: e.target.value })}
                                        value={data.description}
                                        required
                                    />
                                </div>
                                <div className="update-product-input-div">
                                    <label htmlFor="category"><BiSolidCategory /></label>
                                    <select
                                        name="category"
                                        id="category"
                                        onChange={(e) => setData({ ...data, category: e.target.value })}
                                        value={data.category}
                                        required
                                    >
                                        <option>{data.category ? data.category : "Select Category"}</option>
                                        {categoryData.map((item) => (
                                            <option key={item} value={item}>{item}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="update-product-input-div">
                                    <label htmlFor="stock"><BsBoxes /></label>
                                    <input
                                        type="number"
                                        id="stock"
                                        placeholder="stock"
                                        name="stock"
                                        onChange={(e) => setData({ ...data, stock: e.target.value })}
                                        value={data.stock}
                                        required
                                    />
                                </div>
                                <div className="update-product-input-div">
                                    <p type="none" onClick={() => setSpeciClick(val => !val)}>UPDATE SPECIFICATIONS</p>
                                </div>
                                <div className="update-product-input-div">
                                    <label htmlFor="image">
                                        <CiImageOn />
                                    </label>
                                    <input
                                        type="file"
                                        id="image"
                                        name="image"
                                        multiple
                                        onChange={handleImageChange}
                                        required={!product || !product.images || product.images.length === 0}
                                    />
                                </div>
                                {imgPrev.length > 0 &&
                                    (<div className="update-product-prev-images">
                                        {imgPrev.map((img, index) => (
                                            <div key={index}>
                                                <p className="update-product-remove-img-btn" onClick={() => removeImgHandler(img)}>
                                                    <IoIosRemoveCircle />
                                                </p>
                                                <img src={img} alt="product-img" />
                                            </div>
                                        ))}
                                    </div>)
                                }

                                <button type="submit" className="update-product-btn">Update Product</button>
                            </form>
                        }

                    </section>

                </main>}
        </Fragment>
    );
}
