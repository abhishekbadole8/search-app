import Style from "./Suggestionbox.module.css"
import girl from "../../assets/girl.svg"
import { useContext } from "react";
import { UserContext } from "../../App";

function SuggestionBox() {

    const { products } = useContext(UserContext)

    return (
        <>
            <div className={Style.suggestionContainer} >

                <div className={Style.suggInnerInnerContainer}>
                    <h5><b>Latest Trends</b> </h5>

                    <div className={Style.trendingProductShow}>

                        {products.slice(1,5).map((product,i) => (
                            <div className={Style.trendingSingleProduct} key={i}>
                                <img src={product.thumbnail} alt="" />
                                <p>{product.title}</p>
                            </div>
                        ))}

                    </div>
                </div>

                <div className={Style.suggInnerInnerContainer}>
                    <h5><b>Popular Suggestions</b> </h5>

                    <ul>
                        <li>Striped shirt dress</li>
                        <li>Satin shirts</li>
                        <li>Striped shirt dress</li>
                        <li>Striped shirt dress</li>
                    </ul>
                </div>

            </div>
        </>
    )
}

export default SuggestionBox;