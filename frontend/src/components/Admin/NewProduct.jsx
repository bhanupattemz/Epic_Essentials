import React, { useState, Fragment } from "react";
import SideBar from "./SideBar";
import "./NewProduct.css";
import { BsAlphabetUppercase, BsBoxes } from "react-icons/bs";
import { FaRupeeSign } from "react-icons/fa";
import { CgDetailsMore } from "react-icons/cg";
import { BiSolidCategory } from "react-icons/bi";
import { CiImageOn } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { adminCreateProduct } from "../../actions/ProductAction";
import Loader from "../layout/Loader/Loader";
import { useNavigate } from "react-router-dom";
import { IoIosRemoveCircle } from "react-icons/io";
import { useAlert } from "react-alert"
import SpecificationShow from "./Specification"
import MetaData from "../layout/MetaData";
export default function NewProduct() {
    const alert = useAlert()
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.products);


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
        "Speakers",
        "Gaming Bag",
        "VR Headset",
        "Gaming Console",
        "Gaming Laptop"
    ];

    const [data, setData] = useState({
        name: "",
        price: 0,
        description: "",
        category: "",
        stock: 0,
    });

    const [imgprev, setImgPrev] = useState([]);
    const [image, setImage] = useState([]);
    const [specifications, setSpecifications] = useState([])
    const [speciClick, setSpeciClick] = useState(false)
    const [keyval, setkeyValue] = useState({
        key: "",
        value: ""
    })
    const delSpecification = (key) => {
        const data = specifications.filter((item) => item.key !== key)
        setSpecifications(data)
    }
    const formSubmitHandler = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("name", data.name);
        myForm.set("price", data.price);
        myForm.set("discription", data.description);
        myForm.set("stock", data.stock);
        myForm.set("category", data.category);
        image.forEach((file) => {
            myForm.append("images", file);
        });
        myForm.set("specifications", JSON.stringify(specifications))
        dispatch(adminCreateProduct(myForm));
        navigate("/admin/dashboard");
    };

    const removeImgHandler = (img) => {
        setImage((img) => img.filter((item) => item !== img));
        setImgPrev((prevImgPrev) => prevImgPrev.filter((item) => item !== img));
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImage(files);

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

    return (
        <Fragment>
            <MetaData title="Admin Add Product -- Epic Essentials" />
            {loading ? <Loader /> :
                <main className="new-product-main">

                    <section className="new-product-sidebar">
                        <SideBar />
                    </section>
                    <section className="new-product-main-container">
                        <h2>Create Product</h2>
                        {speciClick ?
                            <div className="new-product-specification-container">
                                <div>
                                    <form className="new-product-specification-form">
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
                            <form onSubmit={formSubmitHandler} className="new-product-form" encType="multipart/form-data">
                                <div className="new-product-input-div">
                                    <label htmlFor="name"><BsAlphabetUppercase /></label>
                                    <input
                                        type="text"
                                        id="name"
                                        placeholder="Name"
                                        name="name"
                                        onChange={(e) => setData({ ...data, name: e.target.value })}
                                        value={data.name}
                                        required
                                    />
                                </div>
                                <div className="new-product-input-div">
                                    <label htmlFor="price"><FaRupeeSign /></label>
                                    <input
                                        type="number"
                                        id="price"
                                        placeholder="Price"
                                        name="price"
                                        onChange={(e) => setData({ ...data, price: e.target.value })}
                                        value={data.price}
                                        required
                                    />
                                </div>
                                <div className="new-product-input-div">
                                    <label htmlFor="description"><CgDetailsMore /></label>
                                    <input
                                        type="text"
                                        id="description"
                                        placeholder="Description"
                                        name="description"
                                        onChange={(e) => setData({ ...data, description: e.target.value })}
                                        value={data.description}
                                        required
                                    />
                                </div>
                                <div className="new-product-input-div">
                                    <label htmlFor="category"><BiSolidCategory /></label>
                                    <select
                                        name="category"
                                        id="category"
                                        onChange={(e) => setData({ ...data, category: e.target.value })}
                                        required
                                    >
                                        <option value="">{data.category !== '' ? data.category : "Select Category"}</option>
                                        {categoryData.map((item) => (
                                            <option key={item} value={item}>{item}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="new-product-input-div">
                                    <label htmlFor="stock"><BsBoxes /></label>
                                    <input
                                        type="number"
                                        id="stock"
                                        placeholder="Stock"
                                        name="stock"
                                        onChange={(e) => setData({ ...data, stock: e.target.value })}
                                        value={data.stock}
                                        required
                                    />
                                </div>
                                <div className="new-product-input-div">
                                    <p type="none" onClick={() => setSpeciClick(val => !val)}>ADD SPECIFICATIONS</p>
                                </div>
                                <div className="new-product-input-div">
                                    <label htmlFor="image">
                                        <CiImageOn />
                                    </label>
                                    <input
                                        type="file"
                                        id="image"
                                        name="image"
                                        multiple
                                        onChange={handleImageChange}

                                    />
                                </div>

                                {imgprev.length > 0 &&
                                    <div className="new-product-prev-images">
                                        {imgprev.map((img, index) => (
                                            <div key={index}>
                                                <p className="new-product-remove-img-btn" onClick={() => removeImgHandler(img)}>
                                                    <IoIosRemoveCircle />
                                                </p>
                                                <img src={img} alt="Product Preview" />
                                            </div>
                                        ))}
                                    </div>
                                }
                                <button className="new-product-btn" type="submit">Create Product</button>
                            </form>
                        }

                    </section>

                </main>

            }
        </Fragment>
    );
}
