import React from 'react';

const SortButton = ({sort}) => {
    const handle_click = () => {
        sort();
    }

    return (
        <div className="sort" onClick={handle_click}>
            Sort
        </div>
    )
}

export default SortButton;