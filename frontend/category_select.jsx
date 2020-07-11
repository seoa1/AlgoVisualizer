import React from 'react';
import CategoryDropdown from './category_dropdown';

export default class CategorySelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false
        }
        this.handle_click = this.handle_click.bind(this);
    }

    handle_click() {
        if(this.state.show) {
            this.setState({ show: false });
        }
        else {
            this.setState({ show: true });
        }
    }

    render() {
        let cat_out = "";
        switch(this.props.categ) {
            case "sorting":
                cat_out = "Sorting Algorithms";
                break;
            case "traversal":
                cat_out = "Traversal Algorithms";
                break;
            default:
                cat_out= "what";
                break;
        }
        return (
            <div className="cat_sele">
                    <div className="cat_announce">
                        Pick a Category!
                    </div>
                    <div className="cat_out" onClick={this.handle_click}>
                        {cat_out}
                        <div className="cat_shower" >
                            {this.state.show ? 
                            <img className="up" src="./images/up_arrow.png"/> :
                            <img className="down" src="./images/down_arrow.png"/>}
                        </div>
                    </div>
                    {this.state.show ? <CategoryDropdown change_cat={this.props.change_cat}/> : null}
                    
                    
            </div>
        
        )
    }
}

