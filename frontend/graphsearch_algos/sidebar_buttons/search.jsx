import React from 'react';

const Search = ({search, searching}) => {
    const handle_click = () => {
        search();
    }
    return (
        <div className={searching? "search searching" :"search"} onClick={handle_click}>
            {searching ? "STOP" : "SEARCH"}
        </div>
    )
}

export default Search;