import React from 'react';
import Dropdown from './sidebar_buttons/algo_dropdown';
import Picker from './sidebar_buttons/algo_picker';
import Search from './sidebar_buttons/search';
import ResetAll from './sidebar_buttons/reset_all';

const GraphSidebar = ({ set_algo, search, searching, reset_all }) => {
    return (
        <div className="graph_sidebar">
            <Search search={search} searching={searching}/>
            <ResetAll reset_all={reset_all}/>
            <Picker />
            <Dropdown set_algo={set_algo}/>
        </div>
    )
}

export default GraphSidebar;