import "./PageNotFound.css"
export default function PageNotFound() {

    return (
        <main className="pagenotfound-main">
            <section className="pagenotfound-container">
                <img src="https://res.cloudinary.com/dmvxvzb5n/image/upload/v1723384850/Epic%20Essentials/yi7ms1ysgy4bihiojhyn.svg"
                    alt="404-img" className="pagenotfound-img" />
                <h1>404 Page Not Found</h1>
                <a href="/" className="pagenotfound-btn">GO TO HOMEPAGE</a>
            </section>
        </main>
    )
}