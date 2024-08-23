import { ReactNavbar } from "overlay-navbar"
import logo from "../../../assets/react.svg"
import { CiSearch } from "react-icons/ci";
import "./Header.css"
import { MdAccountBox } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux"
export default function Header() {
    const { user } = useSelector(state => state.user)
    return (
        <div className="header">
            <ReactNavbar
                burgerColorHover="#eb4034"
                logo={logo}
                logoWidth="20vmax"
                navColor1="white"
                logoHoverSize="10px"
                logoHoverColor="#eb4034"
                link1Text="Home"
                link2Text="Products"
                link3Text="Contact"
                link4Text={!user && "Login/SignUp"}
                link4Url={!user && "/loginsignup"}
                link1Url="/"
                link2Url="/products"
                link3Url="/contact"
                link1Size="1.3vmax"
                searchIcon="true"
                SearchIconElement={CiSearch}
                searchIconUrl="/search"
                profileIcon={user && "true"}
                profileIconUrl="profile"
                ProfileIconElement={MdAccountBox}
                cartIcon={user && "true"}
                cartIconUrl="/cart"
                CartIconElement={FaShoppingCart}
                link1Color="rgba(35, 35, 35, 0.8)"
                nav1justifyContent="flex-end"
                nav2justifyContent="flex-end"
                nav3justifyContent="flex-start"
                nav4justifyContent="flex-start"
                link1ColorHover="#eb4034"
                link1Margin="1vmax"
                profileIconColor="rgba(35, 35, 35, 0.8)"
                searchIconColor="rgba(35, 35, 35, 0.8)"
                cartIconColor="rgba(35, 35, 35, 0.8)"
                profileIconColorHover="#eb4034"
                searchIconColorHover="#eb4034"
                cartIconMargin="1vmax"

            />
        </div>
    )
}