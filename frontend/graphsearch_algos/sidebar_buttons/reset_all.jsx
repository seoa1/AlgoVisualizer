import React from 'react';

const ResetAll = ({reset_all}) => {
    const handle_click = () => {
        reset_all();
    }
    return (
        <div onClick={handle_click}>
            Reset All
        </div>
    )
}

export default ResetAll;