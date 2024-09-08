import { ReactNavbar } from "overlay-navbar"
import { CiSearch } from "react-icons/ci";
import "./Header.css"
import { MdAccountBox } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux"
export default function Header() {
    const { user } = useSelector(state => state.user)
    const logo="https://res.cloudinary.com/dmvxvzb5n/image/upload/v1725770520/Epic%20Essentials/ih7ard1tpyp9rzempw1q.png"
    return (
        <div className="header">
            <ReactNavbar
                burgerColorHover="#03AED2"
                logo={logo}
                logoWidth="100%"
                navColor1="white"
                logoHoverSize="10px"
                logoHoverColor="#03AED2"
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
                link1ColorHover="#03AED2"
                link1Margin="1vmax"
                profileIconColor="rgba(35, 35, 35, 0.8)"
                searchIconColor="rgba(35, 35, 35, 0.8)"
                cartIconColor="rgba(35, 35, 35, 0.8)"
                profileIconColorHover="#03AED2"
                searchIconColorHover="#03AED2"
                cartIconMargin="1vmax"
            />
        </div>
    )
}