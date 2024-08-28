import "./Carousel.css";
import { useEffect, useState, useRef } from "react";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import Catagory from "./Catagory";
import { getProducts } from "../../../actions/ProductAction"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
export default function Carousel() {
    const [imgNo, setImgNo] = useState(0);
    const leftbtn = useRef(null);
    const rightbtn = useRef(null);
    const carouselRef = useRef(null);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    const phonelinkhandler = async () => {
        await dispatch(getProducts({ category: "Phone" }))
        navigate("/products")
    }

    const carouselImg = [
        "https://res.cloudinary.com/dmvxvzb5n/image/upload/v1724852807/Epic%20Essentials/b7zbmawfsg2bgoyfffst.jpg",
        "https://res.cloudinary.com/dmvxvzb5n/image/upload/v1724854683/Epic%20Essentials/ixfrvtf6qrucjnqraebm.webp",
        "https://res.cloudinary.com/dmvxvzb5n/image/upload/v1724854619/Epic%20Essentials/lcfnruuzkk1cixqjigti.webp",
        "https://res.cloudinary.com/dmvxvzb5n/image/upload/v1724854252/Epic%20Essentials/ko7nq17dmtenknjclntd.png"
    ];
    const links = [
        "/products",
        "/products/668904d9ced7b96fdac05a9f",
        phonelinkhandler,
        "/products"
    ]
    const len = carouselImg.length;

    useEffect(() => {
        const intervalId = setInterval(() => {
            setImgNo(no => (no + 1) % len);
        }, 5000);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        const wrapper = carouselRef.current;
        if (wrapper) {
            wrapper.style.transform = `translateX(-${imgNo * 100}%)`;
        }
    }, [imgNo]);

    const carouselLeftbtnHandler = async () => {
        setImgNo(no => (no - 1 + len) % len);
        leftbtn.current.classList.add("carousel-btn-click");
        await sleep(300);
        leftbtn.current.classList.remove("carousel-btn-click");
    };

    const carouselRightbtnHandler = async () => {
        setImgNo(no => (no + 1) % len);
        rightbtn.current.classList.add("carousel-btn-click");
        await sleep(300);
        rightbtn.current.classList.remove("carousel-btn-click");
    };

    return (
        <section >
            <section className="home-page-carousel">

                <div className="carousel-wrapper" ref={carouselRef}>
                    {carouselImg.map((item, index) => (
                        <div className="home-img-item" key={index} style={{ opacity: imgNo === index ? 1 : 0 }}>
                            <img src={item} alt="carousel-image" />
                        </div>
                    ))}
                </div>
                <div className="home-img-item-indi">
                    {carouselImg.map((_, index) => (
                        <div key={index} className={imgNo === index ? "active" : ""}></div>
                    ))}
                </div>
                <div className="home-page-carousel-btn">
                    <div className="left-btn" onClick={carouselLeftbtnHandler} ref={leftbtn}><KeyboardArrowLeftIcon /></div>
                    <div onClick={()=>{
                        imgNo == 2 && links[imgNo]
                        navigate(links[imgNo])
                    }
                        } className="middle-carousel-anch"></div>
                    <div className="right-btn" onClick={carouselRightbtnHandler} ref={rightbtn}><KeyboardArrowRightIcon /></div>
                </div>

            </section>
            <section>
                <Catagory />
            </section>
        </section>
    );
}