import React from 'react';
import Randomize from './sidebar_buttons/randomize';
import SizeDrag from './sidebar_buttons/size_drag';
import SortButton from './sidebar_buttons/sort_button';
import AlgoPicker from './sidebar_buttons/algo_picker';
import NearlySorted from './sidebar_buttons/nearly_sorted';

const Sidebar = ({ size, sort, algo, setalgo, rand, setsize, sorting, nearly }) => (
    <div className="sidebar">
        <SortButton sort={sort} sorting={sorting}/>
        <Randomize rand={rand}/>
        <NearlySorted nearly={nearly}/>
        <SizeDrag size={size} setsize={setsize}/>
        
        <AlgoPicker algo={algo} setalgo={setalgo}/>
    </div>
)

export default Sidebar;