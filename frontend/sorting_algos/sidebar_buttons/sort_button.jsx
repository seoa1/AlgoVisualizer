import React from 'react';

const SortButton = ({sort, sorting}) => {
    const handle_click = () => {
        sort();
    }

    return (
        <div className="sort" onClick={handle_click}>
            {sorting ? "STOP" : "SORT"}
        </div>
    )
}

export default SortButton;