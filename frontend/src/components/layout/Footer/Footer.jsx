import "./Footer.css"
import { IoLogoApple, IoLogoAndroid } from "react-icons/io";
import { FaFacebookSquare, FaTwitterSquare ,FaInstagram} from "react-icons/fa";
export default function Footer() {
    return (
        <footer>
            <div className="left-part">
                <h4>Download our App</h4>
                <p>Download our App for Android and ios</p>
                <button><IoLogoAndroid className="logos"/>Android</button>
                <button><IoLogoApple className="logos"/>Iphone</button>
            </div>
            <div className="middle-part">
                <h1>Epic Eccentials</h1>
                <p>High quality is our first  priority</p>
                <span>© EpicEcentials 2024 by BhanuPattemz</span>
            </div>
            <div className="right-part">
                <h4>Follow us</h4>
                <a href=""><FaInstagram /> instagram</a>
                <a href=""><FaTwitterSquare /> twitter</a>
                <a href=""><FaFacebookSquare /> facebook</a>
            </div>
        </footer>
    )
}