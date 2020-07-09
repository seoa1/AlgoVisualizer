import React from 'react';
import Randomize from './sidebar_buttons/randomize';
import SizeDrag from './sidebar_buttons/size_drag';
import SortButton from './sidebar_buttons/sort_button';
import AlgoPicker from './sidebar_buttons/algo_picker';

const Sidebar = ({ size, sort, algo, setalgo, rand }) => (
    <div className="sidebar">
        <SortButton sort={sort}/>
        <Randomize rand={rand}/>
        <SizeDrag size={size}/>
        <AlgoPicker algo={algo} setalgo={setalgo}/>
    </div>
)

export default Sidebar;