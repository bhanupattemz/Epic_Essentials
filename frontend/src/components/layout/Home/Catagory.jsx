import { Fragment } from "react"
import "./Catagory.css"
import {useDispatch} from "react-redux"
import {useNavigate} from "react-router-dom"
import { getProducts } from "../../../actions/ProductAction"
export default function Catagory() {
    const categoryList = [
        { name: "Phone", url: "https://res.cloudinary.com/dmvxvzb5n/image/upload/v1723487059/Epic%20Essentials/web%20%20images/mh7g10cd1ie1uxwjugbo.png" },
        { name: "Monitor", url: "https://res.cloudinary.com/dmvxvzb5n/image/upload/v1723487060/Epic%20Essentials/web%20%20images/tkdlnfagjoci64pbkwl6.png" },
        { name: "Mouse", url: "https://res.cloudinary.com/dmvxvzb5n/image/upload/v1723487061/Epic%20Essentials/web%20%20images/zeqh2s6krq52mvvbvb12.png" },
        { name: "Chair", url: "https://res.cloudinary.com/dmvxvzb5n/image/upload/v1723487061/Epic%20Essentials/web%20%20images/pxbeddnqihbjtcodjv5p.png" },
        { name: "Desk", url: "https://res.cloudinary.com/dmvxvzb5n/image/upload/v1723487059/Epic%20Essentials/web%20%20images/eyx2gn7mxtyuup4gyw0u.png" },
        { name: "Keyboard", url: "https://res.cloudinary.com/dmvxvzb5n/image/upload/v1723487066/Epic%20Essentials/web%20%20images/luqimfwr9rkggkkhbyyg.png" },
        { name: "Headset", url: "https://res.cloudinary.com/dmvxvzb5n/image/upload/v1723487057/Epic%20Essentials/web%20%20images/pnqqsifegglwzqgovhua.png" },
        { name: "PC", url: "https://res.cloudinary.com/dmvxvzb5n/image/upload/v1723487067/Epic%20Essentials/web%20%20images/kptexeclab4tcsjwpuj5.png" },
        { name: "Mousepad", url: "https://res.cloudinary.com/dmvxvzb5n/image/upload/v1723487058/Epic%20Essentials/web%20%20images/rh3gddpf5qmcmytqus2e.png" },
        { name: "Controller", url: "https://res.cloudinary.com/dmvxvzb5n/image/upload/v1723487058/Epic%20Essentials/web%20%20images/hjidkfeovmnibsmhmk9b.png" },
        { name: "Speakers", url: "https://res.cloudinary.com/dmvxvzb5n/image/upload/v1723487056/Epic%20Essentials/web%20%20images/ran0kjevhyvgdeu3kldt.png" },
        { name: "Gaming Bag", url: "https://res.cloudinary.com/dmvxvzb5n/image/upload/v1723657710/Epic%20Essentials/web%20%20images/n3p39bu6p2ehosgxejrg.png" },
        { name: "VR Headset", url: "https://res.cloudinary.com/dmvxvzb5n/image/upload/v1723658169/Epic%20Essentials/web%20%20images/sw5n57xrsk2jcyuw8ps5.png" },
        { name: "Gaming Console", url: "https://res.cloudinary.com/dmvxvzb5n/image/upload/v1723488507/Epic%20Essentials/web%20%20images/ty0ns2ntbz7rr3qxb5l6.png" },
        { name: "Gaming Laptop", url: "https://res.cloudinary.com/dmvxvzb5n/image/upload/v1723488144/Epic%20Essentials/web%20%20images/tf7d4uhafptklqreqecv.png" }
    ];
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const itemClickHandler = async (item) => {
        // await dispatch(getProducts({category:item.name}))
        navigate(`/products?category=${item.name}`)
    }

    return (
        <Fragment>
            <section className="home-catogory">
                <h2 className="home-catagory-heading">Catagory</h2>
                <div>
                    {categoryList.map((item) => {
                        return (
                            <div key={item.name} className="catagory-item" onClick={() => itemClickHandler(item)}>
                                <img src={item.url} alt={`${item.name}-img`} />
                                <p>{item.name}</p>
                            </div>
                        )
                    })}
                </div>
            </section>

        </Fragment>

    )
}