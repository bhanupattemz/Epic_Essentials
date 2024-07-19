import "./Search.css"
export default function NoProductFound() {
    return (
        <div className="no-products-found">
            <img src="https://res.cloudinary.com/dmvxvzb5n/image/upload/v1721111090/Epic%20Essentials/ozvhcp779mslrnr1wirh.jpg" alt="no-products-found-img" />
            <div>
                <h3>Sorry, No Products found!</h3>
                <p>Please check the spelling or try searching for something else</p>
            </div>
        </div>
    )
}