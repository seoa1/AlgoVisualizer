import React from 'react';

const Speed = ({ change_time }) => {
    const handle_click_1 = () => {
        change_time(1);
    }
    const handle_click_2 = () => {
        change_time(2);
    }
    const handle_click_4 = () => {
        change_time(4);
    }

    return (
        <div>
            <div>Speed</div>
            <div onClick={handle_click_1}>Normal</div>
            <div onClick={handle_click_2}>Fast</div>
            <div onClick={handle_click_4}>Fastest</div>
        </div>
    )
}

export default Speed;