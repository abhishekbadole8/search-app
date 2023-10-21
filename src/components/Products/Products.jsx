import Style from "./Products.module.css"
import { useContext, useState } from "react";
import { UserContext } from "../../App"
import { AiOutlineHeart } from "react-icons/ai";
import { AiTwotoneHeart } from "react-icons/ai";
import { AiTwotoneStar } from "react-icons/ai";

function generateStarRating(rating) {
    const starCount = 5;
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;

    const stars = [];

    for (let i = 0; i < fullStars; i++) {
        stars.push(<AiTwotoneStar key={i} color="#FDD33D" />);
    }

    if (hasHalfStar) {
        stars.push(<AiTwotoneStar key={fullStars} color="#FDD33D" />);
    }

    const remainingStars = starCount - stars.length;

    for (let i = 0; i < remainingStars; i++) {
        stars.push(<AiTwotoneStar key={fullStars + i} color="#ccc" />);
    }

    return stars;
}

function Products({ filteredProducts }) {

    const { products } = useContext(UserContext)

    const [wishlist, setWishlist] = useState({});

    const toggleWishlist = (productId) => {
        setWishlist((prevWishlist) => ({
            ...prevWishlist,
            [productId]: !prevWishlist[productId],
        }));
    };

    // Check if there are no products
    if (filteredProducts.length === 0) {
        return (
            <h3 className={Style.noProductsMessage}>
                No products available.
            </h3>
        );
    }

    return (
        <div className={Style.DisplayProductContainer}>

            {filteredProducts.map((product) => {

                const { id, title, price, thumbnail, rating, discountPercentage } = product

                const discountedPrice = price / 100 * discountPercentage

                const truncatedTitle = title.length > 22 ? title.slice(0, 22) + '...' : title;

                const isWishlist = wishlist[id] || false;

                const [isHovered, setIsHovered] = useState(false);

                const handleMouseEnter = () => {
                    setIsHovered(true);
                };

                const handleMouseLeave = () => {
                    setIsHovered(false);
                };

                return (
                    <div className={Style.productBase} key={id}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}>

                        <div className={Style.productBaseImg}>

                            <img src={thumbnail} alt="product-img" />

                            <div className={Style.wishlist} onClick={() => toggleWishlist(id)}>
                                {isWishlist ?
                                    <AiTwotoneHeart size={21} color="ff0000" />
                                    : <AiOutlineHeart size={21} color="#fff" />}
                            </div>
                            {isHovered && (
                                <div className={Style.viewProduct}>
                                    <button onClick={() => viewProduct(id)}>View Product</button>
                                </div>
                            )}
                        </div>

                        <div className={Style.productBaseDetail}>

                            <p className={Style.productName}>{truncatedTitle}</p>

                            <p><span className={Style.mrpCut}> <del>Rs. {price}</del>  </span> <b className={Style.Blue}>Rs. {Math.floor(price - discountedPrice)}</b> </p>

                            <p className={Style.raiting}>{generateStarRating(rating)}
                                <span>(100)</span>
                            </p>

                        </div>
                    </div>

                )
            })}

        </div>
    )
}

export default Products;