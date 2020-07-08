import React from 'react';

export default class Graph extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="graph">
                {
                    this.props.arr.map( (ele, idx) => {
                        return (
                            <div className="graphline" key={idx} style={{height: (3 * ele).toString()+"vh"}}></div>
                        )
                    })
                }
            </div>
        )
    }
}