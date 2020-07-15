import React from 'react';

const Dropdown = ({ set_algo }) => {
    const handle_click_b = () => {
        set_algo("bfs");
    }
    const handle_click_d = () => {
        set_algo("dfs");
    }

    return (
        <div>
            <div onClick={handle_click_b}>BFS</div>
            <div onClick={handle_click_d}>DFS</div>
        </div>
    )
}

export default Dropdown;