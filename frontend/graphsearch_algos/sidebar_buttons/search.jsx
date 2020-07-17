import React from 'react';

const Search = ({search, searching}) => {
    const handle_click = () => {
        search();
    }
    return (
        <div className="search" onClick={handle_click}>
            {searching ? "STOP" : "SEARCH"}
        </div>
    )
}

export default Search;