import React from 'react';
import Picker from './sidebar_buttons/algo_picker';
import Search from './sidebar_buttons/search';
import ResetAll from './sidebar_buttons/reset_all';
import Speed from './sidebar_buttons/speed';

const GraphSidebar = ({ change_time, algo, set_algo, search, searching, reset_all }) => {
    return (
        <div className="graph_sidebar">
            <Search search={search} searching={searching}/>
            <ResetAll reset_all={reset_all}/>
            <Speed change_time={change_time}/>
            <Picker algo={algo} set_algo={set_algo}/>
            
        </div>
    )
}

export default GraphSidebar;