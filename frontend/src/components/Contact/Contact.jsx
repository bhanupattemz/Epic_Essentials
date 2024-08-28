import "./Contact.css";
import { useEffect, useState, useRef } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { SiEslgaming } from "react-icons/si";
import MetaData from "../layout/MetaData";
export default function Contact() {

    return (
        <main className="contact-page-main">
            <MetaData title="contact-Epic Essentials" />
            <section className="contact-page-main-container">
                <div className="contact-page-img-container">
                    <div>
                        <img className="contact-page-img" src="https://res.cloudinary.com/dmvxvzb5n/image/upload/v1724505466/Epic%20Essentials/pxrefgfuezad1izbhtpm.png" alt="logo-img" />
                        <h1>Contact Us</h1>
                    </div>

                    <div>
                        <p>
                            Use the contact form for all information requests or contact us directly using the contact information below.
                        </p>
                    </div>

                </div>
                <div className="contact-page-data-container">
                    <div>
                        <SiEslgaming />
                        <div>
                            <h2>
                                ABOUT US
                            </h2>
                            <p>abcd</p>
                        </div>
                    </div>
                    <div>

                        <FaPhoneAlt />

                        <div>
                            <h2>
                                PHONE
                            </h2>
                            <p>8555860089</p>
                        </div>
                    </div>
                    <div>

                        <FaLocationDot />

                        <div>
                            <h2>OUR LOCATION</h2>
                            <p>ELLORA HOSTEL/ROOM NO-137 JNTUA COLLEGE OF ENGINEERING ANANTAPUR Anantapur Andhra Pradesh India-515002</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="contact-page-upper-container">

            </section>
            <section className="contact-page-lower-container">

            </section>

        </main>
    );
}
