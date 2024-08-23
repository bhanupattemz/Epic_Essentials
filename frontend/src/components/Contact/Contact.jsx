import "./Contact.css";
import { useEffect, useState, useRef } from "react";

export default function Contact() {
    const [imgNo, setImgNo] = useState(0);
    const leftbtn = useRef(null);
    const rightbtn = useRef(null);
    const carouselRef = useRef(null);

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const carouselImg = [
        "https://res.cloudinary.com/dmvxvzb5n/image/upload/v1723467716/Epic%20Essentials/web%20%20images/huo9hxlsfqjfpzn1rfcc.jpg",
        "https://res.cloudinary.com/dmvxvzb5n/image/upload/v1723468886/Epic%20Essentials/web%20%20images/ochox8hla8nitr2umrsm.jpg",
        "https://res.cloudinary.com/dmvxvzb5n/image/upload/v1723471507/Epic%20Essentials/web%20%20images/w1d4ra8xx6iuorpw4mxf.jpg"
    ];
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
        <main className="home-page-main">
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
                    <div className="left-btn" onClick={carouselLeftbtnHandler} ref={leftbtn}></div>
                    <div className="right-btn" onClick={carouselRightbtnHandler} ref={rightbtn}></div>
                </div>
            </section>
            <h1>Hello</h1>
        </main>
    );
}
