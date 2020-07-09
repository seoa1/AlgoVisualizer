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
                        let add_class = ""
                        if(idx === this.props.comp) {
                            add_class = "comparerline";
                        }
                        else if(idx === this.props.comp_to) {
                            add_class = "comparetoline";
                        }
                        else if(idx === this.props.min) {
                            add_class = "minline";
                        }
                        return (
                            <div className={"graphline"} id={add_class} key={idx} style={{height: (3 * ele).toString()+"vh"}}></div>
                        )
                    })
                }
            </div>
        )
    }
}