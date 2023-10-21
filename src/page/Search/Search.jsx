import { useRef, useState } from "react";
import Style from "./Search.module.css"
import searchIcon from "../../assets/search.svg"
import zeviLogo from "../../assets/zevi_logo.svg"
import SuggestionBox from "../../components/Suggestionbox/Suggestionbox";
import { useNavigate, useSearchParams } from "react-router-dom";


function Search() {

    const [searchParams] = useSearchParams();
    const [searchQuery, setSearchQuery] = useState(searchParams.get("query") || "");
    const [isSuggestion, setIsSuggestion] = useState(false) // Suggestion Box Check
    const closeSuggestionBox = useRef()
    const navigate = useNavigate();

    const CloseSuggestionBox = (e) => {
        if (e.target == closeSuggestionBox.current) setIsSuggestion(false)
    }

    function redirectToSearchResultsPage() {
        navigate(`/results/${searchQuery}`);
    }
    return (
        <div className={Style.Search}>

            <div className={Style.searchContainer} ref={closeSuggestionBox} onClick={CloseSuggestionBox}>

                <input type="text" placeholder="Search" value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key == "Enter") {
                            redirectToSearchResultsPage();
                        }
                    }}
                    onClick={() => setIsSuggestion(true)}  />

                <img src={searchIcon} alt="search-icon" className={Style.SearchIcon} />

                {isSuggestion && <SuggestionBox />}

            </div>

            <img src={zeviLogo} alt="logo" className={Style.company_logo} />

        </div>)
}

export default Search;