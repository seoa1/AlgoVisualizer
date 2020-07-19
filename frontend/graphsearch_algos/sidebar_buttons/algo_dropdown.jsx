import React from 'react';

const Dropdown = ({ set_algo }) => {
    const handle_click_b = () => {
        set_algo("bfs");
    }
    const handle_click_d = () => {
        set_algo("dfs");
    }
    const handle_click_dj = () => {
        set_algo("djikstra");
    }
    const handle_click_a = () => {
        set_algo("astar");
    }

    return (
        <div className="dropdown">
            <div onClick={handle_click_b}>BFS</div>
            <div onClick={handle_click_d}>DFS</div>
            <div onClick={handle_click_dj}>Djikstra's</div>
            <div onClick={handle_click_a}>A*</div>
        </div>
    )
}

export default Dropdown;