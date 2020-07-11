import React from 'react';

const NearlySorted = ({nearly}) => {
    const handle_click = () => {
        nearly();
    }
    return (
        <div className="nearly" onClick={handle_click}>
            Nearly Sorted
        </div>
    )
   
}

export default NearlySorted;