import { useContext, useRef, useState } from "react";
import { UserContext } from "../../App"
import Style from "./Filter.module.css"
import { GoChevronDown } from "react-icons/go";
import { AiTwotoneStar } from "react-icons/ai";

function FilterBox({ handleFilterChange }) {

    const { products } = useContext(UserContext)

    const uniqueCategories = [...new Set(products.map((product) => product.category))];

    const closeFilters = {
        category: useRef(),
        price: useRef(),
        rating: useRef(),
    };


    function capitalizeFirstAndAfterSpace(str) {
        return str
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    }

    // hide filter
    function hideClickedFilter(filterType) {

        const currentFilter = closeFilters[filterType];

        if (currentFilter) {
            currentFilter.current.style.display = currentFilter.current.style.display === "none" ? "block" : "none";
        }
    }
   
    // rating star
    const generateStars = (rating) => {
        const maxRating = 5;
        const stars = [];

        for (let i = 0; i < maxRating; i++) {
            stars.push(
                <AiTwotoneStar
                    key={i}
                    color={i < rating ? "#FDD33D" : "#CDCCC8"}
                />
            );
        }

        return stars;
    };

    return (

        <div className={Style.filterContainer}>

            {/* Category */}
            <div className={Style.brandFilter}>

                <div className={Style.filterTop} onClick={() => hideClickedFilter("category")} >
                    <span className={Style.filterHeading}>CATEGORY</span>
                    <span><GoChevronDown /></span>
                </div>

                <ul className={Style.brandList} ref={closeFilters.category}>
                    {uniqueCategories.map((category, i) => {
                        return (
                            <li className={Style.brandListSingle} key={i}
                                onChange={() => handleFilterChange('category', category)}>
                                <label>
                                    <input type="checkbox"/>
                                    <p>{capitalizeFirstAndAfterSpace(category)}</p>
                                </label>
                            </li>)
                    })}
                </ul>

            </div>

            {/* Price */}
            <div className={Style.brandFilter}>

                <div className={Style.filterTop} onClick={() => hideClickedFilter("price")}>

                    <span className={Style.filterHeading}>PRICE RANGE</span>

                    <span><GoChevronDown /></span>

                </div>

                <ul className={Style.brandList} ref={closeFilters.price}>

                    <li className={Style.brandListSingle} onChange={() => handleFilterChange('price', '0_500')}>
                        <label >
                            <input type="checkbox" />
                            <p>upto 500</p>
                        </label>
                    </li>

                    <li className={Style.brandListSingle} onChange={() => handleFilterChange('price', '1000_3000')}>
                        <label >
                            <input type="checkbox" />
                            <p>1000 to 3000</p>
                        </label>
                    </li>

                </ul>

            </div>

            {/* Rating */}
            <div className={Style.brandFilter}>

                <div className={Style.filterTop} onClick={() => hideClickedFilter('rating')}>

                    <span className={Style.filterHeading}>RATINGS</span>

                    <span><GoChevronDown /></span>

                </div>

                <ul className={Style.brandList} ref={closeFilters.rating}>

                    {[5, 4, 3, 2, 1].map((rating, i) => (
                        <li className={Style.brandListSingle} key={i} onChange={() => handleFilterChange('rating', rating)}>
                            <label >
                                <input type="checkbox" />
                                {generateStars(rating)}
                            </label>
                        </li>
                    ))}

                </ul>

            </div>

        </div>
    )
}

export default FilterBox;