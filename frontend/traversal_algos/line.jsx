import React from 'react';
import $ from 'jquery';

const Line = ({ node1_id, node2_id }) => {
    console.log(node2_id);
    var div1 = $(`#${node1_id}`);
    var div2 = $(`#${node2_id}`);
    console.log(div1.width());
    return(
        <svg className="svg">
            <line className="bst_line" x1={div1.offset().left + (div1.width() / 2)} 
            x2={div2.offset().top + (div2.width() / 2)} 
            y1={div1.offset().left + (div1.height() / 2)} 
            y2={div2.offset().top + (div2.height() / 2)}>

            </line>
        </svg>
    )
    
    
}

export default Line;