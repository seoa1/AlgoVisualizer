import React from 'react';
import Header from './header';
import SortingDisplay from './sorting_algos/sorting_display';
import Tree from './traversal_algos/tree_display.jsx';

export default class Display extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            algo_category: "sorting"
        }

        this.change_category = this.change_category.bind(this);
    }

    change_category(category) {
        this.setState({ algo_category: category });
    }

    render() {
        return (
            <div className="screen">
                <Header categ={this.state.algo_category} change_cat={this.change_category}/>
                {this.state.algo_category === "sorting" ? 
                    <SortingDisplay/> :
                    null}
                {this.state.algo_category === "traversal" ? 
                    <Tree />
                    :null}
            </div>
        )
    }
}