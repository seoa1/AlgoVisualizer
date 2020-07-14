import React from 'react';
import Dropdown from './sidebar_buttons/algo_dropdown';
import Picker from './sidebar_buttons/algo_picker';
import Search from './sidebar_buttons/search';
import Speed from './sidebar_buttons/speed';

const GraphSidebar = ({ set_algo, search }) => {
    return (
        <div className="graph_sidebar">
            <Search search={search}/>
            <Speed />
            <Picker />
            <Dropdown set_algo={set_algo}/>
        </div>
    )
}

export default GraphSidebar;