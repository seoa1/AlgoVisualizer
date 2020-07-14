import React from 'react';

const Search = ({search}) => {
    const handle_click = () => {
        search();
    }
    return (
        <div className="search" onClick={handle_click}>
            SEARCH
        </div>
    )
}

export default Search;