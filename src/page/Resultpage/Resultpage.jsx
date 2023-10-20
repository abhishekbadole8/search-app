import { useContext, useState, useEffect } from "react";
import Products from "../../component/Products/Products";
import Filter from "../../component/Filter/Filter";
import Style from "./Resultpage.module.css"
import { UserContext } from "../../App";

function ResultPage() {

    const { products } = useContext(UserContext)

    const [filter, setFilter] = useState({
        price: "",
        category: [],
        rating: 0
    })

    const handleFilterChange = (category, value) => {
        setFilter((prevFilter) => {
            if (category === "category") {
                const updatedCategories = prevFilter.category.includes(value)
                    ? prevFilter.category.filter((item) => item !== value)
                    : [...prevFilter.category, value];

                return { ...prevFilter, category: updatedCategories };
            }

            const isSameValue = prevFilter[category] === value;

            const updatedValue = isSameValue ? category == 'rating' ? 0 : "" : value;

            return { ...prevFilter, [category]: updatedValue };
        });
    };

    const filteredProducts = products.filter((product) => {
        const ratingMatch = filter.rating === 0 || Math.round(product.rating) == filter.rating;
        const categoryMatch =
            filter.category?.length === 0 ||
            filter.category?.includes(product.category.toLowerCase());

        if (!filter.price) {
            return categoryMatch && ratingMatch;
        }

        const [minPrice, maxPrice] = filter.price.toString().split("_");
        const productPrice = product.price;

        return (
            categoryMatch &&
            ratingMatch &&
            productPrice >= parseFloat(minPrice) &&
            productPrice <= parseFloat(maxPrice)
        );
    });

    return (
        <div className={Style.resultPage}>
            
            <div className={Style.searchHead}>

                <input type="text" placeholder="Search" />

            </div>

            <div className={Style.showResultContainer}>

                <h2> Search Results</h2>

                <div className={Style.showResultInnerCont}>

                    <Filter handleFilterChange={handleFilterChange} />

                    <Products filteredProducts={filteredProducts} />

                </div>

            </div>
        </div>
    )
}

export default ResultPage;