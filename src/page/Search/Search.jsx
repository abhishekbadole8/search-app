import { useRef, useState } from "react";
import Style from "./Search.module.css"
import searchIcon from "../../assets/search.svg"
import zeviLogo from "../../assets/zevi_logo.svg"
import SuggestionBox from "../../component/Suggestionbox/Suggestionbox";

function Homepage() {

    const [inputValue, setInputValue] = useState('') // Input Value Store Here
    const [isSuggestion, setIsSuggestion] = useState(false) // Suggestion Box Check
    const closeSuggestionBox = useRef()

    const CloseSuggestionBox = (e) => {
        if (e.target == closeSuggestionBox.current) setIsSuggestion(false)
    }

    return (
        <div className={Style.Search}>

            <div className={Style.searchContainer} ref={closeSuggestionBox} onClick={CloseSuggestionBox}>

                <input type="text" placeholder="Search" onChange={(e) => setInputValue(e.target.value)} onClick={() => setIsSuggestion(true)} />

                <img src={searchIcon} alt="search-icon" className={Style.SearchIcon} />

                {isSuggestion && <SuggestionBox />}

            </div>

            <img src={zeviLogo} alt="logo" className={Style.company_logo} />

        </div>)
}

export default Homepage;