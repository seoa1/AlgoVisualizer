import React from 'react';


const Line = ({ pos1, pos2 }) => (
    <line className="bst_line" x1={pos1[0].toString()} x2={pos2[0].toString()} y1={pos1[1].toString()} y2={pos2[1].toString()}>

    </line>
)

export default Line;