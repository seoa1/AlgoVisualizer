import React from 'react';

export default class Array extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return( 
            
            <div className="array">
                {
                    this.props.arr.map((ele, idx) =>  {
                        let add_class = ""
                        if(idx == this.props.comp) {
                            add_class = " comparer";
                        }
                        else if(idx == this.props.comp_to) {
                            add_class = " compareto";
                        }
                        return(
                            <div className={"arraytile" + add_class} key={idx}>{ele}</div>
                        )
                    })
                }
            </div>
        )
    }
}