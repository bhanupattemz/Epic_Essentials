import { ReactNavbar } from "overlay-navbar"
import logo from "../../../assets/react.svg"
import { CiSearch } from "react-icons/ci";
import "./Header.css"

export default function Header() {
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
            link4Text="About"
            link1Url="/"
            link2Url="/products"
            link3Url="/contact"
            link4Url="/about"
            link1Size="1.3vmax"
            searchIcon="true"
            SearchIconElement={CiSearch}
            searchIconUrl="/search"
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