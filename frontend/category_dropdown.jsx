import React from 'react';
const CategoryDropdown = ({change_cat}) => {
    const handle_click_s = (e) => {
        e.preventDefault();
        change_cat("sorting");
    }
    const handle_click_t = (e) => {
        e.preventDefault();
        change_cat("traversal");
    }
    const handle_click_g = (e) => {
        e.preventDefault();
        change_cat("graphsearch");
    }

    return (
        <div className="cat_dropdown">
            <div onClick={handle_click_s}>Sorting Algorithms</div>
            <div onClick={handle_click_g}>Graph Search Algorithms</div>
        </div>
    )
}

export default CategoryDropdown;