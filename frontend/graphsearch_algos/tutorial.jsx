import React from 'react';

const Tutorial = ({ close }) => {
    const handle_click = () => {
        close();
    }
    return (
        <div className="tutorial">
            <img className="x_button" src="./images/x_button.png" onClick={handle_click}/>
            <h1>Controls</h1>
            <p>
                To make walls, click and drag along empty tiles.
                <br/>
                To delete walls, click a wall and drag along wall tiles.
                <br/>
                For other controls, use the sidebar on the right.
                <br/>
                Click the X button on the top right to exit!
            </p>
        </div>
    )
}

export default Tutorial;