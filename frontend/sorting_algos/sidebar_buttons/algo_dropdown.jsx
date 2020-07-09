import React from 'react';

const Dropdown = ({ setalgo }) => {
    const handle_click_s = (e) => {
        e.preventDefault();
        setalgo("select");
    }
    const handle_click_b = (e) => {
        e.preventDefault();
        setalgo("bubble");
    }
    const handle_click_i = (e) => {
        e.preventDefault();
        setalgo("insert");
    }
    const handle_click_m = (e) => {
        e.preventDefault();
        setalgo("merge");
    }

    return(
        <div>
            <div onClick={handle_click_s}>Selection Sort</div>
            <div onClick={handle_click_b}>Bubble Sort</div>
            <div onClick={handle_click_i}>Insertion Sort</div>
            <div onClick={handle_click_m}>Merge Sort</div>
        </div>
    )
}
    


export default Dropdown;