import React from 'react';
import CategorySelect from './category_select';

export default class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let current_cat = "";
        switch(this.props.categ) {
            case "sorting":
                current_cat = "Sorting Algorithms";
                break;
            case "traversal":
                current_cat = "BST Traversal Algorithms";
                break;
            case "graphsearch":
                current_cat = "Graph Search Algorithms";
                break;
            default:
                break;
        }
        return( 
            <div className="header">
                {current_cat}
                <CategorySelect categ={this.props.categ} change_cat={this.props.change_cat}/>
            </div>
        )
    }
}